const Discord = require("discord.js");

module.exports = {
    name: "clear",
    category: "info",
    description: "Clear un channel",
    
    run: async (Client, message, args) => {
        var embedMention = new Discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTitle("<:warning:869206692091531305> Veuillez mentionner le nombre de messages")
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("**Vous n'avez pas la permission d'éxécuter cette commande !**");
        let args2 = message.content.split(" ").slice(1);
        if (!args2[0]) return message.reply({ embeds : [embedMention] })
        message.channel.bulkDelete(args[0]).then(() => {
            setTimeout(() => {
                message.channel.send({ content: `**${args2[0]} messages ont été supprimés !**`})
                console.log(`${message.author.username} a supprimé ${args2[0]} messages`)
            }, 500);
        })
    }
}