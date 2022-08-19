const Discord = require("discord.js");

module.exports = {
    name: "serverinfos",
    description: "Retourne les infos du serveur",
    permissions : [""],
    
    run: async (Client, interaction, args) => {
        var infos_embed = new Discord.EmbedBuilder()
            .setColor("#00FF04")
            .setTitle(`📈 Statistiques du serveur ${interaction.guild.name} !`)
            .setThumbnail(interaction.guild.iconURL())
            .addFields([
                { name : '👑 Fondateur :', value : `<@${( await interaction.guild.fetchOwner()).id}>`, inline : true},
                { name : '🌍 Région : ', value : `europe`, inline : true},
                { name : '🔉 Catégories et salons ✏️ :', value : `${interaction.guild.channels.cache.size}`, inline : true},
                { name : '👱‍♂️ Membres :', value : `${interaction.guild.memberCount}`, inline : true},
                { name : '⚙️ Roles :', value : `${interaction.guild.roles.cache.size}`, inline : true},
            ])
        interaction.followUp({ embeds : [infos_embed] })
    },
};
