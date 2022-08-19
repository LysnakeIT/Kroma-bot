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
        const embed = new Discord.EmbedBuilder()
            .setColor('#00FF04')
            .setThumbnail((member.user.displayAvatarURL({dynamic: true})))
            .setTitle(`📝 Information sur ${member.user.username}#${member.user.discriminator} ${member.nickname ? member.nickname : ''} :`)
            .addFields([
                { name : '📟 ID du compte :', value : `${member.user.id}`, inline : true},
                { name : '👍 A rejoint le serveur le :', value : `${moment(member.joinedAt).format('LL')}`, inline : true},
                { name : '✅ Status :', value : `${member.presence.status}`, inline : true},
                { name : '⚙️ Roles :', value : member.roles.cache.map(roles => `${roles.name}`).join(' - '), inline : true},
                { name : '🎮 Joue a :', value : `${member.presence.activities && member.presence.activities.length ? member.presence.activities[0].name : 'Rien'}`, inline : true},
            ])
            .setFooter({
                text: `En réponse à : ${interaction.user.tag}`
              })
            interaction.followUp({ embeds : [embed] })
    },
};
