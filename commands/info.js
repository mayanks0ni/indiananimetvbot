const Discord = module.require("discord.js");
const {prefix} = require("../info.json");

module.exports.run = async (bot, message, args) => {
    const infoembed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setTitle("Bot's Info!")
        .addField('**Name**', `**${bot.user.username}**`)
        .addField('**Prefix**', `**${prefix}**`)
        .addField('**Version**', "**0.0.69**")
        .addField('**Owner**', `**${bot.users.cache.find(user => user.id == "516247416878530560").tag}**`)
        .addField("**Owner Part 2**", `**${bot.users.cache.find(user => user.id == "377132426599727133").tag} & ${bot.users.cache.find(user => user.id == "477758607857942529").tag}\nThese Guy Helped Me A Lot!**`)
        .addField("**Assets Made By -**", `**${bot.users.cache.find(user => user.id == "527911338157277184").tag}\nSpecial Thanks To Him!**`)
        .setColor("RANDOM")
        .setFooter(message.guild.me.displayName)
        .setTimestamp()
    message.channel.send(infoembed);
};

module.exports.config = {
    name: "info",
    description: "A Command To View The Info Of The Bot!",
    usage: "+info",
    accessableby: "Members",
    aliases: [""]
}
