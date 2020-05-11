const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let text = args.slice(1).join(" ");
    if (!text) return message.channel.send(new Discord.MessageEmbed().setTitle('This Command Is Used Like This \`+spoiler [text]\`').setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
    const spoilerembed = new Discord.MessageEmbed()
        .setAuthor('📄 Spoiler!! 📄')
        .setDescription(`||${text}||`)
        .setColor(0x000000)
        .setFooter(message.guild.me.displayName)
        .setTimestamp()
    message.channel.send(spoilerembed);
};

module.exports.config = {
    name: "spoiler",
    description: "A Command To Send The Provided Text In Spoiler Form Through The Bot!",
    usage: "+spoiler [text]",
    accessableby: "Members",
    aliases: [""]
}
