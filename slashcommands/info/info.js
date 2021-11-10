const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "info",
    description: "Retourne les infos sur un user",
    permissions : [""],
    options: [
        {
          name: "membre",
          description: "Le membre dont on veux les informations",
          type: "USER",
          required: false
        }
    ],
    
    run: async (client, interaction, args) => {
        if (interaction.options.getUser("membre")) {
            const mention = interaction.options.getUser("membre");
            user = interaction.guild.members.cache.get(mention.id);
        } else {
            user = interaction.member;
        }
        const member = interaction.guild.members.cache.get(user.id);
        const embed = new Discord.MessageEmbed()
            .setColor('#00FF04')
            .setThumbnail((member.user.displayAvatarURL({dynamic: true})))
            .setTitle(`📝 Information sur ${member.user.username}#${member.user.discriminator} ${member.nickname ? member.nickname : ''} :`)
            .addField('📟 ID du compte :', `${member.user.id}`, true)
            .addField('👍 A rejoint le serveur le :', `${moment(member.joinedAt).format('LL')}`, true)
            .addField('✅ Status :', `${member.presence.status}`, true)
            .addField('⚙️ Roles :', member.roles.cache.map(roles => `${roles.name}`).join(' - '), true)
            .addField('🎮 Joue a :', `${member.presence.activities && member.presence.activities.length ? member.presence.activities[0].name : 'Rien'}`, true)
            .setFooter(`En réponse à : ${interaction.user.tag}`)
            interaction.followUp({ embeds : [embed] })
    },
};
