const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
	message.delete()
	if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed().setTitle('You Don\'t Have Enough Permissions!').setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
	const user = message.mentions.users.first();
	const reason = args.slice(2).join(" ");
	if (!reason || !user) return message.channel.send(new Discord.MessageEmbed().setTitle('This Command Is Used Like This \`+ban [user] [reason]\`').setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
	if (user) {
		const member = message.guild.member(user);
		if (member) {
			member.ban({
				reason: reason,
			}).then(() => {
				const banembed = new Discord.MessageEmbed()
					.setTitle('Member Bannned')
					.setDescription(`Succesfully Banned ${user.tag}`)
					.addField(`**Reason**`, `${reason}`)
					.addField("**Moderator**", `${message.author.tag}`)
					.setColor(0x00fa21)
					.setFooter(message.guild.me.displayName)
					.setTimestamp()
				message.channel.send(banembed);
			}).catch(err => {
				const errorbanembed = new Discord.MessageEmbed()
					.setDescription('The user cannot be banned due to no permissions or due to mine role is below that members role!')
					.setColor(0xff0000)
					.setFooter(message.guild.me.displayName)
					.setTimestamp()
				message.channel.send(errorbanembed);
				console.error(err);
			});
		} else {
			const notinguildembed = new Discord.MessageEmbed()
				.setDescription('The mentioned user is not in the guild!')
				.setColor(0xabfa00)
				.setFooter(message.guild.me.displayName)
				.setTimestamp()
			message.channel.send(notinguildembed);
		}
	}

};

module.exports.config = {
	name: "ban",
	description: "A Command To Ban The Mentioned User!",
	usage: "+ban [user] [reason]",
	accessableby: "Staffs & Moderators",
	aliases: [""]
}
