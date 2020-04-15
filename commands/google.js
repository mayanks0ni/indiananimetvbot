const Discord = require("discord.js");
const app = require("node-server-screenshot");

module.exports.run = async (bot, message, args) => {
  const query = args.slice(2).join(" ");
  const type = args[1];
  const searchType = ["search"];
  if(!query || !type || !type.includes(searchType)) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This \`+google [search] [query]\`!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
 if(type === "search"){
   app.fromURL(`https://www.google.com/search?q=${query}`, "./googleresult.png", function(err){
     if(err){
       return message.channel.send(new Discord.MessageEmbed().setTitle(`Error: \`${err}\``).setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
     }else{
       const googleEmbed = new Discord.MessageEmbed()
       .setAuthor(`${message.author.tag}`)
       .setTitle("Search Results")
       .attachFiles({ attachment: './googleresult.png' })
       .setImage('attachment://googleresult.png')
       .setFooter("IAT Bot")
       .setTimestamp()
       .setColor("RANDOM")
      message.channel.send(googleEmbed)
       }});
 }
}

module.exports.config = {
  name: "google",
  description: "A Command To Google The Query!",
  usage: "+google [search] [query]",
  accessableby: "Members",
  aliases: [""]
}
