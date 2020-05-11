const Discord = module.require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
    const url = `https://evilinsult.com/generate_insult.php?lang=en&type=json`;

    let res;

    res = await fetch(url).then(url => url.json());

    const insultembed = new Discord.MessageEmbed()
        .setTitle(res.insult)
        .setColor("RANDOM")
        .setFooter(message.guild.me.displayName)
        .setTimestamp()
    message.channel.send(insultembed);
};

module.exports.config = {
    name: "insult",
    description: "A Command To Insult Anyone!",
    usage: "+insult",
    accessableby: "Members",
    aliases: ["roast"]
}
