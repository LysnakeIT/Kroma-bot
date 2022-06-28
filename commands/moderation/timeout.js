const Discord = require("discord.js");
const fetch = require('node-fetch');
const ms = require('ms');

module.exports = {
    name: "timeout",
    category: "info",
    description: "Mute temporairement un user",

    run: async (Client, message, args) => {
        const time = args.slice(1).join(' ');

        if (!time) return message.channel.send('Veuillez indiquer une durée valide.')

        const user = message.mentions.users.first();
        const milliseconds = ms(time);

        if (!user) return message.channel.send('Veuillez mentionner le membre à mute.')
        if (!milliseconds || milliseconds < 10000 || milliseconds > 2419200000) {
            return message.channel.send('Veuillez indiquer une durée valide.');
        }

        const iosTime = new Date(Date.now() + milliseconds).toISOString();

        await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ communication_disabled_until: iosTime }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bot ${Client.token}`,
            },
        });
        const channel = message.guild.channels.cache.get("792460321432010805");
        let mute_embed = new Discord.MessageEmbed()
            .setColor("00FF04")
            .setThumbnail(user.displayAvatarURL())
            .setTitle('Rapport de mute :')
            .setDescription(`**Utilisateur mute :** ${user.tag}\n**Modérateur :** ${message.author.tag}\n**Temps : ${time}**`);
        channel.send({ embeds: [mute_embed] });
        user.send(`Salut à toi <@${user.id}> tu as été **mute** sur le serveur **Kroma'Discord** pendant ${time}`)
        console.log(`${user.tag} est mute`)
    },
};