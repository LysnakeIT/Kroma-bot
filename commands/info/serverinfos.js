const Discord = require("discord.js");

module.exports = {
    name: "serverinfos",
    category: "info",
    description: "Retourne les infos du serveur",
    
    run: async (Client, message, args) => {
        var infos_embed = new Discord.EmbedBuilder()
            .setColor("#00FF04")
            .setTitle(`📈 Statistiques du serveur ${message.guild.name} !`)
            .setThumbnail(message.guild.iconURL())
            .addFields([
                { name : '👑 Fondateur :', value : `<@${( await message.guild.fetchOwner()).id}>`, inline : true},
                { name : '🌍 Région : ', value : `europe`, inline : true},
                { name : '🔉 Catégories et salons ✏️ :', value : `${message.guild.channels.cache.size}`, inline : true},
                { name : '👱‍♂️ Membres :', value : `${message.guild.memberCount}`, inline : true},
                { name : '⚙️ Roles :', value : `${message.guild.roles.cache.size}`, inline : true},
            ])
        message.reply({ embeds : [infos_embed] });
    }
}