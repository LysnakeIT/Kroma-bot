const Discord = require('discord.js');
const disbut = require("discord-buttons");
const { MessageMenuOption, MessageMenu } = require("discord-buttons")

module.exports = {
  name: "hs",
  category: "info",
  description: "Retourne un menu d'options hardware / software",
  run: async (client, message, args) => {
    if (message.channel.id === process.env.idHS) {
      let option1 = new MessageMenuOption()
        .setLabel("Carte graphique")
        .setValue("cg")
        .setDescription("Classement de GPU en fonction de leur puissance")
        .setDefault()
        .setEmoji("865675315753648138")

      let option2 = new MessageMenuOption()
        .setLabel("Proccesseur (CPU)")
        .setValue("cpu")
        .setDescription("Classement de CPU par rapport à leur puissance")
        .setDefault()
        .setEmoji("865676862566039572")

      let option3 = new MessageMenuOption()
        .setLabel("Navigateur web")
        .setValue("browser")
        .setDescription("Récapitulatif à propos des navigateurs web")
        .setDefault()
        .setEmoji("865677012944289802")

      let option4 = new MessageMenuOption()
        .setLabel("Clean Install")
        .setValue("cleanInstall")
        .setDescription("Explication de pourquoi il faut formater")
        .setDefault()
        .setEmoji("865696300402212935")

      let option5 = new MessageMenuOption()
        .setLabel("Config")
        .setValue("config")
        .setDescription("Affiche le formulaire pour les configurations")
        .setDefault()
        .setEmoji("865696937238724678")

      let option6 = new MessageMenuOption()
        .setLabel("Display Driver Uninstall")
        .setValue("ddu")
        .setDescription("Explique comment supprimer son driver graphique")
        .setDefault()
        .setEmoji("865697272029380628")

      let option7 = new MessageMenuOption()
        .setLabel("Diagnostic PC")
        .setValue("diag")
        .setDescription("Explique comment faire un diagnostic de votre pc")
        .setDefault()
        .setEmoji("865697906861670410")

      let option8 = new MessageMenuOption()
        .setLabel("Conseils achat")
        .setValue("doc")
        .setDescription("Document conseillant certains achats qualitatifs")
        .setDefault()
        .setEmoji("865698853994233916")

      let option9 = new MessageMenuOption()
        .setLabel("Formatage Windows")
        .setValue("formatage")
        .setDescription("Explique les étapes de comment formater son PC")
        .setDefault()
        .setEmoji("865698424639848479")

      let option10 = new MessageMenuOption()
        .setLabel("Valorant")
        .setValue("valorant")
        .setDescription("Explique comment optimiser votre jeu")
        .setDefault()
        .setEmoji("865699104206487552")

      let option11 = new MessageMenuOption()
        .setLabel("Panneau NVIDIA")
        .setValue("nvidia")
        .setDescription("Optimisation du panneau de configuration Nvidia")
        .setDefault()
        .setEmoji("865996905007153193")

      let option12 = new MessageMenuOption()
        .setLabel("Configuration OBS")
        .setValue("obs")
        .setDescription("Video expliquant comment stream/record avec obs")
        .setDefault()
        .setEmoji("865997325830586399")

      let option13 = new MessageMenuOption()
        .setLabel("Optimisation PC")
        .setValue("opti")
        .setDescription("Explique comment optimiser votre PC de A à Z")
        .setDefault()
        .setEmoji("865997889183809577")

      let option14 = new MessageMenuOption()
        .setLabel("Revo Uninstaller")
        .setValue("revo")
        .setDescription("Logiciel de suppression (propre) de software")
        .setDefault()
        .setEmoji("865999015521943572")

      let selection = new MessageMenu()
        .setID("Selection")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder("Veuillez choisir une option")
        .addOption(option1)
        .addOption(option2)
        .addOption(option3)
        .addOption(option4)
        .addOption(option5)
        .addOption(option6)
        .addOption(option7)
        .addOption(option8)
        .addOption(option9)
        .addOption(option10)
        .addOption(option11)
        .addOption(option12)
        .addOption(option13)
        .addOption(option14)

      const row = new disbut.MessageActionRow()
        .addComponent(selection)

      await message.channel.bulkDelete(1)
      await message.channel.send("Voici le menu regroupant les commandes hardware/software", { components: [row] })

    } else {
      message.channel.send(":x: \ Mauvais salon")
    }
  }
}