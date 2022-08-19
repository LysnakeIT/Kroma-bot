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
            var erreur = new Discord.EmbedBuilder()
                .setColor("#2F3136")
                .setTitle("<a:non:802645550435532810> Pays introuvable ! (Mettre les pays en anglais)")
            message.reply({ embeds : [erreur] })
            return;
        } else {
            const embed = new Discord.EmbedBuilder()
                .setTitle(`Informations sur la Covid-19 en ${countrycovid[1]}`)
                .setColor("00FF04")
                .setThumbnail("https://cdn.pixabay.com/photo/2020/02/17/07/19/covid-19-4855688_640.png")
                .addFields([
                    { name : '\n:thermometer_face: **Total Confirmé**', value : data.cases.toString(), inline : true},
                    { name : ':skull: **Total décès**', value : data.deaths.toString(), inline : true},
                    { name : ':white_check_mark: **Total guérison**', value : data.recovered.toString(), inline : true},
                    { name : ':clock2: **Cas actifs**', value : data.active.toString(), inline : true},
                ])
                .setTimestamp()

            message.reply({ embeds : [embed] });
        }
    }
}