const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "mute",
    description: "mute un membre",
    permissions: [PermissionsBitField.Flags.Administrator],
    options: [
        {
            name: "membre",
            description: "Le membre à mute",
            type: "USER",
            required: true
        }
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
        if (!interaction.guild.me.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.followUp("**Je n'ai pas la permission de mute !**");
        mute.roles.remove(process.env.roleMembre)
        mute.roles.add(process.env.roleMembre).then(member => {
            let mute_embed = new EmbedBuilder()
            .setColor("00FF04")
            .setThumbnail(mute.user.displayAvatarURL())
            .setTitle('Rapport de mute :')
            .setDescription(`**Utilisateur mute :** <@${mute.user.id}>\n**Modérateur :** <@${interaction.user.id}>`);
            interaction.followUp({embeds : [mute_embed]})
        });
    }
}