module.exports = {
    name: 'stop',
    aliases: ['dc'],
    category: 'Music',
    utilisation: '{prefix}stop',
    voiceChannel: true,

    run: async (client, message, args) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply(`${client.emotes.error} - Aucune musique en cours de lecture !`);

        queue.destroy();

        message.reply(`${client.emotes.success} - La musique ** s'est arrêtée ** sur ce serveur !`);
    },
};