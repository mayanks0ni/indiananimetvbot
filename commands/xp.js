const Discord = module.require("discord.js");
const sqlite = require("sqlite3").verbose();
const info = require("../info.json");

module.exports.run = async (bot, message, args) => {
  const db = new sqlite.Database("./database/xp.db", err=>{
    if(err) console.log(err);
  });

  let user = message.mentions.users.first();
  if(user){
  let userInfo = `SELECT * FROM xp WHERE userId = ?`;
  db.get(userInfo, [user.id], (err, row) => {
    if (err) {
      console.log(err);
      return;
    }
    if(row === undefined){
      return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Mentioned User Does Not Have XP!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    } else{
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${user.tag}' XP'`).setDescription(`**XP - ${row.xp}\nLevel - ${row.level}**`).setFooter(message.guild.me.displayName).setColor("RANDOM").setTimestamp())
    }
  });
} else{
  db.get(`SELECT * FROM xp WHERE userId = ?`, [message.author.id], (err, row) => {
    if (err) {
      console.log(err);
      return;
    }
    if(row === undefined){
      return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Do Not Have XP!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    } else{
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**XP - ${row.xp}\nLevel - ${row.level}**`).setFooter(message.guild.me.displayName).setColor("RANDOM").setTimestamp())
    }
  });
}
db.close();
};

module.exports.config = {
    name: "xp",
    description: "A Command To View XP & Level Of Yourself Or Others!",
    usage: `${info.prefix}xp | ${info.prefix}xp [user]`,
    accessableby: "Members",
    aliases: ["level"]
}
