const warns = require('../../warns.json')
const fs = require('fs');

module.exports = {
  name: 'seewarns',
  run: async (client, message, args) => {
    if (message.channel.type === "dm") return;
    if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.channel.send("**:x: | Vous n'avez pas la permission**").catch(console.error);
    const mentioned = message.mentions.users.first();
    const args1 = message.content.split(' ').slice(1);
    if (message.member.hasPermission('MANAGE_GUILD')) {
      if (message.mentions.users.size !== 0) {
        if (args1[0] === "<@!" + mentioned.id + ">" || args1[0] === "<@" + mentioned.id + ">") {
          try {
            if (warns[message.guild.id][mentioned.id] === undefined || Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
              message.channel.send("**" + mentioned.tag + "** n'a aucun warn :eyes:");
              return;
            }
          } catch (err) {
            message.channel.send("**" + mentioned.tag + "** n'a aucun warn :eyes:");
            return;
          }
          let arr = [];
          arr.push(`**${mentioned.tag}** a **` + Object.keys(warns[message.guild.id][mentioned.id]).length + "** warns :eyes:");
          for (var warn in warns[message.guild.id][mentioned.id]) {
            arr.push(`**${warn}** - **"` + warns[message.guild.id][mentioned.id][warn].raison +
              "**\" warn donné par **" + message.guild.members.cache.find(member => member.id === (warns[message.guild.id][mentioned.id][warn].user)).user.tag + "** le **" + warns[message.guild.id][mentioned.id][warn].time + "**");
          }
          message.channel.send(arr.join('\n'));
        } else {
          message.channel.send(":x: | **Erreur mauvais usage:** `/seewarns <user>`");
          console.log(args1);
        }
      } else {
        message.channel.send(":x: | **Erreur mauvais usage:** `/seewarns <user>`");
      }
    } else {
      message.channel.send("**:x: | Vous n'avez pas la permission**");
    }
  }
}