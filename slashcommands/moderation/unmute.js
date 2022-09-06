const { PermissionsBitField} = require('discord.js');

module.exports = {
    name: "unmute",
    description: "unmute un membre",
    permissions: [PermissionsBitField.Flags.Administrator],
    options: [
        {
            name: "membre",
            description: "Le membre que l'on veut unmute",
            type: "USER",
            required: true
        }
    ],
    
    run: async (client, interaction, args) => {
        const mention = interaction.options.getUser("membre");
        if (mention.size === 0) {
            return interaction.followUp("**Vous devez mentionner la personne à unmute !**");
        }

        const mute = interaction.guild.members.cache.get(mention.id);
        if (!mute) {
            return interaction.followUp("**Cet utilisateur n'est pas sur le serveur !**");
        }
        if (!interaction.guild.me.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.followUp("**Je n'ai pas la permission de mute !**");
        mute.roles.remove(process.env.roleMute)
        mute.roles.add(process.env.roleMembre).then(member => {
            return interaction.followUp(`**<@${mute.user.id}> a été unmute par ${interaction.user.username}**`)
        });
    }
}