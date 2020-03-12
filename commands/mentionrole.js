const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
	message.delete()
	if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setTitle('You Don\'t Have Enough Permissions!').setColor(0xff0000).setFooter("IAT Bot").setTimestamp());

	let rolename;
	rolename = args.slice(1).join(" ")
	if (!rolename) {
		const nomenrole = new Discord.MessageEmbed()
			.setTitle('**You didn\'t wrote the roles name!**')
			.setColor(0xff0000)
			.setFooter("IAT Bot")
			.setTimestamp()
		message.channel.send(nomenrole);
	} else {
		const mentionedRole = message.guild.roles.cache.find(r => r.name === rolename)
		mentionedRole.setMentionable(true)
		await message.channel.send(`${mentionedRole}`)
		mentionedRole.setMentionable(false)

	}
};

module.exports.config = {
	name: "mentionrole",
	description: "A Command To Mention The Role Through The Bot!",
	usage: "+mentionrole [rolename]",
	accessableby: "Staffs & Moderators",
	aliases: ["mr"]
}
