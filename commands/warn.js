const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setTitle("You Don\'t Have Enough Permissions!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
 const user = message.mentions.users.first();
 let reason = args.slice(2).join(" ");
 let warnChannel = message.guild.channels.cache.find(c => c.name === "〢warn-log");
 message.delete();
 const warnEmbed = new Discord.MessageEmbed()
 .setAuthor(`${user.tag}`, user.displayAvatarURL())
 .setTitle(`Warned ${user.username}!`)
 .addField(`**Moderator**`, `${message.author.tag}`)
 .addField(`**Reason**`, `${reason}`)
 .setColor("YELLOW")
 .setFooter("IAT Bot")
 .setTimestamp()

 message.channel.send(warnEmbed).then(m => m.delete({ timeout: 5000 }))
 warnChannel.send(warnEmbed);
 user.send(warnEmbed);

};

module.exports.config = {
    name: "warn",
    description: "A Command To Warn The User!",
    usage: "+warn [user] [reason] ",
    accessableby: "Staffs & Moderators",
    aliases: [""]
}
