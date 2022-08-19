module.exports = {
    name: 'clear-queue',
    aliases: ['cq'],
    category: 'Music',
    utilisation: '{prefix}clear-queue',
    voiceChannel: true,

    run: async (client, message, args) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply(`${client.emotes.error} - Aucune musique en cours de lecture !`);

        if (!queue.tracks[0]) return message.reply(`${client.emotes.error} - Il n'y a qu'une seule musique dans la file d'attente.`);

        await queue.clear();

        message.reply(`${client.emotes.success} - La file d'attente vient d'être ** supprimée **!`);
    },
};