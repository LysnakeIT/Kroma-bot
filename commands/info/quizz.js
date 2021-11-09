const Discord = require('discord.js');
const Client = new Discord.Client();
const { questions } = require('../../config/bot');
module.exports = {
    name: "quizz",
    category: "info",
    description: "Retourne la latence de l'API",
    run: async (Client, message, args) => {
        var erreur = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setTitle("<a:non:802645550435532810> Mauvais salon !")
        if (message.channel.name === (process.env.channelGames)) {
            message.delete();
            let q = questions[Math.floor(Math.random() * questions.length)];
            let i = 0;
            const Embed = new Discord.MessageEmbed()
                .setTitle(q.title)
                .setDescription(
                    q.options.map((opt) => {
                        i++;
                        return `${i} - ${opt}\n`;
                    })
                )
                .setColor(`00FF04`)
                .setThumbnail("https://img.static-rmg.be/a/view/q100/w900/h600/2447731/gettyimages-943481846-jpg.jpg")
                .setFooter(`Répondez à ce message avec le bon numéro de question! Vous avez 15 secondes.`);
            message.channel.send(Embed);
            try {
                let msgs = await message.channel.awaitMessages(
                    (u2) => u2.author.id === message.author.id,
                    { time: 15000, max: 1, errors: ["time"] }
                );
                if (parseInt(msgs.first().content) == q.correct) {
                    erreur.setTitle("<a:oui:802645523931856907>")
                    return message.channel.send(erreur);
                } else {
                    erreur.setTitle("<a:non:802645550435532810>")
                    return message.channel.send(erreur);
                }
            } catch (e) {
                erreur.setTitle("<:warning:869206692091531305> Vous n'avez pas répondu à la question")
                return message.channel.send(erreur);
            }
        } else {
            message.channel.send(erreur)
        }
    }
}