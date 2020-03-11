const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
	if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setTitle('You Don\'t Have Enough Permissions!').setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
	let ancmessage = args.slice(2).join(" ")
	let ancmessage1 = args.slice(1).join(" ");
	let mchannel = message.mentions.channels.first()
	if(!ancmessage)return message.channel.send(new Discord.MessageEmbed().setTitle('This Command Is Used Like This \`+announce [channel] [message]\` Or \`+announce [message]\` To Announce In The Channel Used!').setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
	message.delete()
	if (mchannel) {
		const anc = new Discord.MessageEmbed()
			.setDescription(`${ancmessage}`)
			.setFooter('IAT Bot')
			.setTimestamp()
			.setColor(0x6bffe1)
		mchannel.send(anc);
	} else {
		
		const anc1 = new Discord.MessageEmbed()
			.setDescription(`${ancmessage1}`)
			.setFooter('IAT Bot')
			.setTimestamp()
			.setColor(0xffc859)
		message.channel.send(anc1);
	}
};

module.exports.config = {
	name: "announce",
	description: "A Commamd To Make Announcements in a Particular Channel or In Which The Command Is Used!",
	usage: "+announce [channel] [text]",
	accessableby: "Staffs & Moderators",
	aliases: ["anc"]
}
