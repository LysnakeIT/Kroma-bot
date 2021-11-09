const warns = require('../../warns.json')
const fs = require('fs');
module.exports = {
  name: 'delwarns',
  run: async (client, message, args) => {
    if (message.channel.type === "dm") return;
    if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
    const mentioned = message.mentions.users.first();
    const args1 = message.content.split(' ').slice(1);
    const arg2 = Number(args[1]);
    if (message.member.hasPermission('MANAGE_GUILD')) {
      if (message.mentions.users.size != 0) {
        if (args1[0] === "<@!" + mentioned.id + ">" || args1[0] === "<@" + mentioned.id + ">") {
          if (!isNaN(arg2)) {
            if (warns[message.guild.id][mentioned.id] === undefined) {
              message.channel.send(mentioned.tag + " n'a aucun warn");
              return;
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
              message.channel.send("**:x: Ce warn n'existe pas**");
              return;
            }
            delete warns[message.guild.id][mentioned.id][arg2];
            var i = 1;
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function (key) {
              var val = warns[message.guild.id][mentioned.id][key];
              delete warns[message.guild.id][mentioned.id][key];
              key = i;
              warns[message.guild.id][mentioned.id][key] = val;
              i++;
            });
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => { if (err) console.error(err); });
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
              delete warns[message.guild.id][mentioned.id];
            }
            message.channel.send(`Le warn de **${mentioned.tag}**\: **${args1[1]}** a été enlevé avec succès!`);
            return;
          } if (args1[1] === "all") {
            delete warns[message.guild.id][mentioned.id];
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => { if (err) console.error(err); });
            message.channel.send(`Les warns de **${mentioned.tag}** ont été enlevés avec succès!`);
            return;
          } else {
            message.channel.send(":x: | **Erreur mauvais usage:** `/delwarn <user> <numéro du warn>`");
          }
        } else {
          message.channel.send(":x: | **Erreur mauvais usage:** `/delwarn <user> <numéro du warn>`");
        }
      } else {
        message.channel.send(":x: | **Erreur mauvais usage:** `/delwarn <user> <numéro du warn>`");
      }
    } else {
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
    }
  }
}