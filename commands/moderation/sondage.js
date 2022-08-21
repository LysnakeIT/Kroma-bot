const Discord = require("discord.js");

module.exports = {
    name: "sondage",
    category: "info",
    description: "Envoie un sondage",

    run: async (Client, message, args) => {
        function emoji(id) {
            return client.emojis.get(id).toString();
        }
        const channel = message.guild.channels.cache.get(process.env.channelPoll);
        if (message.author.id == process.env.createurPoll) {
            let args = message.content.split(" ").slice(1);
            let thingToEcho = args.join("")
            if (thingToEcho == ("")) return
            const embed = new Discord.EmbedBuilder()
                .setTitle("📊 __**Sondage**__")
                .addFields([
                    { name: `${thingToEcho}`, value: `Répondre avec :white_check_mark: ou :x:` }
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
            return message.reply({ content:"Tu n'as pas la permission"})
        }
    }
}