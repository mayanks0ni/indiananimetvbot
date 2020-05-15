const Discord = module.require("discord.js");
const sqlite = require("sqlite3");

module.exports.run = async (bot, message, args) => {
  const db = new sqlite.Database("./database/userdb1.db", err => {
    if (err) console.log(err);
  });

  const trans = new sqlite.Database("./database/transactions.db", err => {
    if(err) console.error(err);
  });

  const diamond = bot.emojis.cache.get("706515264451117109");
  const tada = bot.emojis.cache.get("706822382089666570");
  let user = message.mentions.users.first();
  const amount = args[2];
  if(!user || !amount) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("This Command Is Used Like This \`+give [user] [amount]\`!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(user.id === message.author.id) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("You Can\'t Give Money To Yourself!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(isNaN(amount)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be A Number!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(amount < 1) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be Greater Than 0!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(amount.startsWith("-")) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("Invalid Arguement!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(amount != Math.floor(amount)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Amount Should Be A Whole Number Greater Than 0!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  let sender = message.author.id;
  let mention = user.id;
let senderData = {};
let mentionData = {};
db.each("SELECT * FROM userdb", (err, row) => {
  if(row.userId == sender) {
    senderData["userid"] = row.userId;
    senderData["bal"] = row.bal;
  }
  if(row.userId == mention) {
    mentionData["userid"] = row.userId;
    mentionData["bal"] = row.bal;
  }
}, () => {
  if(Object.keys(senderData).length != 0) {
    if(Object.keys(mentionData).length != 0) {
      if(senderData.bal < amount) return message.channel.send(new Discord.MessageEmbed().setTitle(`You Don't Have That Much Money In Your Hand!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp())
      db.all(`UPDATE userdb SET bal = bal + '${amount}' WHERE userId = '${user.id}'`)
      db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)

trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Amount Gifted By '${message.author.tag}'!", '+${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${user.id}')`)

trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Gifted Amount To ${user.tag}!", '-${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Transaction Successful! ${tada}`).addField("**Amount**", `**${amount}${diamond}**`).addField("**Given By**", `**${message.author.tag}**`).addField("**Given To**", `**${user.tag}**`).setThumbnail(bot.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp())
    }
    else {
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Specified User Is Not Registered**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
    }
  }
  else {
    message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Not Registered!**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  }

})
db.close();
};

module.exports.config = {
  name: "give",
  description: "A Command To Give An Amount To Someone!",
  usage: "+give [user] [amount]",
  accessableby: "Members",
  aliases: [""]
}
