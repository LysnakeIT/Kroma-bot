const warns = require('../../warns.json')
const fs = require('fs');

module.exports = {
  name: 'warns',
  run: async (client, message, args) => {
    if (message.channel.type === "dm") return;
    var mentionned = message.mentions.users.first();
    if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.channel.send("**:x: | Vous n'avez pas la permission**").catch(console.error);
    if (message.mentions.users.size === 0) {
      return message.channel.send("**:x: \ Vous devez mentionner un utilisateur**");
    } else {
      const args1 = message.content.split(' ').slice(1);
      const mentioned = message.mentions.users.first();
      if (message.member.hasPermission('MANAGE_GUILD')) {
        if (message.mentions.users.size != 0) {
          if (args1[0] === "<@!" + mentioned.id + ">" || args1[0] === "<@" + mentioned.id + ">") {
            if (args1.slice(1).length != 0) {
              const date = new Date().toUTCString();
              if (warns[message.guild.id] === undefined)
                warns[message.guild.id] = {};
              if (warns[message.guild.id][mentioned.id] === undefined)
                warns[message.guild.id][mentioned.id] = {};
              const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
              if (warns[message.guild.id][mentioned.id][warnumber] === undefined) {
                warns[message.guild.id][mentioned.id]["1"] = { "raison": args1.slice(1).join(' '), time: date, user: message.author.id };
              } else {
                warns[message.guild.id][mentioned.id][warnumber + 1] = {
                  "raison": args1.slice(1).join(' '),
                  time: date,
                  user: message.author.id
                };
              }
              fs.writeFile("./warns.json", JSON.stringify(warns), (err) => { if (err) console.error(err); });
              message.delete();
              message.channel.send(':warning: | **' + mentionned.tag + ' à été averti**');
              message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.tag}**\n\n**Raison:** ` + args.slice(1).join(' '))
            } else {
              message.channel.send(":x: | **Erreur mauvais usage:** `/warn <user> <reason>`");
            }
          } else {
            message.channel.send(":x: | **Erreur mauvais usage:** `/warn <user> <reason>`");
          }
        } else {
          message.channel.send(":x: | **Erreur mauvais usage:** `/warn <user> <reason>`");
        }
      } else {
        message.channel.send("**:x: | Vous n'avez pas la permission**");
      }
    }
  }
}