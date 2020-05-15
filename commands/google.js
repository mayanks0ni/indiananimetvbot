const Discord = require("discord.js");
const fetch = require("node-fetch")
const sqlite = require("sqlite3");
module.exports.run = async (bot, message, args) => {
  let udb = new sqlite.Database("./database/userdb1.db", err=>{
    if(err) console.error(err);
  });

  const query = args.slice(2).join(" ");
  const type = args[1];
  const searchType = ["search", "image"];
  udb.get(`SELECT * FROM userdb WHERE userId = '${message.author.id}'`,async (err, rows)=> {
    if(rows === undefined) return message.channel.send(new Discord.MessageEmbed().setTitle("You Need To Register An Account And Buy Premium Membership To Use This Command!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
    if(rows.premium === "no") return message.channel.send(new Discord.MessageEmbed().setTitle("You Need To Buy Premium Membership To Use This Command!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000))
  if(!query || !type || !searchType.includes(type)) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This \`+google [search | image] [query]\`!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
 if(type === "search"){
       const url = `https://website-screenshot.whoisxmlapi.com/api/v1?apiKey=at_qFtgwKuzPkEwu6TpIEXbJhpssgDXu&url=google.com/search?q=${query}&height=1080&width=1920&type=png`;
       let res;
       res = await fetch(url)

       const googleEmbed = new Discord.MessageEmbed()
       .setAuthor(`${message.author.tag}`)
       .setTitle("Search Results")
       .setImage(res.url)
       .setFooter(message.guild.me.displayName)
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
    .setFooter(message.guild.me.displayName)
    .setTimestamp()
    .setColor("RANDOM")
   message.channel.send(googleImgEmbed)
 }
});
udb.close();
};

module.exports.config = {
  name: "google",
  description: "A Command To Google The Query!",
  usage: "+google [search | image] [query]",
  accessableby: "Members",
  aliases: [""]
}
