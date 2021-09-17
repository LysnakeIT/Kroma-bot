module.exports = (client, message, queue, track) => {
    message.channel.send(`${client.emotes.music} - ${track.title} a été ajouté à la file d'attente !`);
};