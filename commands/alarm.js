const Discord = require("discord.js");
const ms = require("ms");
const info = require("../info.json");

module.exports.run = async(bot, message, args) => {
   const time = args[1];
   const reminder = args.slice(2).join(" ");
   if(!time || !reminder) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`).setTitle(`This Command Is Used Like This \`${info.prefix}alarm [duration (1m/1h/1d)] [reminder]\``).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
   message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`).setTitle("⏰ Your Alarm Has Been Set To Remind You! ⏰").setFooter(message.guild.me.displayName).setColor("RANDOM").setTimestamp());
   const alarmEmbed = new Discord.MessageEmbed()
   .setAuthor(`${message.author.tag}`)
   .setTitle("⏰ Alarm ⏰")
   .setDescription(`**Your Reminder To Do ${reminder}**!`)
   .setColor("RANDOM")
   .setFooter(message.guild.me.displayName)
   .setTimestamp()

   setTimeout( function(){
   	message.author.send(alarmEmbed);
   }, ms(time));
}

module.exports.config = {
	name: "alarm",
	description: "A Command To Set A Reminder Which Will Alarm You By DMing You!",
	usage: `${info.prefix}alarm [duration (1m/1h/1d)] [reminder]`,
	accessableby: "Members",
	aliases: ["reminder"]
}
