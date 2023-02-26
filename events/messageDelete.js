const Discord = require("discord.js");

module.exports = async (Client, message) => {
    if (message.author == null) return;
    let embed = new Discord.EmbedBuilder()
        .setAuthor({ name : message.author.tag, iconURL: message.author.displayAvatarURL()})
        .setDescription(`:wastebasket: **Message envoyé par** <@${message.author.id}> **supprimé dans** <#${message.channel.id}>.`)
        .addFields([
            { name : 'Message supprimé', value : `\`\`\`${message.content}\`\`\``, inline : true},
        ])
        .setColor('#00FF04')
        .setFooter({
            text: `Kroma'Discord`,
        })
        .setTimestamp()
    let channel = message.guild.channels.cache.get(process.env.channelLogs);
    if (!channel) return;
    channel.send({ embeds : [embed] });
}