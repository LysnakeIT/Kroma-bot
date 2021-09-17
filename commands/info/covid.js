const Discord = require("discord.js");
const api = require('novelcovid');
module.exports = {
    name: "covid",
    category: "info",
    description: "Retourne les infos sur le Covid dans un pays donné",
    run: async (Client, message, args) => {
        var prefix = "!"
        const countrycovid = message.content.slice(prefix.length).split(' ')
        const data = await api.countries({ country: countrycovid })
        if (data.cases === undefined && data.deaths === undefined && data.recovered === undefined && data.active === undefined || countrycovid.length === 0) {
            var erreur = new Discord.MessageEmbed()
                .setColor("#2F3136")
                .setTitle("<a:non:802645550435532810> Pays introuvable ! (Mettre les pays en anglais)")
            message.channel.send(erreur)
            return;
        } else {
            const embed = new Discord.MessageEmbed()

                .setTitle(`Informations sur la Covid-19 en ${countrycovid[1]}`)
                .setColor("00FF04")
                .setThumbnail("https://cdn.pixabay.com/photo/2020/02/17/07/19/covid-19-4855688_640.png")
                .addField('\n:thermometer_face: **Total Confirmé**', data.cases.toString(), true)
                .addField(':skull: **Total décès**', data.deaths.toString(), true)
                .addField(':white_check_mark: **Total guérison**', data.recovered.toString(), true)
                .addField(':clock2: **Cas actifs**', data.active.toString(), true)
                .setTimestamp()

            message.channel.send({ embeds : [embed] });
        }
    }
}