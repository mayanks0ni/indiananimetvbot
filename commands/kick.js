const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
	if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send(new Discord.MessageEmbed().setTitle('You Don\'t Have Enough Permissions!').setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
	const user1 = message.mentions.users.first()
	const reason = args.slice(2).join(" ");
	if (!user1 || !reason) return message.channel.send(new Discord.MessageEmbed().setTitle('This Command Is Used Like This \`+kick [user] [reason]\`').setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
	if (user1) {
		const member1 = message.guild.member(user1);

		if (member1) {
			member1.kick(reason).then(() => {
				 const kickembed = new Discord.MessageEmbed()
					.setTitle('Member Kicked')
					.setDescription(`Succesfully Kicked ${user1.tag}`)
					.addField(`**Reason**`, `${reason}`)
					.addField("**Moderator**", `${message.author.tag}`)
					.setColor(0x00fa21)
					.setFooter("IAT Bot")
					.setTimestamp()
				 message.channel.send(kickembed)
			}).catch(err => {
				const error = new Discord.MessageEmbed()
					.setDescription('The user cannot be kicked due to no permissions or due to mine role is below that members role!')
					.setColor(0xfa0000)
					.setFooter("IAT Bot")
					.setTimestamp()
				message.channel.send(error);
				console.error(err);
			});
		} else {
			const errembed = new Discord.MessageEmbed()
				.setTitle('The Mentioned User Is Not In The Guild!')
				.setColor(0xff0000)
				.setFooter("IAT Bot")
				.setTimestamp()
			message.channel.send(errembed);
		}
	}
};

module.exports.config = {
	name: "kick",
	description: "A Command To Kick The Mentioned User!",
	usage: "+kick [user]",
	accessableby: "Staffs & Moderators",
	aliases: [""]
}
