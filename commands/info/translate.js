const Discord = require("discord.js");
const translate = require("@iamtraction/google-translate")
module.exports = {
    name: "translate",
    category: "info",
    description: "Retourne une phrase traduite dans la langue choisit",
    run: async (Client, message, args) => {
        let language = args[0];
        let text = args.slice(1).join(" ");
        var erreur = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setTitle("<:warning:869206692091531305> !translate <langue de traduction (en, fr, etc)> <phrase à traduire>")
        if (!language || language.length !== 2 || !text) return message.reply(erreur)

        const result = await translate(text, { to: language });

        const embed = new Discord.MessageEmbed()
            .setDescription(`:earth_africa: Message envoyé par <@${message.author.id}> traduit dans <#${message.channel.id}>.`)
            .setTitle("Google Traduction")
            .addField('Texte dans la langue de base', `\`\`\`${text}\`\`\``)
            .addField(`Texte traduit en ${language}`, `\`\`\`${result.text}\`\`\``)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setColor("00FF04");

        message.channel.send({ embeds : [embed] })
    }
}