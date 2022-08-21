const { Player } = require('discord-player');
const { Client, GatewayIntentBits, Partials, Collection, AttachmentBuilder} = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);

const { Captcha } = require("discord.js-captcha");
const captch = new Captcha(Client, {
  guildID: process.env.guildID,
  roleID: process.env.roleID,
  channelID: process.env.channelID,
  sendToTextChannel: false,
  kickOnFailure: true,
  attempts: 2,
  timeout: 30000,
  showAttemptCount: true
});

const Canvas = require('canvas');
const fs = require("fs");
client.commands = new Collection();
client.slashCommands = new Collection();

const config = require("./config/bot.js");
client.emotes = config.emojis;
client.login(config.discord.token);

/**************************** PARTIE HANDLER ****************************/

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name, command);
    };
});

fs.readdir('./events/', (err, files) => {
    files = files.filter(f => f.endsWith('.js'));
    files.forEach(f => {
        const event = require(`./events/${f}`);
        console.log(`Loading command ${f}`);
        client.on(f.split('.')[0], event.bind(null, client));
        delete require.cache[require.resolve(`./events/${f}`)];
    });
});

fs.readdirSync("./slashcommands").forEach(dirs => {
    const commands = fs.readdirSync(`./slashcommands/${dirs}/`).filter((files) => files.endsWith(".js"));
    for (const file of commands) {
        const command = require(`./slashcommands/${dirs}/${file}`);
        console.log(`Loading slashcommand ${file}`);
        client.slashCommands.set(command.name, command);
    }
});

/********** 
            *****************************
                                           PARTIE AFFICHAGE TWITCH PRIVEE
                                                                            ********************
                                                                                                  *************************/
client.on("guildMemberAdd", async member => {
  captch.present(member)
  captch.on("success", data => {
    console.log(data);
    welcome(member)
  });
});


async function welcome(member) {
  const canvas = Canvas.createCanvas(1014, 500)
  const context = canvas.getContext("2d")
  context.font = "80px Gotham Black"
  context.fillStyle = `#00ff19`;
  const background = await Canvas.loadImage(`./wallpaper.jpg`)

  context.drawImage(background, 0, 0, canvas.width, canvas.height)
  context.fillText("BIENVENUE", 290, 360);
  context.beginPath()
  context.arc(512, 166, 128, 0, Math.PI * 2, true);
  context.stroke()

  context.font = '42px Gotham Black'
  context.textAlign = 'center'
  context.fillStyle = "#ffffff"
  context.fillText(member.user.tag.toUpperCase(), 512, 410)
  context.fillStyle = "#ffffff"
  context.font = '32px Gotham Black'
  context.fillText("BIENVENUE SUR LE SERVEUR DE LA KROMA", 512, 455)

  context.beginPath();
  context.arc(512, 166, 119, 0, Math.PI * 2, true);
  context.closePath();
  context.clip();

  let avatarURL = member.user.displayAvatarURL({ format: "jpg", size: 1024 });
  const avatar = await Canvas.loadImage(avatarURL.replace(".webp", ".png"));
  context.drawImage(avatar, 393, 47, 238, 238)
  const attachment = new AttachmentBuilder(canvas.toBuffer(), { name :'./Welcome.jpg'});
  const embedsend = member.guild.channels.cache.get(process.env.channelWelcome)
  embedsend.send({ files: [attachment] })
}
