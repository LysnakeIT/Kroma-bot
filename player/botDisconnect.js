module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - La musique s'est arrêtée car j'ai été déconnecté du channel !`);
};