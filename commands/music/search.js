const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: ['sr'],
    category: 'Music',
    utilisation: '{prefix}search [name/URL]',
    voiceChannel: true,

    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send(`${client.emotes.error} Veuillez saisir une recherche valide`);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`${client.emotes.error} Aucun résultat trouvé`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new MessageEmbed();

        embed.setColor('00FF04');
        embed.setAuthor(`Résultats pour ${args.join(' ')}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nChoisissez entre  **1** et **${maxTracks.length}** ou **annuler**`);

        embed.setTimestamp();

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'annuler') return message.channel.send(`${client.emotes.success} Recherche annulée`) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`${client.emotes.error} Réponse non valide, essayez une valeur comprise entre **1** et **${maxTracks.length}** ou **annuler**`);

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                return message.channel.send(`${client.emotes.error} Je ne peux pas rejoindre le canal vocal`);
            }

            await message.channel.send(`${client.emotes.music} Lancement de la musique`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send(`${client.emotes.error} La recherche a expiré !`);
        });
    },
};