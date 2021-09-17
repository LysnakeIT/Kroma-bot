module.exports = (client, message, query, tracks) => {
    message.channel.send(`${client.emotes.error} - Vous n'avez pas fourni de réponse valide ... Veuillez renvoyer la commande!`);
};