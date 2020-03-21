const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`).setTitle("You Don\'t Have Enough Permissions!").setFooter("IAT Bot").setColor(0xff0000).setTimestamp());
 
    let member = message.mentions.members.first();
    if(!member) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`).setTitle("This Command Is Used Like This \`+unmute [member] [reason]\`").setFooter("IAT Bot").setColor(0xff0000).setTimestamp());
    if(!member.roles.cache.find(r => r.name === "Muted")) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`).setTitle("That User Is Already Unmuted!").setFooter("IAT Bot").setColor(0xff0000).setTimestamp());
    let reason = args.slice(2).join(" ");

    let muterole = message.guild.roles.cache.find(muterole => muterole.name === "Muted");

    await member.roles.remove(muterole)
    const mEmbed = new Discord.MessageEmbed()
    .setAuthor(`Successfully Unmuted ${member.displayName}!`)
    .setTitle(`${member.displayName} Has Been Unmuted!`)
    .addField(`**Moderator**`, `${message.author.tag}`)
    .addField(`**Reason**`, `${reason || "None"}`)
    .setColor(0x00ff90)
    .setFooter("IAT Bot")
    .setTimestamp()
    message.channel.send(mEmbed);
}

module.exports.config = {
    name: "unmute",
    description: "A Command To Unmute The User!",
    usage: "+unmute [member] [reason]",
    accessableby: "Staffs & Moderators",
    aliases: [""]
}