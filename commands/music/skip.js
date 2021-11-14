module.exports = {
    name: 'skip',
    aliases: ['sk'],
    category: 'Music',
    utilisation: '{prefix}skip',
    voiceChannel: true,

    run: async (client, message, args) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${client.emotes.error} - Aucune musique en cours de lecture !`);

        const success = queue.skip();

        return message.channel.send(`${client.emotes.success} - La musique actuelle vient d'être ** skipped **!`);
    },
};