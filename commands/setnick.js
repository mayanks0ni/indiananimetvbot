const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
	const member12 = message.mentions.members.first()
	let nickname = args.slice(2).join(" ");
	if (!message.member.permissions.has("MANAGE_NICKNAMES")) {
		return message.channel.send(new Discord.MessageEmbed().setTitle('You Don\'t Have Enough Permissions!').setColor(0xff0000).setFooter("IAT Bot").setTimestamp());

	} else {
		if (!member12 || !nickname) {
			const nomem = new Discord.MessageEmbed()
				.setTitle('This Is Used In This Way \`+setnick [user] [nickname]\`!')
				.setColor(0xff0000)
				.setFooter('IAT Bot')
				.setTimestamp()
			message.channel.send(nomem);
		} else {
			try{
			await member12.setNickname(nickname)
			return message.channel.send(new Discord.MessageEmbed().setTitle(`Successfully Changed ${member12.displayName} To ${nickname}!`).setColor("RANDOM").setFooter('IAT Bot').setTimestamp());
		} catch(e){
			console.log(e);
			return message.channel.send(new Discord.MessageEmbed().setTitle("Error! Cannot Change The Nickname Of That User! \n I Can't Change The Nickname Of Someone With Higher Role Than Me!").setColor(0xff0000).setTimestamp().setFooter("IAT Bot"))
		}
		}
	}
};

module.exports.config = {
	name: "setnick",
	description: "A Command To Chnage The Nickname Of Any User In The Guild!",
	usage: "+setnick [user] [nickname]",
	accessableby: "Staffs & Moderator",
	aliases: ["nick", "nickname"]
}
