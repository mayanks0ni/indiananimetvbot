const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const query = args.slice(1).join(" ");
  if(!query) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This \`+google [query]\`!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
  const googleEmbed = new Discord.MessageEmbed()
  .setAuthor("Google Search Results!")
  .setTitle("Click Here To View Results.")
  .setURL(`https://lmgtfy.com/?q=${query}`)
  .setThumbnail(`https://cdn.discordapp.com/attachments/564520348821749766/695586317068664891/1585911065485757156151.jpg`)
  .setFooter("IAT Bot")
  .setTimestamp()
  .setColor("RANDOM")
  message.channel.send(googleEmbed);
}

module.exports.config = {
  name: "google",
  description: "A Command To Google The Query!",
  usage: "+google [query]",
  accessableby: "Members",
  aliases: [""]
}
