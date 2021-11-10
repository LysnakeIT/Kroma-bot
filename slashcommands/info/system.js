const Discord = require("discord.js");
const os = require('os')
let { version } = require("discord.js");
const cpuStat = require("cpu-stat");
const moment = require("moment");
require("moment-duration-format");
const ms = require('pretty-ms');

module.exports = {
    name: "system",
    description: "Retourne les infos systemes du bot",
    permissions: [""],
    
    run: async (Client, interaction, args) => {

        const duration = moment.duration(Client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

        cpuStat.usagePercent(function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
        let os_embed = new Discord.MessageEmbed()
            .setColor("#00FF04")
            .setTitle(`Informations système du bot !`)
            .setThumbnail(Client.user.displayAvatarURL())
            .addField(":bullettrain_front: • RAM utilisée : ", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
            .addField(":notepad_spiral: • Discord.js", `${version}`, true)
            .addField(":flying_saucer: • Node :", `${process.version}`, true)
            .addField(":flying_saucer: • Websocket ms :", `${ms(Client.ws.ping)}`, true)
            .addField(":flying_saucer: • Uptime :", `${duration}`, true)
            .addField(":fire: • Processeur :", `\`\`\`${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField(":fire: • Utilisation CPU :", `\`${percent.toFixed(2)}%\``, true)
            .addField(":gear: • Architecture :", `\`${os.arch()}\``, true)
            .addField(":desktop: • OS :", `\`${os.platform()}\``, true)
            .setFooter(`• Système de ${Client.user.username}`, Client.user.displayAvatarURL())
            .setTimestamp()
        interaction.followUp({ embeds: [os_embed] })
    })
}}
