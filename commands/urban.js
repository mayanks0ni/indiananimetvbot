const Discord = require("discord.js");
const urban = require("urban");

module.exports.run = async (bot, message, args) => {
    if (args.length < 1) return message.channel.send(new Discord.MessageEmbed().setTitle('This Command Is Used Like This \`+urban [text]\`').setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
    let XD = args.slice(1).join(" ");

    urban(XD).first(json => {
        if (!json) return message.channel.send(new Discord.MessageEmbed().setTitle('No Results Found For That Word!').setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());

        let urbEmbed = new Discord.MessageEmbed()
            .setColor("00ff00")
            .setTitle(json.word)
            .setDescription(json.definition)
            .addField("Upvotes", json.thumbs_up, true)
            .addField("Downvotes", json.thumbs_down, true)
            .setFooter(`Written by: ${json.author}`);

        message.channel.send(urbEmbed)
    });


}

module.exports.config = {
    name: "urban",
    description: "A Command To Get The Definition Of The Provided Word From Urban Dictionary!",
    usage: "+urban [word]",
    accessableby: "Members",
    aliases: ["urban", "ud"]
}
