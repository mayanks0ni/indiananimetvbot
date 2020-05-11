const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.permissions.has("MANAGE_MESSAGES")) {
    const nodelperms = new Discord.MessageEmbed()
      .setAuthor('You Do Not Have Enough Permissions!!')
      .setFooter(message.guild.me.displayName)
      .setColor(0xff0000)
      .setTimestamp()
    message.channel.send(nodelperms);
  } else {
    message.delete()
    message.channel.bulkDelete(args[1]);
  }
};

module.exports.config = {
  name: "del",
  description: "A Command To Delete A Particular Number Of Messages In The Channel!",
  usage: "+del [amount]",
  accessableby: "Staffs & Moderator",
  aliases: ["clear"]
}
