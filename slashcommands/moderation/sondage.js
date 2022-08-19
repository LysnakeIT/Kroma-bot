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
                .addField(`${args2}`, "Répondre avec :white_check_mark: ou :x:")
                .setColor("00FF04")
                .setTimestamp()
                channel.send(`@everyone`)
                channel.send({embeds : [embed]})
                .then(function (message) {
                    message.react('802645523931856907')
                    message.react('802645550435532810')
                }).catch(function () {
                });
                await interaction.deleteReply();
        } else {
            return interaction.followUp("Tu n'as pas la permission")
        }
    }
}