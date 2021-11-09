const Discord = require("discord.js");
module.exports = {
    name: "slowmode",
    category: "moderation",
    description: "Change la durée du slowmode d'un salon",
    run: async (Client, message, args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        if (!args[0]) return message.channel.send(`Vous n'avez pas spécifié de temps.`)
        if (isNaN(parseInt(args[0]))) return message.channel.send('Ce n\'est pas un nombre')

        if (args[0] != 0) {
            let embed = new Discord.MessageEmbed()
                .setTitle("Le slowmode a été activé sur ce channel")
                .setColor("#2F3136")
            message.channel.setRateLimitPerUser(args[0])
            message.channel.send(embed)
        } else {
            let embed = new Discord.MessageEmbed()
                .setTitle("Le slowmode a été désactivé sur ce channel")
                .setColor("#2F3136")
            message.channel.setRateLimitPerUser(args[0])
            message.channel.send(embed)
        }
    }
}