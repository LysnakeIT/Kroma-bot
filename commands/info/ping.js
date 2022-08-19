const Discord = require('discord.js');

module.exports = {
    name: "ping",
    category: "info",
    description: "Retourne la latence de l'API",

    run: async (Client, message, args) => {
        let début = Date.now();
        return await message.channel.send({ content: `:ping_pong: | Ping`}).then(async (m) => await m.edit({ content: `:ping_pong: | Pong : **${Date.now() - début} ms**`}));
    }
}