const covid = require("novelcovid");
const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let countryName = args.slice(1).join(" ");
  let res = await covid.getCountry({country: countryName}).catch(err =>{
   return message.channel.send(new Discord.MessageEmbed().setTitle("Error!").setDescription(err).setFooter("IAT Bot").setTimestamp().setColor(0xff0000))
  });
  message.channel.send(new Discord.MessageEmbed().setTitle(`Live Status Of ${res.country}!`).addField("**Total Cases**", `${res.cases}`).addField("**Today Cases**", `${res.todayCases}`).addField("**Total Deaths**", `${res.deaths}`).addField("**Today Deaths**", `${res.todayDeaths}`).addField("**Recovered**", `${res.recovered}`).addField("**Active**", `${res.active}`).addField("**Critical**", `${res.critical}`).setFooter("IAT Bot").setTimestamp().setColor("RANDOM"))
}

module.exports.config = {
  name: "covid",
  description: "A Command To View Information On The Coronavirus Outbreak Around The World!",
  usage: "+covid [country]",
  accessableby: "Members",
  aliases: [""]
}