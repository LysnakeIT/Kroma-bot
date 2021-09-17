const Discord = require("discord.js");
module.exports = {
    name: "giveaway",
    category: "info",
    description: "Return the winner",
    run: async (Client, message, args) => {
        if (!message.guild) return;
        async function giveaway() {
            var time = '';
            var time2 = '';
            var time3 = '';
            if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('**Vous n\'avez pas la permission d\'éxécuter cette commande !**');
            const stated_duration_hours = message.content.split(' ')[1];
            const stated_duration_hours2 = stated_duration_hours
            if (stated_duration_hours2.includes('s')) {
                var time = 's';
            }
            if (stated_duration_hours2.includes('m')) {
                var time = 'm';
            }
            if (stated_duration_hours2.includes('h')) {
                var time = 'h';
            }
            if (stated_duration_hours2.includes('d')) {
                var time = 'd';
            }
            const stated_duration_hours3 = stated_duration_hours2.replace(time, '');
            if (stated_duration_hours3 === '0') {
                message.channel.send('La durée doit être d\'au moins un.');
            }
            if (isNaN(stated_duration_hours3)) {
                message.channel.send('La durée doit être une variable de temps valide.');
            }
            if (stated_duration_hours3 > 1) {
                var time3 = 's';
            }
            if (time === 's') {
                var actual_duration_hours = stated_duration_hours3 * 1000;
                var time2 = 'second';
            }
            if (time === 'm') {
                var actual_duration_hours = stated_duration_hours3 * 60000;
                var time2 = 'minute';
            }
            if (time === 'h') {
                var actual_duration_hours = stated_duration_hours3 * 3600000;
                var time2 = 'hour';
            }
            if (time === 'd') {
                var actual_duration_hours = stated_duration_hours3 * 86400000;
                var time2 = 'day';
            }
            if (!isNaN(stated_duration_hours3)) {
                message.delete()
                const logoprize = message.content.split(' ')[2];;
                if (logoprize === '') return message.channel.send('Vous devez entrer une image (lien internet) du prix');
                const prize = message.content.split(' ').slice(3).join(' ');
                if (prize === '') return message.channel.send('Vous devez entrer un prix');
                if (stated_duration_hours3 !== '0') {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`Nouveau Giveaway - ${prize}`)
                        .setThumbnail(logoprize)
                        .setColor('00FF04')
                        .setDescription(`Réagissez avec 🎉 pour participer\n**Temps restant :** **${stated_duration_hours3}** ${time2}${time3}\n**Hosted by :** ${message.author}`)
                        .setTimestamp(Date.now() + (actual_duration_hours))
                        .setFooter('Terminé à')
                    let msg = await message.channel.send({ content: `@everyone :tada: **GIVEAWAY** :tada:`, embeds : [embed]})
                    await msg.react('🎉')
                    setTimeout(() => {
                        msg.reactions.cache.get('🎉').users.remove(Client.user.id)
                        setTimeout(() => {
                            let winner = msg.reactions.cache.get('🎉').users.cache.random();
                            if (msg.reactions.cache.get('🎉').users.cache.size < 1) {
                                const winner_embed = new Discord.MessageEmbed()
                                    .setTitle(`Résultat Giveaway - ${prize}`)
                                    .setColor('00FF04')
                                    .setThumbnail(logoprize)
                                    .setDescription(`**Winner :** Aucun.\n\n**Hosted by :** ${message.author}`)
                                    .setTimestamp()
                                    .setFooter('Terminé à')
                                msg.edit({ content: `:tada: **GIVEAWAY TERMINE** :tada:`, embeds : [winner_embed]});
                            }
                            if (!msg.reactions.cache.get('🎉').users.cache.size < 1) {
                                const winner_embed = new Discord.MessageEmbed()
                                    .setTitle(`Résultat Giveaway - ${prize}`)
                                    .setColor('00FF04')
                                    .setThumbnail(logoprize)
                                    .setDescription(`**Winner :**${winner}\n\n**Hosted by :** ${message.author}`)
                                    .setTimestamp()
                                    .setFooter('Terminé à')
                                msg.edit({ content: `:tada: **GIVEAWAY TERMINE** :tada:`, embeds : [winner_embed]});
                                message.channel.send(`@everyone :tada: **Le gagnant est :** ${winner} :tada:`)
                            }
                        }, 1000);
                    }, actual_duration_hours);
                }
            }
        }
        giveaway();
    }
}