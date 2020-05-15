const Discord = module.require("discord.js");
const sqlite = require("sqlite3").verbose();

module.exports.run = async (bot, message, args) => {
  const db = new sqlite.Database("./database/userdb1.db", err=>{
    if(err) console.log(err);
  })
  const trans = new sqlite.Database("./database/transactions.db", err => {
    if(err) console.error(err);
  });

  const diamond = bot.emojis.cache.get("706515264451117109");

  let amount = args[1];
  let rdList = ["1", "2", "3", "4", "5", "6"]

  if(!amount || isNaN(amount)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("This Command Is Used Like This \`+rolldice [bet amount]\`!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(amount < 1) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be Greater Than 0!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(amount != Math.floor(amount)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Amount Should Be A Whole Number Greater Than 0!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  let userInfo = `SELECT * FROM userdb WHERE userId = ?`;
  db.get(userInfo, [message.author.id], (err, row) => {
    if (err) {
      console.log(err);
      return;
    }
    if(row === undefined){
      return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Not Registered!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    }else{
      if(row.bal < amount) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Don't Have That Much Money In Your Hand!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    let chance = rdList[Math.floor(Math.random() * rdList.length)]
    if(chance > 3){
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**🎲 You Rolled \`${chance}\`! 🎲\nYou Won ${amount * 2}${diamond}**`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
      db.all(`UPDATE userdb SET bal = bal + '${amount}' WHERE userId = '${message.author.id}'`)
      trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Won In Role Dice!", '+${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
    }else{
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**🎲 You Rolled \`${chance}\` 🎲!\nYou Lost ${amount}${diamond}**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
      db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
      trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Role Dice!", '-${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
    }
  }
  });
db.close();
};

module.exports.config = {
    name: "rolldice",
    description: "A Command To Gamble Coins By Rolling Dice!",
    usage: "+rolldice [bet amount]",
    accessableby: "Members",
    aliases: ["rd"]
}
