const Discord = require("discord.js");
const Client = new Discord.Client();
const superagent = require('superagent');
const snekfetch = require('superagent');
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
            var erreur = new Discord.MessageEmbed()
                .setColor("#2F3136")
                .setTitle("<:warning:869206692091531305> Vous devez mentionner une information à rechercher !")
            return message.channel.send(erreur);
        }
        if (body.query.pages[0].missing) {
            var erreurInfo = new Discord.MessageEmbed()
                .setColor("#2F3136")
                .setTitle("<a:non:802645550435532810> Pas de résultats, réessayer avec plus d'informations.")
            return message.channel.send(erreurInfo);
        }
        const embed = new Discord.MessageEmbed()
            .setColor("00FF04")
            .setTitle(body.query.pages[0].title)
            .setFooter('Developpé par Lysnake', 'https://cdn.discordapp.com/avatars/337210490453229579/85a0a01303bcb266778cb0fab7d5808b.webp?size=256')
            .setTimestamp()
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Wikipedia-logo-v2-fr.svg/892px-Wikipedia-logo-v2-fr.svg.png')
            .setDescription(body.query.pages[0].extract.substr(0, 2000).replace(/[\n]/g, '\n\n'));
        console.log(`${message.author.tag} a utilisé la commande /wiki`)
        return message.channel.send(embed).catch(console.error);
    }
}