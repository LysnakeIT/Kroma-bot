const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'queue',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}queue',
    voiceChannel: true,

    run: async (client, message, args) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`${client.emotes.error} - Aucune musique en cours de lecture !`);

        if (!queue.tracks[0]) return message.channel.send(`${client.emotes.error} - Aucune musique dans la file d'attente après celle-ci !`);

        const embed = new MessageEmbed();
        const methods = ['', '🔁', '🔂'];

        embed.setColor("00FF04");
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor(`File d'attente du serveur - ${message.guild.name} ${methods[queue.repeatMode]}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (demandé par : **${track.requestedBy.username}**)`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `Et **${songs - 5}** autres musiques ...` : `Dans la playlist **${songs}** musique(s)...`;

        embed.setDescription(`**Actuel** : ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};