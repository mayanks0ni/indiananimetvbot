const Discord = module.require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

	let text = args.slice(1).join(" ");
	if (!text) {
		const notext = new Discord.MessageEmbed()
			.setTitle('Please Provide Some Text!')
			.setFooter(message.guild.me.displayName)
			.setColor(0xff0000)
			.setTimestamp()
		message.channel.send(notext);
	} else {
		let { body } = await superagent
			.get(`https://nekobot.xyz/api/imagegen?type=changemymind&&text=${text}`);

		let tweetembed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setImage(body.message)
			.setTimestamp()
			.setFooter(message.guild.me.displayName)
		message.channel.send(tweetembed);
	}
};

module.exports.config = {
	name: "cmm",
	description: "A Command To Get A Change My Mind Image For The Provided Text!",
	usage: "+cmm [text]",
	accessableby: "Members",
	aliases: [""]
}
