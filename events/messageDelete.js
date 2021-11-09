const Discord = require("discord.js");
const Client = new Discord.Client();

module.exports = async (Client, message) => {
    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(`:wastebasket: **Message envoyé par** <@${message.author.id}> **supprimé dans** <#${message.channel.id}>.`)
        .addField('Message supprimé', `\`\`\`${message.content}\`\`\``, true)
        .setColor('#00FF04')
        .setFooter("Kroma'Discord")
        .setTimestamp()
    let channel = message.guild.channels.cache.get(process.env.channelLogs);
    if (!channel) return;
    channel.send(embed);
}