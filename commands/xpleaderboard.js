const Discord = module.require("discord.js");
const sqlite = require("sqlite3").verbose();
const info = require("../info.json");

module.exports.run = async (bot, message, args) => {
  const db = new sqlite.Database("./database/xp.db", err=>{
    if(err) console.log(err);
  })

  let userInfo = `SELECT * FROM xp ORDER BY xp DESC LIMIT 5`;
  db.all(userInfo, (err, row) => {
    if (err) {
      console.log(err);
      return;
    }
    if(row === undefined){
      return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**An Error Occured! Please Try Again..!!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    } else{
      var i;
      let xplb = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
      .setTitle("📜 XP Leaderboard 📜")
      .setFooter(message.guild.me.displayName)
      .setThumbnail(bot.user.displayAvatarURL())
      .setColor("YELLOW")
      .setTimestamp()
      for(i=0;i<row.length;i++){
        let r = row[i];
        xplb.addField(`\`#${i+1}\` **${bot.users.cache.find(user => user.id == r.userId).tag}**`, `**XP - ${r.xp}**`)
      }
        message.channel.send(xplb)
    }
  });
db.close();
};

module.exports.config = {
    name: "xpleaderboard",
    description: "A Command To View The XP Leaderboard!",
    usage: `${info.prefix}xpleaderboard`,
    accessableby: "Members",
    aliases: ["xpld", "xplb"]
}
