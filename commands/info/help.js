const Discord = require("discord.js");
const Client = new Discord.Client;
module.exports = {
    name: "help",
    category: "info",
    description: "Retourne le handler",
    run: async (Client, message, args) => {
        const help_embed = new Discord.MessageEmbed()
            .setColor("#00FF04")
            .setTitle("**Kroma Help**")
            .setDescription("**Préfixe :** `!`\n\n :earth_africa: Liste des commandes **Servers** : \n\n `!serverinfos` `!info` `!covid` `!math` `!ping` `!pourcentage` `!weather`\n\n `!wiki` `!translate` `!system` `!yt`\n\n :desktop: Commande **Hardware/Software** : \n\n`!hs`\n\n :video_game: Liste des commandes **Games** : \n\n `!pendu` `!puissance4` `!quizz`\n\n :headphones: Liste des commandes **Musique** : \n\n `!clear-queue` `!loop` `!play` `!queue` `!search` `!shuffle` `!skip` `!stop`")
        message.channel.send(help_embed)
    }
}
