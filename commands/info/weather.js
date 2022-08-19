const Discord = require("discord.js");
const weather = require('weather-js')
module.exports = {
    name: "weather",
    category: "info",
    description: "Retourne la météo dans une ville donnée",
    run: (Client, message, args) => {

        weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {
            if (!result || result.length === 0) {
                var erreur = new Discord.EmbedBuilder()
                    .setColor("#2F3136")
                    .setTitle("<a:non:802645550435532810> Emplacement introuvable !")
                message.reply({ embeds : [erreur] })
                return;
            }

            var current = result[0].current;
            var location = result[0].location;
            if (err) message.channel.send(err);
            let embed = new Discord.EmbedBuilder()
                .setDescription(`**${current.skytext}**`)
                .setAuthor({ name: `Météo pour ${current.observationpoint} :`})
                .setThumbnail(current.imageUrl)
                .setColor("00FF04")
                .addFields([
                    { name : '**🕑 Fuseau horaire ❯**', value : `UTC${location.timezone}`, inline : true},
                    { name : `**💥 Type de degré ❯**`, value : "°" + location.degreetype, inline : true},
                    { name : `**🌡️ Temperature ❯**`, value : `${current.temperature} Degrés`, inline : true},
                    { name : `**🤒 Ressenti ❯**`, value : `${current.feelslike} Degrés`, inline : true},
                    { name : `**💨 Vents ❯**`, value : current.winddisplay, inline : true},
                    { name : `**💦 Humidité ❯**`, value : `${current.humidity}%`, inline : true},
                ])
            message.reply({ embeds : [embed] })
        });
    }
}