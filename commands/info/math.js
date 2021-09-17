const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const math = require('mathjs');

module.exports = {
    name: "math",
    category: "info",
    description: "Retourne le résultat d'une opération",
    run: async (Client, message, args) => {
        let button = new Array([], [], [], [], []);
        let row = [];
        let text = ["Clear", "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", ".", "0", "00", "="];
        let current = 0;

        for (let i = 0; i < text.length; i++) {
            if (button[current].length === 4) current++;
            button[current].push(createButton(text[i]));
            if (i === text.length - 1) {
                for (let btn of button) row.push(addRow(btn));
            }
        }

        const emb = new Discord.MessageEmbed()
            .setColor("#00FF04")
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription("```0```")

        message.channel.send({
            embeds: [emb],
            components: row
        }).then((msg) => {

            let isWrong = false;
            let time = 180000
            let value = ""

            let emb1 = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor("#00FF04")

            function createCollector(val, result = false) {

                const filter = (button) => button.user.id === message.author.id && button.customId === 'cal' + val
                let collect = msg.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: time });

                collect.on("collect", async x => {
                    if (x.user.id !== message.author.id) return;

                    x.deferUpdate();

                    if (result === "new") value = "0"
                    else if (isWrong) {
                        value = val
                        isWrong = false;
                    } else if (value === "0") value = val;
                    else if (result) {
                        isWrong = true;
                        value = mathEval(value);
                    }
                    else value += val
                    if (value.includes("Clear")) return value = "0"
                    emb1.setDescription("```" + value + "```")

                    msg.edit({
                        embeds: [emb1],
                        components: row
                    })
                })
            }

            for (let txt of text) {
                let result;
                if (txt === "Clear") result = "new";
                else if (txt === "=") result = true;
                else result = false
                createCollector(txt, result)
            }
            setTimeout(() => {
                emb1.setDescription("Temps de calcul écoulé")
                emb1.setColor("#00FF04")
                msg.edit({ emb1 })
            }, time)

        })

        function addRow(btns) {
            let row1 = new MessageActionRow()
            for (let btn of btns) {
                row1.addComponents(btn)
            } return row1;
        }

        function createButton(label, style = "SECONDARY") {
            if (label === "Clear") style = "DANGER"
            else if (label === ".") style = "SECONDARY"
            else if (label === "=") style = "SUCCESS"
            else if (isNaN(label)) style = "PRIMARY"

            const btn = new MessageButton()
                .setLabel(label)
                .setStyle(style)
                .setCustomId("cal" + label)
            return btn;
        }

        function mathEval(input) {
            try {
                let res = `${input} = ${math.evaluate(input)}`
                return res
            } catch {
                return "Wrong Input"
            }
        }
    }
}