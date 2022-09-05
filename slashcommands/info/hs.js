const { ActionRowBuilder, SelectMenuBuilder, MessageCollector } = require('discord.js');
const Discord = require("discord.js");

module.exports = {
    name: "hs",
    description: "Retourne un menu d'options hardware / softwar",
    permissions: [""],

    run: async (client, interaction, args) => {
        if (interaction.channel.id === process.env.idHS) {
            const row = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('select')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder('Veuillez choisir une option')
                        .addOptions([
                            {
                                label: 'Carte graphique',
                                description: 'Classement de GPU en fonction de leur puissance',
                                emoji: "865675315753648138",
                                value: 'cg',
                            },
                            {
                                label: 'Proccesseur (CPU)',
                                description: 'Classement de CPU par rapport à leur puissance',
                                value: 'cpu',
                                emoji: "865676862566039572",
                            },
                            {
                                label: 'Navigateur web',
                                description: 'Récapitulatif à propos des navigateurs web',
                                value: 'browser',
                                emoji: "865677012944289802"
                            },
                            {
                                label: 'Config',
                                description: 'Affiche le formulaire pour les configurations',
                                value: 'config',
                                emoji: "865696937238724678"
                            },
                            {
                                label: 'Display Driver Uninstall',
                                description: 'Explique comment supprimer son driver graphique',
                                value: 'ddu',
                                emoji: "865697272029380628"
                            },
                            {
                                label: 'Diagnostic PC',
                                description: 'Explique comment faire un diagnostic de votre pc',
                                value: 'diag',
                                emoji: "865697906861670410"
                            },
                            {
                                label: 'Formatage Windows',
                                description: 'Explique les étapes de comment formater son PC',
                                value: 'formatage',
                                emoji: "865698424639848479"
                            },
                            {
                                label: 'Valorant',
                                description: 'Explique comment optimiser votre jeu"',
                                value: 'valorant',
                                emoji: "865699104206487552"
                            },
                            {
                                label: 'Panneau NVIDIA',
                                description: 'Optimisation du panneau de configuration Nvidia',
                                value: 'nvidia',
                                emoji: "865996905007153193"
                            },
                            {
                                label: 'Configuration OBS',
                                description: 'Video expliquant comment stream/record avec obs',
                                value: 'obs',
                                emoji: "865997325830586399"
                            },
                            {
                                label: 'Optimisation PC',
                                description: 'Explique comment optimiser votre PC de A à Z',
                                value: 'opti',
                                emoji: "865997889183809577"
                            },
                            {
                                label: 'Revo Uninstaller',
                                description: 'Logiciel de suppression (propre) de software',
                                value: 'revo',
                                emoji: "865999015521943572"
                            },
                        ]),
                );
            await message.channel.bulkDelete(1)
            const m = await message.channel.send({ content: "Voici le menu regroupant les commandes hardware/software", components: [row] });

            const collector = m.createMessageComponentCollector({ filter: i => i.user.id == message.author.id, time: 60000 })

            collector.on('collect', async menu => {
                menu.channel.bulkDelete(1)
                if (menu.values[0] == "cg") {
                    return menu.channel.send("")
                } else if (menu.values[0] == "cpu") {
                    return menu.channel.send("")
                } else if (menu.values[0] == "browser") {
                    return menu.channel.send("")
                } else if (menu.values[0] == "config") {
                    return menu.channel.send("")
                } else if (menu.values[0] == "ddu") {
                    return menu.channel.send("")
                } else if (menu.values[0] == "diag") {
                    let embedDiag = new Discord.EmbedBuilder()
                        .setColor("#2F3136")
                        .setTitle('Diagnostic de PC')
                        .setURL("")
                        .setImage("")
                        .setDescription("")
                        .setThumbnail("")
                    return menu.channel.send({ embeds: [embedDiag] })
                } else if (menu.values[0] == "doc") {
                    let embedDoc = new Discord.EmbedBuilder()
                        .setColor("#2F3136")
                        .setTitle('Boîtiers / Refroidissements / Ecrans')
                        .setURL("")
                        .setImage("")
                        .setDescription("")
                    return menu.channel.send({ embeds: [embedDoc] })
                } else if (menu.values[0] == "formatage") {
                    let embed = new Discord.EmbedBuilder()
                        .setColor("#2F3136")
                        .setTitle('Comment installer/formater Windows 10 avec une clé USB')
                        .addFields(
                            { name: 'MediaCreationTool (Windows)', value: '' },
                            { name: 'Rufus', value: '' }
                        )
                    return menu.channel.send({ embeds: [embed] })
                } else if (menu.values[0] == "valorant") {
                    let img = [
                        "",
                        ""
                    ];

                    function sendImageValo() {
                        let embeds = [];
                        embeds.push(new Discord.EmbedBuilder()
                            .setColor("#2F3136")
                            .setTitle('Etape 1 - Changer la résolution et FPS')
                            .setImage(img[0]))
                        embeds.push(new Discord.EmbedBuilder()
                            .setColor("#2F3136")
                            .setTitle('Etape 2 - Graphismes')
                            .setImage(img[1]))
                        for (let i = 0; i < 2; i++) {
                            let embedNvidia = new Discord.EmbedBuilder()
                            embedNvidia = embeds[i]
                            menu.channel.send({ embeds: [embedNvidia] })
                        }
                        return;
                    }
                    sendImageValo()
                } else if (menu.values[0] == "nvidia") {
                    let img = [
                        "",
                        "",
                        "",
                        "",
                        "",
                    ];

                    function sendImage() {
                        let embeds = [];
                        embeds.push(new Discord.EmbedBuilder()
                            .setColor("#2F3136")
                            .setTitle('')
                            .setImage(img[0]))
                        embeds.push(new Discord.EmbedBuilder()
                            .setColor("#2F3136")
                            .setTitle('')
                            .setImage(img[1]))
                        embeds.push(new Discord.EmbedBuilder()
                            .setColor("#2F3136")
                            .setTitle('')
                            .setImage(img[2]))
                        embeds.push(new Discord.EmbedBuilder()
                            .setColor("#2F3136")
                            .setTitle('')
                            .setImage(img[3]))
                        embeds.push(new Discord.EmbedBuilder()
                            .setColor("#2F3136")
                            .setTitle('')
                            .setImage(img[4]))
                        for (let i = 0; i < 5; i++) {
                            let embedNvidia = new Discord.EmbedBuilder()
                            embedNvidia = embeds[i]
                            menu.channel.send({ embeds: [embedNvidia] })
                        }
                        return;
                    }
                    sendImage()
                } else if (menu.values[0] == "obs") {
                    let embedObs = new Discord.EmbedBuilder()
                        .setColor("#2F3136")
                        .setTitle('STREAM / RECORD AVEC OBS')
                        .setImage("")
                        .setThumbnail("")
                        .addFields(
                            { name: '', value: "" },
                            { name: '', value: "" }
                        )
                    menu.channel.send({ embeds: [embedObs] })
                } else if (menu.values[0] == "opti") {
                    let embedOpti = new Discord.EmbedBuilder()
                        .setColor("#2F3136")
                        .setTitle('')
                        .addField('', '')
                    return menu.channel.send({ embeds: [embedOpti] })
                } else if (menu.values[0] == "revo") {
                    return menu.channel.send("")
                }
            })
        } else {
            interaction.channel.send(":x: \ Mauvais salon")
            await interaction.deleteReply();
        }
    },
};
