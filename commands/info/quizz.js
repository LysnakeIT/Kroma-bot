const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
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
            let ret = (q.options.map((opt) => {
                i++;
                return `${i} - ${opt}\n`;
            }))
            var newret = ""
            for (let j = 0; j < ret.length; j++) {
                newret = `${newret}` + `${ret[j]}`
            }
            const Embed = new Discord.MessageEmbed()
                .setTitle(q.title)
                .setDescription(`${newret}`)
                .setColor(`00FF04`)
                .setThumbnail("https://img.static-rmg.be/a/view/q100/w900/h600/2447731/gettyimages-943481846-jpg.jpg")
                .setFooter(`Répondez à ce message avec le bon numéro de question! Vous avez 15 secondes.`);

            const row = new MessageActionRow()
            if (q.options.length == 4) {
                row.addComponents(
                    new MessageButton()
                        .setCustomId('1')
                        .setLabel('1')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('2')
                        .setLabel('2')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('3')
                        .setLabel('3')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('4')
                        .setLabel('4')
                        .setStyle('PRIMARY'),
                );
            } else if (q.options.length == 3) {
                row.addComponents(
                    new MessageButton()
                        .setCustomId('1')
                        .setLabel('1')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('2')
                        .setLabel('2')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('3')
                        .setLabel('3')
                        .setStyle('PRIMARY'),
                );
            } else if (q.options.length == 2) {
                row.addComponents(
                    new MessageButton()
                        .setCustomId('1')
                        .setLabel('1')
                        .setStyle('PRIMARY'),

                    new MessageButton()
                        .setCustomId('2')
                        .setLabel('2')
                        .setStyle('PRIMARY'),
                );
            }
            const m = await message.channel.send({ embeds: [Embed], ephemeral: true, components: [row] });
            try {
                    const iFiltre = (u2) => u2.user.id === message.author.id
                    const collector = m.createMessageComponentCollector({ filter: iFiltre, time: 15000, max: 1, errors: ["time"] })
                    collector.on('collect', async i => {
                        if (i.customId === '1') {
                            if (1 === q.correct) {
                                Embed.setTitle("").setDescription('').setImage('https://c.tenor.com/Hw7f-4l0zgEAAAAM/check-green.gif').setColor(`00FF04`).setThumbnail("").setFooter(``);
                                return m.edit({ embeds: [Embed], components: [] });
                            } else {
                                Embed.setTitle("").setColor(`00FF04`).setDescription('').setImage('https://www.bombyxstore.fr/img_per/1039442/mi_ima_04fdca7cd5.gif').setThumbnail("").setFooter(``);
                                return m.edit({ embeds: [Embed], components: [] });
                            }
                        } else if (i.customId === '2') {
                            if (2 === q.correct) {
                                Embed.setTitle("").setDescription('').setImage('https://c.tenor.com/Hw7f-4l0zgEAAAAM/check-green.gif').setColor(`00FF04`).setThumbnail("").setFooter(``);
                                return m.edit({ embeds: [Embed], components: [] });
                            } else {
                                Embed.setTitle("").setColor(`00FF04`).setDescription('').setImage('https://www.bombyxstore.fr/img_per/1039442/mi_ima_04fdca7cd5.gif').setThumbnail("").setFooter(``);
                                return m.edit({ embeds: [Embed], components: [] });
                            }
                        } else if (i.customId === '3') {
                            if (3 === q.correct) {
                                Embed.setTitle("").setDescription('').setImage('https://c.tenor.com/Hw7f-4l0zgEAAAAM/check-green.gif').setColor(`00FF04`).setThumbnail("").setFooter(``);
                                return m.edit({ embeds: [Embed], components: [] });
                            } else {
                                Embed.setTitle("").setColor(`00FF04`).setDescription('').setImage('https://www.bombyxstore.fr/img_per/1039442/mi_ima_04fdca7cd5.gif').setThumbnail("").setFooter(``);
                                return m.edit({ embeds: [Embed], components: [] });
                            }
                        } else if (i.customId === '4') {
                            if (4 === q.correct) {
                                Embed.setTitle("").setDescription('').setImage('https://c.tenor.com/Hw7f-4l0zgEAAAAM/check-green.gif').setColor(`00FF04`).setThumbnail("").setFooter(``);
                                return m.edit({ embeds: [Embed], components: [] });
                            } else {
                                Embed.setTitle("").setColor(`00FF04`).setDescription('').setImage('https://www.bombyxstore.fr/img_per/1039442/mi_ima_04fdca7cd5.gif').setThumbnail("").setFooter(``);
                                return m.edit({ embeds: [Embed], components: [] });
                            }
                        }
                    })
            } catch (e) {
                erreur.setTitle("<:warning:869206692091531305> Vous n'avez pas répondu à la question")
                return message.channel.send({ embeds: [erreur] });
            }
            setTimeout(() => {
                erreur.setTitle("<:warning:869206692091531305> Vous n'avez pas répondu à la question")
                return message.channel.send({ embeds: [erreur] });
            }, 1 * 15000)

        } else {
            message.channel.send({ embeds: [erreur] })
        }
    }
}