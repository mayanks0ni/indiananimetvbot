const Discord = module.require("discord.js");
const sqlite = require("sqlite3").verbose();

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
  const owners = ["516247416878530560","477758607857942529","377132426599727133"];
  if(!owners.includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("This Is An Owner-Only Command!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(!user || !amount) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("This Command Is Used Like This \`+gift [user] [amount]\`!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(isNaN(amount)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be A Number!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(amount < 1) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be Greater Than 0!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(amount.startsWith("-")) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("Invalid Arguement!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
db.get(`SELECT * FROM userdb WHERE userId = '${user.id}'`, (err, row) => {
      if(row === undefined) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**The Specified User Is Not Registered!**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp())
      db.all(`UPDATE userdb SET bal = bal + '${amount}' WHERE userId = '${user.id}'`)

trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Gifted By Bot's Owner!", '+${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${user.id}')`)
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Congratulations! ${tada}`).addField("**Amount**", `**${amount}${diamond}**`).addField("**Gifted By**", `**${message.author.tag}**`).addField("**Gifted To**", `**${user.tag}**`).setThumbnail(bot.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp())

})
db.close();
};

module.exports.config = {
  name: "gift",
  description: "A Command To Gift An Amount To Someone!",
  usage: "+gift [user] [amount]",
  accessableby: "Owner",
  aliases: [""]
}
