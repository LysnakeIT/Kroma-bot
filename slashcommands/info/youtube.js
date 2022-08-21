const Discord = require("discord.js");

module.exports = {
    name: "yt",
    description: "Permet de lire des vidéos dans un channel",
    permissions: [""],

    run: async (client, interaction, args) => {

        let user = await interaction.member.fetch();
        if (!user.voice.channel) {
            var erreur = new Discord.EmbedBuilder()
                .setColor("#2F3136")
                .setTitle("<a:non:802645550435532810> Veuillez vous diriger vers un salon vocal !")
            return interaction.followUp({ embeds: [erreur] })
        }
        
        client.discordTogether.createTogetherCode(user.voice.channel.id, 'youtube')
            .then(async invite => {
                if (!invite.code) {
                    var erreurCode = new Discord.EmbedBuilder()
                        .setColor("#2F3136")
                        .setTitle("<a:non:802645550435532810> Erreur impossible de lancer !")
                    return interaction.followUp({ embeds: [erreurCode] })
                }
                var embed = new Discord.EmbedBuilder()
                    .setTitle('YOUTUBE WATCH')
                    .setColor("00FF04")
                    .setDescription(`[Cliquez ici pour lancer / rejoindre l'activité](${invite.code})`)
                    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo_of_YouTube_%282005-2011%29.svg/2560px-Logo_of_YouTube_%282005-2011%29.svg.png")
                interaction.followUp({ embeds: [embed] })
            })
    }
};
