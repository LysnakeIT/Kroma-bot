const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Retourne le handler",
    permissions : [""],

    run: async (client, interaction, args) => {
        const help_embed = new Discord.MessageEmbed()
            .setColor("#00FF04")
            .setTitle("**Kroma Help**")
            .setDescription("**Préfixe :** `!`\n\n :earth_africa: Liste des commandes **Servers** : \n\n `!serverinfos` `!info` `!covid` `!math` `!ping` `!weather` `!translate` `!system` `!yt`\n\n :desktop: Commande **Hardware/Software** : \n\n`!hs`\n\n :video_game: Liste des commandes **Games** : \n\n `!quizz`\n\n :headphones: Liste des commandes **Musique** : `!clear-queue` `!loop` `!play` `!queue` `!search` `!skip` `!stop`")
        interaction.followUp({ embeds : [help_embed] })
    },
};
