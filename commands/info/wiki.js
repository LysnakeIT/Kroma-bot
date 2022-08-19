const Discord = require("discord.js");
const superagent = require('superagent');
const snekfetch = require('snekfetch');
module.exports = {
    name: "wiki",
    category: "info",
    description: "Retourne une page wikipedia d'un sujet donné",
    run: async (Client, message, args) => {
        const query = args.join(' ');
        const { body } = await snekfetch
            .get('https://fr.wikipedia.org/w/api.php')
            .query({
                action: 'query',
                prop: 'extracts',
                format: 'json',
                titles: query,
                exintro: '',
                explaintext: '',
                redirects: '',
                formatversion: 2
            });
        if (query.length === 0) {
            var erreur = new Discord.EmbedBuilder()
                .setColor("#2F3136")
                .setTitle("<:warning:869206692091531305> Vous devez mentionner une information à rechercher !")
            return message.reply({ embeds : [erreur] });
        }
        if (body.query.pages[0].missing) {
            var erreurInfo = new Discord.EmbedBuilder()
                .setColor("#2F3136")
                .setTitle("<a:non:802645550435532810> Pas de résultats, réessayer avec plus d'informations.")
            return message.reply({ embeds : [erreurInfo] });
        }
        const embed = new Discord.EmbedBuilder()
            .setColor("00FF04")
            .setTitle(body.query.pages[0].title)
            .setTimestamp()
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Wikipedia-logo-v2-fr.svg/892px-Wikipedia-logo-v2-fr.svg.png')
            .setDescription(body.query.pages[0].extract.substr(0, 2000).replace(/[\n]/g, '\n\n'))
            .setFooter({
                text: "Developpé par Lysnake",
                iconURL: "https://cdn.discordapp.com/avatars/337210490453229579/85a0a01303bcb266778cb0fab7d5808b.webp?size=256",
            })
        return message.reply({ embeds : [embed] }).catch(console.error);
    }
}