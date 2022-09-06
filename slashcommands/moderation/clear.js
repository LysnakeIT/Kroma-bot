const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: "clear",
    description: "Clear les messages d'un channel",
    permissions: [PermissionsBitField.Flags.ManageMessages],
    options: [
        {
            name: 'nombre',
            description: '1-100',
            type: "INTEGER",
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        let args2 = interaction.options.getInteger('nombre')
        interaction.channel.bulkDelete(args2);
        return interaction.followUp({ content : `${interaction.user.username} a supprimé ${args2} messages`});
    },
};
