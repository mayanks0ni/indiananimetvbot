const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(bot, message, args) => { 
   
   const time = "3h";
   const reminder = args.slice(2).join(" ");
   message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`).setTitle("Safety Reminder!").setDescription("**Safety Reminder Has Been Set! It will DM You Every 3 hrs To Remind You To Wash/Sanitize Your Hands With Some Extra Tips!**").setFooter(message.guild.me.displayName).setColor("RANDOM").setTimestamp());
   const alarmEmbed = new Discord.MessageEmbed()
   .setAuthor(`${message.author.tag}`)
   .setTitle("⏰ Reminder ⏰")
   .setDescription(`**Wash your hands often with soap and water for at least 20 seconds especially after you have been in a public place, or after blowing your nose, coughing, or sneezing.\nIf soap and water are not readily available, use a hand sanitizer that contains at least 60% alcohol.\n Cover all surfaces of your hands and rub them together until they feel dry. \nAvoid touching your eyes, nose, and mouth with unwashed hands.**!`)
   .setColor("RANDOM")
   .setFooter(message.guild.me.displayName)
   .setTimestamp()

   setInterval( function(){
   	message.author.send(alarmEmbed);
   }, ms(time));

}

module.exports.config = {
	name: "remind",
	description: "A Command To Set A Reminder To Protect You From Corona Virus!",
	usage: "+remind",
	accessableby: "Members",
	aliases: [""]
}