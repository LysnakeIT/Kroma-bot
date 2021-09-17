module.exports = (client, error, message) => {
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${client.emotes.error} - Il n'y a pas de musique en cours de lecture sur ce serveur!`);
            break;
        case 'NotConnected':
            message.channel.send(`${client.emotes.error} - Vous n'êtes connecté à aucun channel vocal !`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${client.emotes.error} - Je ne parviens pas à rejoindre votre channel vocale, veuillez vérifier mes autorisations!`);
            break;
        default:
            message.channel.send(`${client.emotes.error} - Une erreur s'est produite ... Erreur: ${error}`);
    };
};
