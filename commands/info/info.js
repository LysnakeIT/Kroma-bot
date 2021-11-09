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
        const member = message.guild.member(user);
        var presence = user.presence.activities.length ? user.presence.activities.filter(x => x.type === "PLAYING") : null;
        const embed = new Discord.MessageEmbed()
            .setColor('#00FF04')
            .setThumbnail((user.displayAvatarURL()))
            .setTitle(`📝 Information sur ${user.username}#${user.discriminator} ${member.nickname ? member.nickname : ''} :`)
            .addField('📟 ID du compte :', `${user.id}`, true)
            .addField('👍 A rejoint le serveur le :', `${moment.utc(member.joinedAt).format('LL')}`, true)
            .addField('✅ Status :', `${user.presence.status}`, true)
            .addField('⚙️ Roles :', member.roles.cache.map(roles => `${roles.name}`).join(' - '), true)
            .addField('🎮 Joue a :', `${presence && presence.length ? presence[0].name : 'Rien'}`, true)
            .setFooter(`En réponse à : ${message.author.tag}`)
        message.channel.send(embed)
    }
}