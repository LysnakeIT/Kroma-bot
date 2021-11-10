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

      const collector = m.createMessageComponentCollector({ filter: i => i.user.id == message.author.id, time: 60000 })

      collector.on('collect', async menu => {
        menu.channel.bulkDelete(1)
        if (menu.values[0] == "cg") {
          return menu.channel.send("https://cdn.discordapp.com/attachments/764412536685723648/862770442778443806/Image1.png")
        } else if (menu.values[0] == "cpu") {
          return menu.channel.send("https://cdn.discordapp.com/attachments/764411711801131049/775822644858716160/Capture.png")
        } else if (menu.values[0] == "browser") {
          return menu.channel.send("https://cdn.discordapp.com/attachments/549725542895845380/770316564012335164/Sans_titre.png")
        } else if (menu.values[0] == "config") {
          return menu.channel.send("__**MERCI DE COPIER CE FORMULAIRE, PUIS DE LE REMPLIR, ET DE LE COLLER DANS LE CHANNEL**__\n\n**x Budget :** (A fixer dès le départ) €\n**x Quand voulez-vous acheter :**\n**x Utilisation :** (Gaming/Montage/Stream/Applicatif...)\n**x Critères esthétiques :** (RGB/Fenêtre/Couleur/Taille de boitier etc)\n**x Montage par TopAchat :** (Oui/non)\n**x Moyen de connexion à Internet :** Wifi ou Ethernet ?\n**x Périphériques supplémentaires :** (Écran, clavier...)\n**x Composants déjà en votre possession :**\n**x Jeux joués :**\n**x Logiciels utilisés :**")
        } else if (menu.values[0] == "ddu") {
          return menu.channel.send("https://youtu.be/fu9-QfRmWjQ")
        } else if (menu.values[0] == "diag") {
          let embedDiag = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setTitle('Diagnostic de PC')
            .setURL("https://userdiag.com")
            .setImage("https://cdn.discordapp.com/attachments/549725542895845380/868182042792321024/udiag.png")
            .setDescription("**Ce logiciel a été développé par une autre personne.**\n\n Télécharger le logiciel [ici](https://userdiag.com/download). Ensuite lancer le logiciel. Une fois lancée vous devriez obtenir le même résultat que l'image en dessous.\nFermer le plus de logiciel en arrière plan (discord, chrome, etc).\n\n Cliquez sur **Diagnostic rapide**. À la manière d'UserBenchmark, plusieurs types de tests s'effectueront (des logiciels vont s'ouvrir, **TOUCHEZ À RIEN**) rapidement en 2-3min.\n\nÀ la fin, une page web contenant votre diagnostic va s'ouvrir.\nVous pourrez ainsi mettre le lien dans ce salon afin que l'on puisse vérifier qu'il n'y a pas d'erreur affichée, et que toutes les informations sont cohérentes.")
            .setThumbnail("https://cdn.discordapp.com/attachments/549725542895845380/868183645633015858/logo-10.png")
          return menu.channel.send({ embeds : [embedDiag] })
        } else if (menu.values[0] == "doc") {
          let embedDoc = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setTitle('Boîtiers / Refroidissements / Ecrans')
            .setURL("https://docs.google.com/spreadsheets/d/e/2PACX-1vSA8AE88v4BP-43UjynJLTDAsNA9r50pZkHCsX2jT4x59AssLweT09s6DoIG9vEAgnE25mn3t3tWZ20/pubhtml")
            .setImage("https://cdn.discordapp.com/attachments/865675399537885244/868164446185459752/ChaiseMaSoumise.jpg")
            .setDescription("Document regoupant des boîtiers de PC, des refroidissements (ventirad / watercooling), des écrans que nous conseillons pour leur qualité.")
          return menu.channel.send({ embeds : [embedDoc] })
        } else if (menu.values[0] == "formatage") {
          let embed = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setTitle('Comment installer/formater Windows 10 avec une clé USB')
            .addFields(
              { name: 'MediaCreationTool (Windows)', value: '[Accéder au tutoriel](https://youtu.be/uHOP4UbEGug) **/** [Télécharger le logiciel](https://go.microsoft.com/fwlink/?LinkId=691209)' },
              { name: 'Rufus (Conseillé par Lysnake)', value: '[Accéder au tutoriel](https://youtu.be/pwaPfVpUYFk) **/** [Télécharger le logiciel](https://rufus.ie/fr/)' }
            )
          return menu.channel.send({ embeds : [embed] })
        } else if (menu.values[0] == "valorant") {
          let img = [
            "https://media.discordapp.net/attachments/549725542895845380/891098530037506058/valo2.png",
            "https://media.discordapp.net/attachments/549725542895845380/891098537297850368/valo1.png"
          ];

          function sendImageValo() {
            let embeds = [];
            embeds.push(new Discord.MessageEmbed()
              .setColor("#2F3136")
              .setTitle('Etape 1 - Changer la résolution et FPS')
              .setImage(img[0]))
            embeds.push(new Discord.MessageEmbed()
              .setColor("#2F3136")
              .setTitle('Etape 2 - Graphismes')
              .setImage(img[1]))
            for (let i = 0; i < 2; i++) {
              let embedNvidia = new Discord.MessageEmbed()
              embedNvidia = embeds[i]
              menu.channel.send({ embeds : [embedNvidia] })
            }
            return;
          }
          sendImageValo()
        } else if (menu.values[0] == "nvidia") {
          let img = [
            "https://media.discordapp.net/attachments/777115913031647232/795699170618638357/1.png",
            "https://media.discordapp.net/attachments/777115913031647232/795699172518395924/2.png",
            "https://media.discordapp.net/attachments/777115913031647232/795699188813004830/3.png",
            "https://media.discordapp.net/attachments/777115913031647232/795699204819255376/4.PNG",
            "https://media.discordapp.net/attachments/777115913031647232/795699217834049587/5.PNG"
          ];

          function sendImage() {
            let embeds = [];
            embeds.push(new Discord.MessageEmbed()
              .setColor("#2F3136")
              .setTitle('Etape 1 - Changer la résolution')
              .setImage(img[0]))
            embeds.push(new Discord.MessageEmbed()
              .setColor("#2F3136")
              .setTitle('Etape 2 - Régler la taille et la position du bureau')
              .setImage(img[1]))
            embeds.push(new Discord.MessageEmbed()
              .setColor("#2F3136")
              .setTitle('Etape 3 - Régler les paramètres d\'image avec Aperçu')
              .setImage(img[2]))
            embeds.push(new Discord.MessageEmbed()
              .setColor("#2F3136")
              .setTitle('Etape 4 - Gérer les paramètres 3D Part.1')
              .setImage(img[3]))
            embeds.push(new Discord.MessageEmbed()
              .setColor("#2F3136")
              .setTitle('Etape 4 - Gérer les paramètres 3D Part.2')
              .setImage(img[4]))
            for (let i = 0; i < 5; i++) {
              let embedNvidia = new Discord.MessageEmbed()
              embedNvidia = embeds[i]
              menu.channel.send({ embeds : [embedNvidia] })
            }
            return;
          }
          sendImage()
        } else if (menu.values[0] == "obs") {
          let embedObs = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setTitle('STREAM / RECORD AVEC OBS')
            .setImage("https://cdn.discordapp.com/attachments/865675399537885244/866240066379448340/unknown.png")
            .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Open_Broadcaster_Software_Logo.png/1024px-Open_Broadcaster_Software_Logo.png")
            .addFields(
              { name: 'Vidéo (vulgarisation) de Lysnake', value: "[Accéder au tutoriel](https://youtu.be/7m7ci0x_l38) **/** [Documentation](https://docs.google.com/document/d/1Yma9wSPAD_wiTbQuxdhTocExmvbu_IuTz170yEVaPNY/edit?usp=sharing) **/** [Télécharger le logiciel](https://obsproject.com/fr/download)" },
              { name: 'Vidéo de Capet', value: "[Accéder au tutoriel](https://youtu.be/7m7ci0x_l38) **/** [Documentation](https://docs.google.com/document/d/1Yma9wSPAD_wiTbQuxdhTocExmvbu_IuTz170yEVaPNY/edit?usp=sharing) **/** [Télécharger le logiciel](https://obsproject.com/fr/download)" }
            )
          menu.channel.send({ embeds : [embedObs] })
        } else if (menu.values[0] == "opti") {
          let embedOpti = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setTitle('Optimisation saine de Windows')
            .addField('Guide & Vidéo', '[Accéder au guide](https://lysnakeit.github.io/Guide) **/** [Accéder au tutoriel](https://youtu.be/4EivQuzGXF4)')
          return menu.channel.send({ embeds : [embedOpti] })
        } else if (menu.values[0] == "revo") {
          return menu.channel.send("https://youtu.be/wlDzAQSs-tQ")
        }
      })
    } else {
      message.channel.send(":x: \ Mauvais salon")
    }
  }
}