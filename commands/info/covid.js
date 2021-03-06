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
        if (data.cases === undefined && data.deaths === undefined && data.recovered === undefined && data.active === undefined) {
            message.channel.send("**:x: | Pays introuvable ! (Mettre les pays en anglais)**")
            return;
        } else if (countrycovid.length === 0) {
            message.channel.send("**:x: | Pays introuvable ! (Mettre les pays en anglais)**")
            return;
        } else {
            const embed = new Discord.MessageEmbed()

                .setTitle(`Informations sur la Covid-19 en ${countrycovid[1]}`)
                .setColor("00FF04")
                .setThumbnail("https://cdn.pixabay.com/photo/2020/02/17/07/19/covid-19-4855688_640.png")
                .addField('\n:thermometer_face: **Total Confirmé**', data.cases, true)
                .addField(':skull: **Total décès**', data.deaths, true)
                .addField(':white_check_mark: **Total guérison**', data.recovered, true)
                .addField(':clock2: **Cas actifs**', data.active, true)
                .setTimestamp()

            message.channel.send(embed);
        }
    }
}