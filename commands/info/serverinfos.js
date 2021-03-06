const Discord = require("discord.js");
module.exports = {
    name: "serverinfos",
    category: "info",
    description: "Retourne les infos du serveur",
    run: async (Client, message, args) => {
        var infos_embed = new Discord.MessageEmbed()
            .setColor("#00FF04")
            .setTitle(`📈 Statistiques du serveur ${message.guild.name} !`)
            .setThumbnail(message.guild.iconURL())
            .addField("👑 Fondateur :", message.guild.owner, true)
            .addField("🌍 Région : ", message.guild.region, true)
            .addField("🔉 Catégories et salons ✏️ :", message.guild.channels.cache.size, true)
            .addField("👱‍♂️ Membres :", message.guild.memberCount, true)
            .addField("⚙️ Roles :", message.guild.roles.cache.size, true)
        message.channel.send(infos_embed);
        console.log("Un Membre a utilisé la commande /serverinfos")
    }
}