const Discord = require("discord.js");
const client = require("..");

module.exports = async (Client, oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content) {
        return
    }
    let embed = new Discord.MessageEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
        .setDescription(`:pencil2: **Message envoyé par** <@${oldMessage.author.id}> **modifié dans** <#${oldMessage.channel.id}>.`)
        .addField('Ancien', `\`\`\`${oldMessage.content}\`\`\``)
        .addField('Nouveau', `\`\`\`${newMessage.content}\`\`\``)
        .setColor('#00FF04')
        .setFooter("Kroma'Discord")
        .setTimestamp()
    let channel = newMessage.guild.channels.cache.get(process.env.channelLogs);
    if (!channel) return;
    channel.send({ embeds : [embed] });
}