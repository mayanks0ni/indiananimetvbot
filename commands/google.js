const Discord = require("discord.js");
const fetch = require("node-fetch")

module.exports.run = async (bot, message, args) => {
  const query = args.slice(2).join(" ");
  const type = args[1];
  const searchType = ["search", "image"];
  if(!query || !type || !searchType.includes(type)) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This \`+google [search | image] [query]\`!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
 if(type === "search"){
       const url = `https://website-screenshot.whoisxmlapi.com/api/v1?apiKey=at_qFtgwKuzPkEwu6TpIEXbJhpssgDXu&url=google.com/search?q=${query}&height=1080&width=1920&type=png`;
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
    else {
      const url12 = `https://www.google.com/search?q=${query}&tbm=isch`;
      const encodedurl = encodeURIComponent(url12)
      const url1 = `https://website-screenshot.whoisxmlapi.com/api/v1?apiKey=at_qFtgwKuzPkEwu6TpIEXbJhpssgDXu&url=${encodedurl}&height=1080&width=1920`;
    let res1;
    res1 = await fetch(url1)
    console.log(res1)

    const googleImgEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`)
    .setTitle("Search Results")
    .setImage(res1.url)
    .setFooter("IAT Bot")
    .setTimestamp()
    .setColor("RANDOM")
   message.channel.send(googleImgEmbed)
 }
}

module.exports.config = {
  name: "google",
  description: "A Command To Google The Query!",
  usage: "+google [search | image] [query]",
  accessableby: "Members",
  aliases: [""]
}
