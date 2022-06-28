var config = require('../config/bot');
const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
    const prefix = config.discord.prefix;

    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    let command = client.commands.get(cmd);

    if (command)
        command.run(client, message, args);
}


