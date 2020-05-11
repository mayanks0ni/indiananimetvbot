const Discord = module.require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
	let text1 = args.slice(1).join(" ");
	if (!text1) {
		const notext = new Discord.MessageEmbed()
			.setTitle('Please Provide Text To Tweet!')
			.setFooter(message.guild.me.displayName)
			.setColor(0xff0000)
			.setTimestamp()
		message.channel.send(notext);
	} else {

		let { body } = await superagent
			.get(`https://nekobot.xyz/api/imagegen?type=trumptweet&&text=${text1}`);

		let ttembed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setTitle('Trump Tweet LMAO!')
			.setImage(body.message)
			.setTimestamp()
			.setFooter(message.guild.me.displayName)
		message.channel.send(ttembed);
	}
};

module.exports.config = {
	name: "trumptweet",
	description: "A Command To Get Trmup Tweet Image!",
	usage: "+trmuptweet [text]",
	accessableby: "Members",
	aliases: ["tt"]
}
