const Discord = module.require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {



	let { body } = await superagent
		.get(`http://www.splashbase.co/api/v1/images/random`);

	let wlembed = new Discord.MessageEmbed()
		.setTitle(`Wallpaper For ${message.author.username}`)
		.setColor("RANDOM")
		.setImage(body.url)
		.setTimestamp()
		.setFooter(message.guild.me.displayName)
	message.channel.send(wlembed);

};

module.exports.config = {
	name: "wallpaper",
	description: "A Command To Get A Random Wallpaper!",
	usage: "+wallpaper",
	accessableby: "Members",
	aliases: ["wp"]
}
