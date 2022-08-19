const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { questions } = require('../../config/bot');
const { ButtonStyle } = require('discord.js');

module.exports = {
    name: "quizz",
    category: "info",
    description: "Quizz portant sur l'informatique",

    run: async (Client, message, args) => {
        const erreur = new Discord.EmbedBuilder()
            .setColor("#2F3136")
            .setTitle("<a:non:802645550435532810> Mauvais salon !")
        if (message.channel.name === (process.env.channelGames)) {
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
            var Embed = new Discord.EmbedBuilder()
                .setTitle(q.title)
                .setDescription(`${newret}`)
                .setColor(`00FF04`)
                .setThumbnail("https://img.static-rmg.be/a/view/q100/w900/h600/2447731/gettyimages-943481846-jpg.jpg")

            // Ajout des boutons d'options
            const row = new ActionRowBuilder()
            if (q.options.length == 4) {
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId('1')
                        .setLabel('1')
                        .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                        .setCustomId('2')
                        .setLabel('2')
                        .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                        .setCustomId('3')
                        .setLabel('3')
                        .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                        .setCustomId('4')
                        .setLabel('4')
                        .setStyle(ButtonStyle.Primary),
                );
            } else if (q.options.length == 3) {
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId('1')
                        .setLabel('1')
                        .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                        .setCustomId('2')
                        .setLabel('2')
                        .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                        .setCustomId('3')
                        .setLabel('3')
                        .setStyle(ButtonStyle.Primary),
                );
            } else if (q.options.length == 2) {
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId('1')
                        .setLabel('1')
                        .setStyle(ButtonStyle.Primary),

                    new ButtonBuilder()
                        .setCustomId('2')
                        .setLabel('2')
                        .setStyle(ButtonStyle.Primary),
                );
            }
            const m = await message.reply({ embeds: [Embed], ephemeral: true, components: [row] });
            try {
                const iFiltre = (u2) => u2.user.id === message.author.id
                let rep = true;
                const collector = m.createMessageComponentCollector({ filter: iFiltre, time: 15000, max: 1, errors: ["time"], rep: true })
                collector.on('collect', async i => {
                    // En fonction de la réponse vérifie si c'est la bonne réponse et renvoie une image validant ou refusant notre réponse.
                    Embed = new Discord.EmbedBuilder()
                    if (i.customId === '1') {
                        if (1 === q.correct) {
                            Embed.setImage('https://c.tenor.com/Hw7f-4l0zgEAAAAM/check-green.gif').setColor(`00FF04`);
                            rep = false;
                            return m.edit({ embeds: [Embed], components: [] });
                        } else {
                            Embed.setColor(`00FF04`).setImage('https://static.vecteezy.com/system/resources/previews/001/200/274/non_2x/check-png.png')
                            rep = false;
                            return m.edit({ embeds: [Embed], components: [] });
                        }
                    } else if (i.customId === '2') {
                        if (2 === q.correct) {
                            Embed.setImage('https://c.tenor.com/Hw7f-4l0zgEAAAAM/check-green.gif').setColor(`00FF04`);
                            rep = false;
                            return m.edit({ embeds: [Embed], components: [] });
                        } else {
                            Embed.setColor(`00FF04`).setImage('https://static.vecteezy.com/system/resources/previews/001/200/274/non_2x/check-png.png')
                            rep = false;
                            return m.edit({ embeds: [Embed], components: [] });
                        }
                    } else if (i.customId === '3') {
                        if (3 === q.correct) {
                            Embed.setImage('https://c.tenor.com/Hw7f-4l0zgEAAAAM/check-green.gif').setColor(`00FF04`);
                            rep = false;
                            return m.edit({ embeds: [Embed], components: [] });
                        } else {
                            Embed.setColor(`00FF04`).setImage('https://static.vecteezy.com/system/resources/previews/001/200/274/non_2x/check-png.png')
                            rep = false;
                            return m.edit({ embeds: [Embed], components: [] });
                        }
                    } else if (i.customId === '4') {
                        if (4 === q.correct) {
                            Embed.setImage('https://c.tenor.com/Hw7f-4l0zgEAAAAM/check-green.gif').setColor(`00FF04`);
                            rep = false;
                            return m.edit({ embeds: [Embed], components: [] });
                        } else {
                            Embed.setColor(`00FF04`).setImage('https://static.vecteezy.com/system/resources/previews/001/200/274/non_2x/check-png.png')
                            rep = false;
                            return m.edit({ embeds: [Embed], components: [] });
                        }
                    }
                })
                setTimeout(() => {
                    if (rep) {
                        collector.stop()
                        erreur.setTitle("<:warning:869206692091531305> Vous n'avez pas répondu à la question !!")
                        return m.edit({ embeds: [erreur], components: [] });
                    }
                }, 14500)
            } catch (e) {
                return;
            }

        } else {
            return message.reply({ embeds: [erreur] })
        }
    }
}