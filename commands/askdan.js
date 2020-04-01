const Discord = require("discord.js");

 module.exports.run = async (bot, message, args) => {
   const question = args.slice(1).join(" ");
   if(!question) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This \`+askdan [quesion]\`!").setFooter("IAT Bot").setColor(0xff0000).setTimestamp());
   const reply = ["Yes", "No"];
   let emoji;
   let color;
   const replyChance = reply[Math.floor(Math.random() * reply.length)];
   if(replyChance === "Yes") {
     emoji = bot.emojis.cache.get("676508968717123593")
     color = "#10ff00"
   }else if(replyChance === "No"){
     emoji = bot.emojis.cache.get("676509007762030611")
     color = "#ff0000"
   }
   const danReply = new Discord.MessageEmbed()
   .setTitle(`${emoji} Dan Has Replied!`)
   .addField("**Question**", `${question}`)
   .addField("**Dan's Reply**", `${replyChance}`)
   .setThumbnail(emoji.url)
   .setColor(color)
   .setFooter("IAT Bot")
   .setTimestamp()
   message.channel.send(danReply);

 }

 module.exports.config = {
   name: "askdan",
   description: "Ask Dan A Question And Get The Reply In Yes/No!",
   usage: "+askdan [question]",
   accessableby: "Members",
   aliases: [""]
 }
