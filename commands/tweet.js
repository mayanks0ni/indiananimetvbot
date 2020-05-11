const Discord = module.require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
	let uname = args[1];
	let text = args.slice(2).join(" ");
	if (!uname || !text) {
		const nouname = new Discord.MessageEmbed()
			.setTitle('This Command Is Used Like This \`+tweet [username] [text]\`')
			.setFooter(message.guild.me.displayName)
			.setColor(0xff0000)
			.setTimestamp()
		message.channel.send(nouname);
	} else {

		let { body } = await superagent
			.get(`https://nekobot.xyz/api/imagegen?type=tweet&&username=${uname}&&text=${text}`);

		let tweetembed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setImage(body.message)
			.setTimestamp()
			.setFooter(message.guild.me.displayName)
		message.channel.send(tweetembed);
	}
};

module.exports.config = {
	name: "tweet",
	description: "A Command To Tweet Through The Provided Username!",
	usage: "+tweet [username] [text]",
	accessableby: "Members",
	aliases: [""]
}
