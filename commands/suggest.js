const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
	message.delete()
	let suggestion = args.slice(1).join(" ");
	if (!suggestion) return message.channel.send(new Discord.MessageEmbed().setTitle('This Command Is Used Like This \`+suggest [message]\`').setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
	
	const suggested = new Discord.MessageEmbed()
		.setTitle('Suggestion')
		.setDescription(`${suggestion}`)
		.setColor(0xccff80)
		.setFooter(`Suggestion by ${message.author.tag}`)
		.setTimestamp()
	const sChannel = message.guild.channels.cache.find(c => c.name === "〢suggestions")
	sChannel.send(suggested)
		.then(function (message) {
			message.react("👍")
				.then(() => message.react('👎'))
		})
		message.reply(`Your Suggestion Has Been Posted In <#${sChannel.id}>`)
};

module.exports.config = {
	name: "suggest",
	description: "A Command To Make Suggestions!",
	usage: "+suggest [suggestion]",
	accessableby: "Members",
	aliases: [""]
}
