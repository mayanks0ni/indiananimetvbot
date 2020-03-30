const covid = require("novelcovid");
const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let countryName = args.slice(1).join(" ");
  if(!countryName) return message.channel.send(new Discord.MessageEmbed().setTitle("Error!").setDescription("**Please Specify The Country\'s Name!**").setFooter("IAT Bot").setTimestamp().setColor(0xff0000))
  let res = await covid.getCountry({country: countryName})
  if(`${res.country}` === "undefined") return message.channel.send(new Discord.MessageEmbed().setTitle("Error!").setDescription("**Invalid Country\'s Name!**").setFooter("IAT Bot").setTimestamp().setColor(0xff0000))
  message.channel.send(new Discord.MessageEmbed().setTitle(`Live Status Of ${res.country}!`).addField("**Total Cases**", `${res.cases}`).addField("**Today Cases**", `${res.todayCases}`).addField("**Total Deaths**", `${res.deaths}`).addField("**Today Deaths**", `${res.todayDeaths}`).addField("**Recovered**", `${res.recovered}`).addField("**Active**", `${res.active}`).addField("**Critical**", `${res.critical}`).setFooter("IAT Bot").setTimestamp().setColor("RANDOM"))
}

module.exports.config = {
  name: "covid",
  description: "A Command To View Information On The Coronavirus Outbreak Around The World!",
  usage: "+covid [country]",
  accessableby: "Members",
  aliases: [""]
}
