const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Retourne la latence de l'API",
    permissions : [""],

    run: async (client, interaction, args) => {
        interaction.followUp({ content: `:ping_pong: | Pong : **${client.ws.ping} ms**` })
    },
};
