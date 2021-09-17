module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - La musique s'est arrêtée car il n'y a plus de musique dans la file d'attente!`);
};