const Discord = require("discord.js");

module.exports = {
    name: "unmute",
    category: "info",
    description: "Unmute un user",

    run: async (Client, message, args) => {
        if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("**Vous n'avez pas la permission d'éxécuter cette commande !**");

        if (message.mentions.users.size === 0) {
            return message.reply("**Vous devez mentionner la personne à mute !**");
        }
        const mute = message.mentions.members.first()
        if (!mute) {
            return message.reply("**Cet utilisateur n'est pas sur le serveur !**");
        }
        if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("**Je n'ai pas la permission de mute !**");
        mute.roles.remove(process.env.roleMute)
        mute.roles.add(process.env.roleMembre).then(member => {
            message.reply(`**<@${mute.user.id}> a été unmute par ${message.author.username}**`)
        });
    }
}