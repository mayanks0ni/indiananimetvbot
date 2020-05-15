const Discord = require("discord.js");

module.exports.run = async(bot, message, args) =>{
  const emoji = args[1]
  if(!emoji) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This \`+emoji [emoji]\`!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimetsamp());
  const emojiName = bot.emojis.cache.find(e => e.name === emoji);
  console.log(emoji);


  const emojiEmbed = new Discord.MessageEmbed()
  .setTitle("test!")
  .setColor("RANDOM")
  .setFooter(message.guild.me.displayName)
  .setTimestamp()
  message.guild.channels.cache.find(c => c.topic === "warnlog").send(emojiEmbed);
}

module.exports.config = {
  name: "emoji",
  description: "A Command To View The Detailed Info Of The Emoji!",
  usage: "+emoji [emoji]",
  accessableby: "Members",
  aliases: ["e"]
}
