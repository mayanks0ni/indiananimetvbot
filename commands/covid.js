const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
  let countryName = args.slice(1).join(" ");
  if(!countryName) return message.channel.send(new Discord.MessageEmbed().setTitle("Error!").setDescription("**Please Specify The Country\'s Name!**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000))
try {
  const url = `https://coronavirus-19-api.herokuapp.com/countries/${countryName}`
  let res = await fetch(url).then(url => url.json());
  message.channel.send(new Discord.MessageEmbed().setTitle(`COVID-19 Status Of ${res.country}!`).setThumbnail("https://cdn.discordapp.com/attachments/564520348821749766/701422183217365052/2Q.png").addField("**Total Cases**", `${res.cases}`).addField("**Today Cases**", `${res.todayCases}`).addField("**Total Deaths**", `${res.deaths}`).addField("**Today Deaths**", `${res.todayDeaths}`).addField("**Recovered**", `${res.recovered}`).addField("**Active**", `${res.active}`).addField("**Critical**", `${res.critical}`).setDescription("**This Information Isn't Live Always, Hence May Not Be Accurate!**").setFooter(message.guild.me.displayName).setTimestamp().setColor("RANDOM"))
} catch (e) {
  console.error(e);
  return message.channel.send(new Discord.MessageEmbed().setTitle("Error!").setDescription(`**Invalid Country Name Or API Error! Try Again..!**`).setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000))
}
}

module.exports.config = {
  name: "covid",
  description: "A Command To View Information On The Coronavirus Outbreak Around The World!",
  usage: "+covid [country]",
  accessableby: "Members",
  aliases: [""]
}
