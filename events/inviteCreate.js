const Discord = require("discord.js");
const { AuditLogEvent } = require('discord.js');

module.exports = async (client, invite) => {
    const fetchGuildAuditLogs = await invite.guild.fetchAuditLogs({
        limit: 1,
        type: AuditLogEvent.InviteCreate,
    });

    const latestInviteCreate = fetchGuildAuditLogs.entries.first();
    const { executor } = latestInviteCreate;

    const banembed = new Discord.EmbedBuilder()
        .setAuthor({ name : executor.tag, iconURL: executor.displayAvatarURL()})
        .setDescription(`:airplane_arriving: <@${executor.id}> **a crée une invitation ${invite.url}.**`)
        .setColor('#00FF04')
        .setFooter({
            text: `Kroma'Discord`,
        })
        .setTimestamp()
    let channel = client.channels.cache.get(process.env.channelLogs);
    if (!channel) return;
    channel.send({ embeds : [banembed] });
}