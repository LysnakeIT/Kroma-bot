const Discord = require("discord.js");
module.exports = {
    name: "mute",
    category: "info",
    description: "Mute indéfiniment un user",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("**Vous n'avez pas la permission d'éxécuter cette commande !**");

        if (message.mentions.users.size === 0) {
            return message.channel.send("**Vous devez mentionner la personne à mute !**");
        }

        const mute = message.mentions.members.first()
        if (!mute) {
            return message.channel.send("**Cet utilisateur n'est pas sur le serveur !**");
        }
        if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.channel.send("**Je n'ai pas la permission de mute !**");
        mute.roles.remove(process.env.roleMembre)
        mute.roles.add(process.env.roleMute).then(member => {
            let mute_embed = new Discord.MessageEmbed()
            .setColor("00FF04")
            .setThumbnail(mute.user.displayAvatarURL())
            .setTitle('Rapport de mute :')
            .setDescription(`**Utilisateur mute :** <@${mute.user.id}>\n**Modérateur :** <@${message.author.id}>`);
            message.channel.send({embeds : [mute_embed]})
        });
    }
}