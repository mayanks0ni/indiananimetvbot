const Discord = require("discord.js");
const info = require("../info.json");

 module.exports.run = async (bot, message, args) => {
   const question = args.slice(1).join(" ");
   if(!question) return message.channel.send(new Discord.MessageEmbed().setTitle(`This Command Is Used Like This \`${info.prefix}askdan [quesion]\`!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
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
   .setFooter(message.guild.me.displayName)
   .setTimestamp()
   message.channel.send(danReply);

 }

 module.exports.config = {
   name: "askdan",
   description: "Ask Dan A Question And Get The Reply In Yes/No!",
   usage: `${info.prefix}askdan [question]`,
   accessableby: "Members",
   aliases: [""]
 }
