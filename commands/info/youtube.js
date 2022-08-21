const Discord = require("discord.js");

module.exports = {
    name: "yt",
    category: "info",
    description: "Permet de lire des vidéos dans un channel",

    run: async (client, message, args) => {
        if (!message.member.voice.channelId) {
            var erreur = new Discord.EmbedBuilder()
                .setColor("#2F3136")
                .setTitle("<a:non:802645550435532810> Veuillez vous diriger vers un salon vocal !")
            return message.reply({ embeds: [erreur] })
        }

        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube')
            .then(async invite => {
                if (!invite.code) {
                    var erreurCode = new Discord.EmbedBuilder()
                        .setColor("#2F3136")
                        .setTitle("<a:non:802645550435532810> Erreur impossible de lancer !")
                    return message.reply({ embeds: [erreurCode] })
                }
                var embed = new Discord.EmbedBuilder()
                    .setTitle('YOUTUBE WATCH')
                    .setColor("00FF04")
                    .setDescription(`[Cliquez ici pour lancer / rejoindre l'activité](${invite.code})`)
                    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo_of_YouTube_%282005-2011%29.svg/2560px-Logo_of_YouTube_%282005-2011%29.svg.png")
                message.channel.send({ embeds: [embed] })
            })
    }
}