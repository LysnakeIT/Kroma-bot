const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Retourne le handler",
    permissions : [""],

    run: async (client, interaction, args) => {
        const help_embed = new Discord.MessageEmbed()
            .setColor("#00FF04")
            .setTitle("**Kroma Help**")
            .setDescription("**Préfixe :** `!`\n\n :earth_africa: Liste des commandes **Servers** : \n\n `!serverinfos` `!info` `!math` `!ping` `!system` `!yt`\n\n :desktop: Commande **Hardware/Software** : \n\n`!hs`")
        interaction.followUp({ embeds : [help_embed] })
    },
};
