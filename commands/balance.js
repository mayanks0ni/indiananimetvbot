const Discord = module.require("discord.js");
const sqlite = require("sqlite3").verbose();
const info = require("../info.json");

module.exports.run = async (bot, message, args) => {
  const db = new sqlite.Database("./database/userdb1.db", err=>{
    if(err) console.log(err);
  })
  const diamond = bot.emojis.cache.get("706515264451117109");

  let user = message.mentions.users.first();
  if(user){
  let userInfo = `SELECT * FROM userdb WHERE userId = ?`;
  db.get(userInfo, [user.id], (err, row) => {
    if (err) {
      console.log(err);
      return;
    }
    if(row === undefined){
      return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Mentioned User Is Not Registered!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    } else{
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**${user.tag} Has ${row.bal}${diamond} In Their Hand!**`).setFooter(message.guild.me.displayName).setColor("BLUE").setTimestamp())
    }
  });
} else{
  db.get(`SELECT * FROM userdb WHERE userId = ?`, [message.author.id], (err, row) => {
    if (err) {
      console.log(err);
      return;
    }
    if(row === undefined){
      return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Not Registered!\n Register An Account By Sending \`+register\`!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    } else{
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Have ${row.bal}${diamond} In Your Hand!**`).setFooter(message.guild.me.displayName).setColor("BLUE").setTimestamp())
    }
  });
}
db.close();
};

module.exports.config = {
    name: "balance",
    description: "A Command To View Balance Of Yourself Or Others!",
    usage: `${info.prefix}balance | ${info.prefix}balance [user]`,
    accessableby: "Members",
    aliases: ["bal", "cur", "currency"]
}
