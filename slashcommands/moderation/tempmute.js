const Discord = require("discord.js");
const ms = require("ms");
module.exports = {
    name: "tempmute",
    description: "Mute temporairement un user",
    permissions: [{
        id: process.env.Modo,
        type: 'ROLE',
        permission: true,
    }],
    options: [
        {
            name: "membre",
            description: "Le membre que l'on veut mute",
            type: "USER",
            required: true
        }, 
        {
            name: 'nombre',
            description: 'Le temps du mute',
            type: "STRING",
            required: true
        },
        {
            name: "raison",
            description: "la raison du mute",
            type: "STRING",
            required: false
        }, 
    ],

    run: async (client, interaction, args) => {
        const mention = interaction.options.getUser("membre");
        if (mention.size === 0) {
            return interaction.followUp("**Vous devez mentionner la personne à mute !**");
        }

        const mute = interaction.guild.members.cache.get(mention.id);
        if (!mute) {
            return interaction.followUp("**Cet utilisateur n'est pas sur le serveur !**");
        }
        if (!interaction.guild.me.permissions.has("KICK_MEMBERS")) return interaction.followUp("**Je n'ai pas la permission de mute !**");

        const duration = interaction.options.getString('nombre');
        const reason = interaction.options.getString('raison');
        await mute.roles.remove(process.env.roleMembre)
        await mute.roles.add(process.env.roleMute)

        const channel = interaction.guild.channels.cache.get(process.env.channelLogs);
        let mute_embed = new Discord.MessageEmbed()
            .setColor("00FF04")
            .setThumbnail(mute.user.displayAvatarURL())
            .setTitle('Rapport de mute :')
            .setDescription(`**Utilisateur mute :** ${mute.user.tag}\n**Modérateur :** ${interaction.user.tag}\n**Temps : ${ms(ms(duration))}** \n**Raison :** ` + reason);
        
        channel.send({embeds : [mute_embed]});
        mute.send(`Salut à toi <@${interaction.user.id}> tu as été **mute** sur le serveur **Kroma'Discord** pendant ${ms(ms(duration))}`)

        setTimeout(() => {
            mute.roles.remove(process.env.roleMute)
            mute.roles.add(process.env.roleMembre)
            mute.send(`<@${mute.user.id}> j'ai le plaisir de t'annoncer que tu as été **démute** sur le serveur **Kroma'Discord** `)
            console.log(`${mute.user.tag} est démute`)
        }, ms(duration))
    }
}