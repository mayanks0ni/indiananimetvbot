const Discord = require("discord.js");
const fetch = require("node-fetch")

module.exports.run = async (bot, message, args) => {
  const query = args.slice(2).join(" ");
  const type = args[1];
  const searchType = ["search"];
  if(!query || !type || !type.includes(searchType)) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This \`+google [search] [query]\`!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
 if(type === "search"){
       const url = `https://website-screenshot.whoisxmlapi.com/api/v1?apiKey=at_qFtgwKuzPkEwu6TpIEXbJhpssgDXu&url=google.com/search?q=${query}&height=768&width=1366&type=png`;
       let res;
       res = await fetch(url)

       const googleEmbed = new Discord.MessageEmbed()
       .setAuthor(`${message.author.tag}`)
       .setTitle("Search Results")
       .setImage(res.url)
       .setFooter("IAT Bot")
       .setTimestamp()
       .setColor("RANDOM")
      message.channel.send(googleEmbed)
    }
}

module.exports.config = {
  name: "google",
  description: "A Command To Google The Query!",
  usage: "+google [search] [query]",
  accessableby: "Members",
  aliases: [""]
}
