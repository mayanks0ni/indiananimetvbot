const Discord = module.require("discord.js");
const superagent = require("superagent");
module.exports.run = async (bot, message, args) => {
	let user1 = message.mentions.users.first();
	let user2 = message.mentions.users.last();

	if (!user1 || !user2) {
		const nousers = new Discord.MessageEmbed()
			.setTitle('This Command Is Used LIke This \`+ship [user 1] [user 2]\`')
			.setFooter('IAT Bot')
			.setColor(0xff0000)
			.setTimestamp()
		message.channel.send(nousers);
	} else {

		let { body } = await superagent
			.get(`https://nekobot.xyz/api/imagegen?type=ship&&user1=${user1.displayAvatarURL()}&&user2=${user2.displayAvatarURL()}`);

		let shipembed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setImage(body.message)
			.setTimestamp()
			.setFooter('IAT Bot')
		message.channel.send(shipembed);
	}
};

module.exports.config = {
	name: "ship",
	description: "A Command To View A Shipping Image Of The Mentioned Users!",
	usage: "+ship [user 1] [user 2]",
	accessableby: "Members",
	aliases: [""]
}
