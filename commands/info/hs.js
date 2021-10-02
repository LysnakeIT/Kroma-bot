
const { MessageActionRow, MessageSelectMenu, MessageCollector } = require('discord.js');
const Discord = require("discord.js");
module.exports = {
  name: "hs",
  category: "info",
  description: "Retourne un menu d'options hardware / software",
  run: async (client, message, args) => {
    if (message.channel.id === process.env.idHS) {
      const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
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
    } else {
      message.channel.send(":x: \ Mauvais salon")
    }
  }
}
