const Discord = require("discord.js");
const Client = new Discord.Client()
const fs = require('fs');
const Canvas = require('canvas');
Client.commands = new Discord.Collection();
const { Captcha } = require('discord.js-captcha');

const captch = new Captcha(Client, {
  guildID: process.env.guildID,
  roleID: process.env.roleID,
  channelID: process.env.channelID,
  sendToTextChannel: false
});

const { Player } = require('discord-player');

require("discord-buttons")(Client);

Client.player = new Player(Client);
Client.config = require('./config/bot');
Client.emotes = Client.config.emojis;
Client.login(Client.config.discord.token);


fs.readdirSync('./commands').forEach(dirs => {
  const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
  for (const file of commands) {
    const command = require(`./commands/${dirs}/${file}`);
    console.log(`Loading command ${file}`);
    Client.commands.set(command.name, command);
  };
});

const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));
for (const file of player) {
  console.log(`Loading discord-player event ${file}`);
  const event = require(`./player/${file}`);
  Client.player.on(file.split(".")[0], event.bind(null, Client));
};

fs.readdir('./events/', (err, files) => {
  files = files.filter(f => f.endsWith('.js'));
  files.forEach(f => {
    const event = require(`./events/${f}`);
    console.log(`Loading command ${f}`);
    Client.on(f.split('.')[0], event.bind(null, Client));
    delete require.cache[require.resolve(`./events/${f}`)];
  });
});

/********** 
            *****************************
                                           PARTIE AFFICHAGE TWITCH PRIVEE
                                                                            ********************
                                                                                                  *************************/


Client.on("message", async (message, guild) => {
  const prefix = "!";

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = Client.commands.get(cmd);

  if (command)
    command.run(Client, message, args);

});

/********** 
            *****************************
                                           PARTIE AFFICHAGE HARDWARE/SOFTWARE (hs)
                                                                                  ********************
                                                                                                       *************************/

var welcomeCanvas = {};
welcomeCanvas.create = Canvas.createCanvas(1014, 500)
welcomeCanvas.context = welcomeCanvas.create.getContext("2d")
welcomeCanvas.context.font = "80px Gotham Black"
welcomeCanvas.context.fillStyle = `#00ff19`;

Canvas.loadImage(`./wallpaper.jpg`).then(async (img) => {
  welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500);
  welcomeCanvas.context.fillText("BIENVENUE", 290, 360);
  welcomeCanvas.context.beginPath();
  welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
  welcomeCanvas.context.stroke()
})
Client.on("guildMemberAdd", async member => {
  let canvas = welcomeCanvas
  let user = member;
  canvas.context.font = '42px Gotham Black'
  canvas.context.textAlign = 'center'
  canvas.context.fillStyle = "#ffffff"
  canvas.context.fillText(member.user.tag.toUpperCase(), 512, 410)
  canvas.context.fillStyle = "#ffffff"
  canvas.context.font = '32px Gotham Black'
  canvas.context.fillText("BIENVENUE SUR LE SERVEUR DE LA KROMA", 512, 455)

  canvas.context.beginPath();
  canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true);
  canvas.context.closePath();
  canvas.context.clip();
  await Canvas.loadImage(user.user.displayAvatarURL({ format: 'png', size: 1024 }))
    .then(img => {
      canvas.context.drawImage(img, 393, 47, 238, 238)
    })

  const attachment = new Discord.MessageAttachment(canvas.create.toBuffer(), './Welcome.jpg');
  captch.present(member)
  setTimeout(() => {
    if (member.roles.cache.some(r => r.name === "😃 | Membres")) {
      const embedsend = member.guild.channels.cache.get(process.env.channelWelcome)
      embedsend.send(attachment)
    }
  }, 70000)
})