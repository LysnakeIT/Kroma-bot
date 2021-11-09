const Discord = require("discord.js");
module.exports = {
    name: "clear",
    category: "info",
    description: "Clear un channel",
    run: async (Client, message, args) => {
        message.delete();
        var embedMention = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setTitle("<:warning:869206692091531305> Veuillez mentionner le nombre de messages")
        if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("**Vous n'avez pas la permission d'éxécuter cette commande !**");
        let args2 = message.content.split(" ").slice(1);
        if (!args2[0]) return message.channel.send(embedMention)
        message.channel.bulkDelete(args[0]).then(() => {
            setTimeout(() => {
                message.channel.send(`**${args2[0]} messages ont été supprimés !**`)
            }, 500);
        })
    }
}