const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {

	if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setTitle('You Don\'t Have Enough Permissions!').setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());

	const dmtext = args.slice(2).join(" ");
	const dmuser = message.mentions.users.first()
	message.delete()
	if (!dmuser) return message.channel.send(new Discord.MessageEmbed().setTitle('This Message Is Used Like This \`+dm [user] [message]\`').setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
	const dmmessage = new Discord.MessageEmbed()
		.setDescription(`${dmtext}`)
		.setFooter('From IAT Bot')
		.setTimestamp()
		.setColor("RANDOM")
	dmuser.send(dmmessage);


};

module.exports.config = {
	name: "dm",
	description: " A Command To Direct Message The Mentioned User To Through The Bot!",
	usage: "+dm [user] [text]",
	accessableby: "Staffs & Moderators",
	aliases: ["send"]
}
