const { PermissionsBitField, EmbedBuilder} = require('discord.js');
const fetch = require('node-fetch');
const ms = require('ms');

module.exports = {
    name: "timeout",
    category: "info",
    description: "Mute temporairement un user",

    run: async (Client, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const time = args.slice(1).join(' ');


        const user = message.mentions.users.first();
        const milliseconds = ms(time);

        if (!user) return message.reply('Veuillez mentionner le membre à mute.')

        const iosTime = new Date(Date.now() + 100000).toISOString();

        await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ communication_disabled_until: iosTime }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bot ${Client.token}`,
            },
        });
        const channel = message.guild.channels.cache.get(process.env.channelLogs);
        let mute_embed = new EmbedBuilder()
            .setColor("00FF04")
            .setThumbnail(user.displayAvatarURL())
            .setTitle('Rapport de mute :')
            .setDescription(`**Utilisateur mute :** ${user.tag}\n**Modérateur :** ${message.author.tag}\n**Temps : ${time}**`);
        channel.send({ embeds: [mute_embed] });
        user.send({ content :`Salut à toi <@${user.id}> tu as été **mute** sur le serveur **Kroma'Discord** pendant ${time}`})
        console.log(`${user.tag} est mute`)
    },
};
