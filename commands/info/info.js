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
            .setTitle(`๐ Information sur ${user.username}#${user.discriminator} ${member.nickname ? member.nickname : ''} :`)
            .addField('๐ ID du compte :', `${user.id}`, true)
            .addField('๐ A rejoint le serveur le :', `${moment.utc(member.joinedAt).format('LL')}`, true)
            .addField('โ Status :', `${user.presence.status}`, true)
            .addField('โ๏ธ Roles :', member.roles.cache.map(roles => `${roles.name}`).join(' - '), true)
            .addField('๐ฎ Joue a :', `${presence && presence.length ? presence[0].name : 'Rien'}`, true)
            .setFooter(`En rรฉponse ร  : ${message.author.tag}`)
        message.channel.send(embed).then(message => message.delete({ timeout: 15000 }));
    }
}