const Discord = require("discord.js");
const Client = new Discord.Client();

module.exports = async (Client) => {
    console.log("Le bot est allumé");

    var status = [
        `V4.0 Type !help`,
        `Developed by Lysnake`
    ];

    setInterval(function () {
        var message = status[Math.floor(Math.random() * status.length)];
        Client.user.setActivity(message, { type: 'WATCHING' });
    }, 250000)
    Client.user.setStatus('online')
}