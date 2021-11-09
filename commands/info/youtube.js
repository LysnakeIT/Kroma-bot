const Discord = require("discord.js");
const fetch = require("node-fetch")
const Client = new Discord.Client()
Client.config = require('../../config/bot');
module.exports = {
    name: "yt",
    category: "info",
    description: "Permet de lire des vidéos dans un channel",
    run: async (Client, message, args) => {
        if (!message.guild || message.author.bot || !message.content.trim().startsWith(Client.config.discord.prefix)) return;

        const { channel } = message.member.voice;
        if (!channel) {
            var erreur = new Discord.MessageEmbed()
                .setColor("#2F3136")
                .setTitle("<a:non:802645550435532810> Veuillez vous diriger vers un salon vocal !")
            return message.reply(erreur)
        }

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${Client.config.discord.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(invite => {
                if (!invite.code) {
                    var erreurCode = new Discord.MessageEmbed()
                        .setColor("#2F3136")
                        .setTitle("<a:non:802645550435532810> Erreur impossible de lancer !")
                    return message.reply(erreurCode)
                }
                var embed = new Discord.MessageEmbed()
                    .setTitle('YOUTUBE WATCH')
                    .setColor("00FF04")
                    .setDescription(`[Cliquez ici pour lancer / rejoindre l'activité](https://discord.com/invite/${invite.code})`)
                    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo_of_YouTube_%282005-2011%29.svg/2560px-Logo_of_YouTube_%282005-2011%29.svg.png")
                message.channel.send(embed)
            })
    }
}