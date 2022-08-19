const Discord = require("discord.js");

module.exports = async (client, member) => {
    const fetchGuildAuditLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD'
    });

    const latestMemberBanAdd = fetchGuildAuditLogs.entries.first();
    const { executor } = latestMemberBanAdd;

    const banembed = new Discord.EmbedBuilder()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setDescription(`:airplane: <@${member.user.id}> **banni du serveur par ${executor.tag}.**`)
        .setColor('#00FF04')
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter({
            text: `Kroma'Discord`,
        })
        .setTimestamp()
    let channel = client.channels.cache.get(process.env.channelLogs);
    if (!channel) return;
    channel.send({ embeds : [banembed] });
}