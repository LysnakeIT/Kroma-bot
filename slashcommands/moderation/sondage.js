const Discord = require("discord.js");
module.exports = {
    name: "sondage",
    description: "Envoie un sondage",
    permissions: [{
        id: process.env.Modo,
        type: 'ROLE',
        permission: true,
    }],
    options: [
        {
            name: 'message',
            description: 'Le message du sondage',
            type: "STRING",
            required: true
        }
    ],
    
    run: async (client, interaction, args) => {
        const channel = interaction.guild.channels.cache.get(process.env.channelPoll);
        if (interaction.user.id == process.env.createurPoll) {
            let args2 = interaction.options.getString('message')
            const embed = new Discord.EmbedBuilder()
                .setTitle("📊 __**Sondage**__")
                .addFields([
                    { name: `${args2}`, value: `Répondre avec :white_check_mark: ou :x:` }
                ])
                .setColor("00FF04")
                .setTimestamp()
                channel.send({ content: `@everyone`})
                channel.send({embeds : [embed]})
                .then(function (message) {
                    message.react('802645523931856907')
                    message.react('802645550435532810')
                }).catch(function () {
                });
        } else {
            return interaction.followUp({ content:"Tu n'as pas la permission"})
        }
    }
}