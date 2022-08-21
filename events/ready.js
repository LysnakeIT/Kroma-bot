const { ActivityType } = require('discord.js');

module.exports = async (client) => {
    console.log("Le bot est allumé");

    var status = [
        `V4.5 Type !help`,
        `Developed by Lysnake`
    ];

    setInterval(function () {
        var message = status[Math.floor(Math.random() * status.length)];
        client.user.setPresence({ activities: [{ name: message, type: ActivityType.Watching }], status: 'online'});
    }, 2500)
}