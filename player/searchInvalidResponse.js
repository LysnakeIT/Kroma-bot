module.exports = (client, message, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop();
        return message.channel.send(`${client.emotes.success} - La sélection a été ** annulée **!`);
    } else message.channel.send(`${client.emotes.error} - Vous devez envoyer un numéro valide entre ** 1 ** et **${tracks.length}** !`);
};