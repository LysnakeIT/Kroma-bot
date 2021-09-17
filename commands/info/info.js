const Discord = require("discord.js");
const moment = require("moment");
module.exports = {
    name: "info",
    category: "info",
    description: "Retourne les infos sur un user",
    run: async (Client, message, args) => {
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }
        const member = message.guild.members.cache.get(user.id);
        const embed = new Discord.MessageEmbed()
            .setColor('#00FF04')
            .setThumbnail((member.user.displayAvatarURL({dynamic: true})))
            .setTitle(`📝 Information sur ${member.user.username}#${member.user.discriminator} ${member.nickname ? member.nickname : ''} :`)
            .addField('📟 ID du compte :', `${member.user.id}`, true)
            .addField('👍 A rejoint le serveur le :', `${moment(member.joinedAt).format('LL')}`, true)
            .addField('✅ Status :', `${member.presence.status}`, true)
            .addField('⚙️ Roles :', member.roles.cache.map(roles => `${roles.name}`).join(' - '), true)
            .addField('🎮 Joue a :', `${member.presence.activities && member.presence.activities.length ? member.presence.activities[0].name : 'Rien'}`, true)
            .setFooter(`En réponse à : ${message.author.tag}`)
        message.channel.send({ embeds : [embed] })
    }
}