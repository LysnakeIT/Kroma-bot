const Discord = require("discord.js");
let { version } = require("discord.js");
const os = require('os')
module.exports = {
    name: "system",
    category: "info",
    description: "Retourne les infos systemes du bot",
    run: async (Client, message, args) => {
        let os_embed = new Discord.MessageEmbed()
            .setColor("#00FF04")
            .setTitle(`Informations système du bot !`)
            .setThumbnail(Client.user.displayAvatarURL())
            .addField(":bullettrain_front: • RAM utilisée : ", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
            .addField(":notepad_spiral: • Discord.js", `${version}`, true)
            .addField(":flying_saucer: • Node :", `${process.version}`, true)
            .addField(":fire: • Processeur :", `\`\`\`${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField(":fire: • Utilisation CPU :", `\`${system.cpu}\``, true)
            .addField(":gear: • Architecture :", `\`${os.arch()}\``, true)
            .addField(":desktop: • OS :", `\`${system.os}\``, true)
            .setFooter(`• Système de ${Client.user.username}`, Client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send({ embeds : [os_embed] });
    }
}