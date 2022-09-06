const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "slowmode",
    description: "Change la durée du slowmode d'un salon",
    permissions: [PermissionsBitField.Flags.Administrator],
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
        if (!interaction.options.getInteger('nombre')) return interaction.followUp(`Vous n'avez pas spécifié de temps.`)
        if (isNaN(parseInt(args2))) return interaction.followUp('Ce n\'est pas un nombre')

        if (args2 != 1) {
            let embed = new EmbedBuilder()
                .setTitle("Le slowmode a été activé sur ce channel")
                .setColor("#2F3136")
            interaction.channel.setRateLimitPerUser(args2)
            interaction.followUp({ embeds: [embed] })
        } else {
            let embed = new EmbedBuilder()
                .setTitle("Le slowmode a été désactivé sur ce channel")
                .setColor("#2F3136")
            interaction.channel.setRateLimitPerUser(0)
            interaction.followUp({ embeds: [embed] })
        }
    }
}