const Discord = module.require("discord.js");
const sqlite = require("sqlite3").verbose();
const info = require("../info.json");

module.exports.run = async (bot, message, args) => {
  const db = new sqlite.Database("./database/userdb1.db", err=>{
    if(err) console.log(err);
  })
  const diamond = bot.emojis.cache.get("706515264451117109");

  let userInfo = `SELECT * FROM userdb ORDER BY bal DESC LIMIT 5`;
  db.all(userInfo, (err, row) => {
    if (err) {
      console.log(err);
      return;
    }
    if(row === undefined){
      return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**An Error Occured! Please Try Again..!!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    } else{
      var i;
      let lb = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
      .setTitle("📜 Economy Leaderboard 📜")
      .setFooter(message.guild.me.displayName)
      .setThumbnail(bot.user.displayAvatarURL())
      .setColor("YELLOW")
      .setTimestamp()
      for(i=0;i<row.length;i++){
        let r = row[i];
        lb.addField(`\`#${i+1}\` **${bot.users.cache.find(user => user.id == r.userId).tag}**`, `**Balance - ${r.bal}${diamond}**`)
      }
        message.channel.send(lb)
    }
  });
db.close();
};

module.exports.config = {
    name: "leaderboard",
    description: "A Command To View The Economy Leaderboard!",
    usage: `${info.prefix}leaderboard`,
    accessableby: "Members",
    aliases: ["ld"]
}
