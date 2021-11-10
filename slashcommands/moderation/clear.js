const Discord = require("discord.js");
module.exports = {
    name: "clear",
    description: "Clear les messages d'un channel",
    permissions: [{
        id: process.env.Modo,
        type: 'ROLE',
        permission: true,
    }],
    options: [
        {
            name: 'nombre',
            description: '1-100',
            type: "INTEGER",
            required: true
        }
    ],

    run: async (client, interaction, args) => {
        var embedMention = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setTitle("<:warning:869206692091531305> Veuillez mentionner le nombre de messages")
            
        let args2 = interaction.options.getInteger('nombre')
        interaction.channel.bulkDelete(args2);
        return interaction.followUp(`${interaction.user.username} a supprimé ${args2} messages`);
    },
};
