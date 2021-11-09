const Discord = require("discord.js");
const Client = new Discord.Client();

module.exports = async (Client, guild, user) => {
    const fetchGuildAuditLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_REMOVE'
    });

    const latestMemberBanAdd = fetchGuildAuditLogs.entries.first();
    const { executor } = latestMemberBanAdd;

    const banembed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL())
        .setDescription(`:airplane_arriving: <@${user.id}> **a été déban du serveur par ${executor.tag}.**`)
        .setColor('#00FF04')
        .setThumbnail(user.displayAvatarURL())
        .setFooter("Kroma'Discord")
        .setTimestamp()
    let channel = guild.channels.cache.get(process.env.channelLogs);
    if (!channel) return;
    channel.send(banembed);
}