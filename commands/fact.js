const Discord = module.require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
	let { body } = await superagent
		.get(`https://nekos.life/api/v2/fact`);

	let factembed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setTitle('Random Fact!')
		.setDescription(body.fact)
		.setTimestamp()
		.setFooter('IAT Bot')
	message.channel.send(factembed);
};

module.exports.config = {
	name: "fact",
	description: "A Command To Get A Random Fact!",
	usage: "+fact",
	accessableby: "Members",
	aliases: [""]
}
