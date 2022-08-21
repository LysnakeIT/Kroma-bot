const Discord = require("discord.js");

module.exports = async (Client, oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content) {
        return
    }
    let embed = new Discord.EmbedBuilder()
        .setAuthor({ name : oldMessage.author.tag, iconURL: oldMessage.author.displayAvatarURL()})
        .setDescription(`:pencil2: **Message envoyé par** <@${oldMessage.author.id}> **modifié dans** <#${oldMessage.channel.id}>.`)
        .addFields([
            { name : 'Ancien', value : `\`\`\`${oldMessage.content}\`\`\``},
            { name : 'Nouveau', value : `\`\`\`${newMessage.content}\`\`\``},
        ])
        .setColor('#00FF04')
        .setFooter({
            text: `Kroma'Discord`,
        })
        .setTimestamp()
    let channel = newMessage.guild.channels.cache.get(process.env.channelLogs);
    if (!channel) return;
    channel.send({ embeds : [embed] });
}