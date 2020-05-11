const Discord = module.require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
	let men2 = message.mentions.users.first();
	if (!men2) {
		const nomen1 = new Discord.MessageEmbed()
			.setTitle('Please mention someone to pat!')
			.setFooter(message.guild.me.displayName)
			.setTimestamp()
			.setColor(0xff0000)
		message.channel.send(nomen1)
	} else {


		let { body } = await superagent
			.get(`https://nekos.life/api/v2/img/pat`);

		let patembed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setTitle(`${message.author.username} patted ${men2.username}! Kawaii!`)
			.setImage(body.url)
			.setTimestamp()
			.setFooter(message.guild.me.displayName)
		message.channel.send(patembed);
	}
};

module.exports.config = {
	name: "pat",
	description: "A Command To Pat The Mentioned User!",
	usage: "+pat [user]",
	accessableby: "Members",
	aliases: [""]
}
