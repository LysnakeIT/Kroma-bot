const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const ms = require("ms");

module.exports = {
    name: "timeout",
    description: "Mute temporairement un user",
    permissions: [PermissionsBitField.Flags.Administrator],
    options: [
        {
            name: "membre",
            description: "Le membre que l'on veut mute",
            type: "USER",
            required: true
        }, 
        {
            name: 'temps',
            description: 'Le temps du mute',
            type: "STRING",
            required: true
        },
        {
            name: "raison",
            description: "la raison du mute",
            type: "STRING",
            required: false
        }, 
    ],

    run: async (client, interaction, args) => {
        const mention = interaction.options.getUser("membre");
        if (mention.size === 0) {
            return interaction.followUp("**Vous devez mentionner la personne à mute !**");
        }

        const mute = interaction.guild.members.cache.get(mention.id);
        if (!mute) {
            return interaction.followUp("**Cet utilisateur n'est pas sur le serveur !**");
        }

        const duration = interaction.options.getString('temps');
        const reason = interaction.options.getString('raison');

        const milliseconds = ms(duration);
        if (!milliseconds || milliseconds < 10000 || milliseconds > 2419200000) {
            return interaction.followUp('Veuillez indiquer une durée valide.');
        }

        await mute.timeout(milliseconds, reason)
        const channel = interaction.guild.channels.cache.get(process.env.channelLogs);

        let mute_embed = new EmbedBuilder()
            .setColor("00FF04")
            .setThumbnail(mute.displayAvatarURL())
            .setTitle('Rapport de mute :')
            .setDescription(`**Utilisateur mute :** ${mute.user.tag}\n**Modérateur :** ${interaction.user.tag}\n**Temps : ${duration}** \n**Raison :** ` + reason);
        channel.send({ embeds: [mute_embed] });
        mute.send({ content: `Salut à toi <@${mute.id}> tu as été **mute** sur le serveur **Kroma'Discord** pendant ${duration}`})
        interaction.followUp({ content: `${mute.user.tag} est mute`})
    }
}
