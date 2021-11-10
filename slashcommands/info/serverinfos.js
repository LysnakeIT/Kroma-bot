const Discord = require("discord.js");

module.exports = {
    name: "serverinfos",
    description: "Retourne les infos du serveur",
    permissions : [""],
    
    run: async (Client, interaction, args) => {
        var infos_embed = new Discord.MessageEmbed()
            .setColor("#00FF04")
            .setTitle(`📈 Statistiques du serveur ${interaction.guild.name} !`)
            .setThumbnail(interaction.guild.iconURL())
            .addField("👑 Fondateur :", `<@${( await interaction.guild.fetchOwner()).id}>`, true)
            .addField("🌍 Région : ", `europe`, true)
            .addField("🔉 Catégories et salons ✏️ :", `${interaction.guild.channels.cache.size}`, true)
            .addField("👱‍♂️ Membres :", `${interaction.guild.memberCount}`, true)
            .addField("⚙️ Roles :", `${interaction.guild.roles.cache.size}`, true)
        interaction.followUp({ embeds : [infos_embed] })
    },
};
