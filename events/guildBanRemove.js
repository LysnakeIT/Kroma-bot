const Discord = require("discord.js");

module.exports = async (client, member) => {
    const fetchGuildAuditLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_REMOVE'
    });

    const latestMemberBanAdd = fetchGuildAuditLogs.entries.first();
    const { executor } = latestMemberBanAdd;

    const banembed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setDescription(`:airplane_arriving: <@${member.user.id}> **a été déban du serveur par ${executor.tag}.**`)
        .setColor('#00FF04')
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter("Kroma'Discord")
        .setTimestamp()
    let channel = client.channels.cache.get(process.env.channelLogs);
    if (!channel) return;
    channel.send({ embeds : [banembed] });
}