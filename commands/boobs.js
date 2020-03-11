const Discord = module.require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
	if (!message.channel.nsfw) {
		const notnsfw = new Discord.MessageEmbed()
			.setTitle('**This is not a NSFW Channel!**')
			.setFooter('IAT Bot')
			.setTimestamp()
			.setColor(0xff0000)
		message.channel.send(notnsfw);
	} else {

		let { body } = await superagent
			.get(`https://nekos.life/api/v2/img/tits`);

		let boobembed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setTitle(`Boobs Image For ${message.author.username}!`)
			.setImage(body.url)
			.setTimestamp()
			.setFooter('IAT Bot')
		message.channel.send(boobembed);
	}

};

module.exports.config = {
	name: "boobs",
	description: "A Command To View Boobs Images!",
	usage: "+boobs",
	accessableby: "Members",
	aliases: ["tits", "boob", "tit"]
}
