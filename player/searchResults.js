module.exports = (client, message, query, tracks) => {
    message.channel.send({
        embed: {
            color: '#00FF04',
            author: { name: `Voici vos résultats de recherche pour ${query}` },
            footer: { text: 'Developpé par Miorla'},
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
        },
    });
};