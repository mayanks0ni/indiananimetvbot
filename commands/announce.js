const Discord = module.require("discord.js");
const info = require("../info.json");

module.exports.run = async (bot, message, args) => {
	if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setTitle('You Don\'t Have Enough Permissions!').setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
	let ancmessage;
	let mchannel = message.mentions.channels.first()
	if(!ancmessage || !mchannel)return message.channel.send(new Discord.MessageEmbed().setTitle(`This Command Is Used Like This \`${info.prefix}announce [channel] [message]\` Or \`${info.prefix}announce [message]\` To Announce In The Channel Used!`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
	message.delete()
	if (mchannel) {
		ancmessage = args.slice(2).join(" ");
		const anc = new Discord.MessageEmbed()
			.setDescription(`${ancmessage}`)
			.setFooter(message.guild.me.displayName)
			.setTimestamp()
			.setColor(0x6bffe1)
		mchannel.send(anc);
	} else {
		ancmessage = args.slice(1).join(" ");
		const anc1 = new Discord.MessageEmbed()
			.setDescription(`${ancmessage}`)
			.setFooter(message.guild.me.displayName)
			.setTimestamp()
			.setColor(0xffc859)
		message.channel.send(anc1);
	}
};

module.exports.config = {
	name: "announce",
	description: "A Commamd To Make Announcements in a Particular Channel or In Which The Command Is Used!",
	usage: `${info.prefix}announce [channel] [text]`,
	accessableby: "Staffs & Moderators",
	aliases: ["anc"]
}
