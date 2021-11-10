const Discord = require('discord.js');

module.exports = {
    name: "ping",
    category: "info",
    description: "Retourne la latence de l'API",

    run: async (Client, message, args) => {
        let début = Date.now();
        await message.channel.send(":ping_pong: | Ping").then(async (m) => await m.edit(`:ping_pong: | Pong : **${Date.now() - début} ms**`));
    }
}