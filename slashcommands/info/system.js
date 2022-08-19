const Discord = require("discord.js");
const os = require('os')
let { version } = require("discord.js");
const cpuStat = require("cpu-stat");
const moment = require("moment");
require("moment-duration-format");
const ms = require('pretty-ms');
const {ApplicationCommandType} = require('discord.js');


module.exports = {
    name: "system",
    description: "Retourne les infos systemes du bot",
    type: ApplicationCommandType.ChatInput,
    permissions: [""],
    
    run: async (Client, interaction, args) => {

        const duration = moment.duration(Client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

        cpuStat.usagePercent(function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }
        let os_embed = new Discord.EmbedBuilder()
            .setColor("#00FF04")
            .setTitle(`Informations système du bot !`)
            .setThumbnail(Client.user.displayAvatarURL())
            .addFields([
                { name : ':bullettrain_front: • RAM utilisée : ', value : `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, inline : true},
                { name : ':notepad_spiral: • Discord.js', value : `${version}`, inline : true},
                { name : ':flying_saucer: • Node :', value : `${process.version}`, inline : true},
                { name : ':flying_saucer: • Websocket ms :', value : `${ms(Client.ws.ping)}`, inline : true},
                { name : ':flying_saucer: • Uptime :', value : `${duration}`, inline : true},
                { name : ':fire: • Processeur :', value : `\`\`\`${os.cpus().map(i => `${i.model}`)[0]}\`\`\``},
                { name : ':fire: • Utilisation CPU :', value : `\`${percent.toFixed(2)}%\``, inline : true},
                { name : ':gear: • Architecture :', value : `\`${os.arch()}\``, inline : true},
                { name : ':desktop: • OS :', value : `\`${os.platform()}\``, inline : true},
            ])
            .setFooter({
                text: `• Système de ${Client.user.username}`,
                iconURL: Client.user.displayAvatarURL(),
              })
            .setTimestamp()
        interaction.followUp({ embeds: [os_embed] })
    })
}}
