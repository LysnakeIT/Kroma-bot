const { QueryType } = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Music',
    utilisation: '{prefix}play [name/URL]',
    voiceChannel: true,

    run: async (client, message, args) => {
        if (!args[0]) return message.reply(`${client.emotes.error} Veuillez saisir une recherche valide`);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.reply(`${client.emotes.error} Aucun résultat trouvé`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.reply(`${client.emotes.error} Je ne peux pas rejoindre le canal vocal`);
        }

        await message.reply(`${client.emotes.music} Lancement de la musique`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};