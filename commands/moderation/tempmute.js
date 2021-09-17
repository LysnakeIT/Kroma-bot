const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "tempmute",
    category: "info",
    description: "Mute temporairement un user",
    run: async (Client, message, args) => {
        if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à mute.')
        if (!member.manageable) return message.channel.send('Le bot ne peut pas mute ce membre.')
        const duration = args[1]
        if (!duration) return message.channel.send('Veuillez indiquer une durée valide.')
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie.'
        await member.roles.remove(process.env.roleMembre)
        await member.roles.add(process.env.roleMute)
        let user = message.mentions.users.first();
        const channel = message.guild.channels.cache.get(process.env.channelLogs);
        let mute_embed = new Discord.MessageEmbed()
            .setColor("00FF04")
            .setThumbnail(user.displayAvatarURL())
            .setTitle('Rapport de mute :')
            .setDescription(`**Utilisateur mute :** ${user.tag}\n**Modérateur :** ${message.author.tag}\n**Temps : ${ms(ms(duration))}** \n**Raison :** ` + reason);

        // Envoi du message
        channel.send({embeds : [mute_embed]});
        user.send(`Salut à toi <@${member.user.id}> tu as été **mute** sur le serveur **Kroma'Discord** pendant ${ms(ms(duration))}`)
        console.log(`${member.user.tag} est mute`)
        setTimeout(() => {
            if (member.deleted || !member.manageable) return
            member.roles.remove(process.env.roleMute)
            member.roles.add(process.env.roleMembre)
            user.send(`<@${member.user.id}> j'ai le plaisir de t'annoncer que tu as été **démute** sur le serveur **Kroma'Discord** `)
            console.log(`${member.user.tag} est démute`)
        }, ms(duration))
    }
}