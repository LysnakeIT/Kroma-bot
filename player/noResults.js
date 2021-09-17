module.exports = (client, message, query) => {
    message.channel.send(`${client.emotes.error} - Aucun résultat trouvé sur YouTube pour ${query} !`);
};