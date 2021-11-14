const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    category: 'Music',
    utilisation: '{prefix}loop',
    voiceChannel: true,


    run: async (client, message, args) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${client.emotes.error} - Aucune musique en cours de lecture !`);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send(`${client.emotes.error} Vous devez d'abord désactiver la musique actuelle en mode boucle. `);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Loop mode **${queue.repeatMode === 0 ? 'désactivé' : 'activé'}** toute la file d'attente sera répétée à l'infini 🔁` : `Une erreur est survenue ${message.author}... réessayer ? ${client.emotes.error}`);
        } else {
            if (queue.repeatMode === 2) return message.channel.send(` ${client.emotes.error} Vous devez d'abord désactiver la musique actuelle en mode boucle. `);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Loop mode **${queue.repeatMode === 0 ? 'désactivé' : 'activé'}** toute la file d'attente sera répétée à l'infini 🔂` : `Une erreur est survenue ${message.author}... réessayer ? ${client.emotes.error}`);
        };
    },
};