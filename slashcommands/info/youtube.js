const fetch = require("node-fetch")
const Discord = require("discord.js");
var config = require('../../settings/config');

module.exports = {
    name: "yt",
    description: "Permet de lire des vidéos dans un channel",
    permissions: [""],

    run: async (client, interaction, args) => {

        let user = await interaction.member.fetch();
        const channel = user.voice.channelId;
        if (!user.voice.channel) {
            var erreur = new Discord.MessageEmbed()
                .setColor("#2F3136")
                .setTitle("<a:non:802645550435532810> Veuillez vous diriger vers un salon vocal !")
            return interaction.followUp({ embeds: [erreur] })
        }

        // Création de l'activité en passant l'id du channel vocal et en requetant l'api discord
        fetch(`https://discord.com/api/v8/channels/${channel}/invites`, {
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
                "Authorization": `Bot ${config.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(invite => {
                if (!invite.code) {
                    var erreurCode = new Discord.MessageEmbed()
                        .setColor("#2F3136")
                        .setTitle("<a:non:802645550435532810> Erreur impossible de lancer !")
                    return interaction.followUp({ embeds: [erreurCode] })
                }
                var embed = new Discord.MessageEmbed()
                    .setTitle('YOUTUBE WATCH')
                    .setColor("00FF04")
                    .setDescription(`[Cliquez ici pour lancer / rejoindre l'activité](https://discord.com/invite/${invite.code})`)
                    .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo_of_YouTube_%282005-2011%29.svg/2560px-Logo_of_YouTube_%282005-2011%29.svg.png")
                interaction.followUp({ embeds: [embed] })
            })
    }
};
