const Discord = module.require("discord.js");
const sqlite = require("sqlite3").verbose();

module.exports.run = async (bot, message, args) => {
  const db = new sqlite.Database("./database/userdb1.db", err => {
    if (err) console.log(err);
  });
  const tada = bot.emojis.cache.get("706822382089666570");
  const diamond = bot.emojis.cache.get("706515264451117109");
  const amount = args[1];
  const owners = ["516247416878530560","477758607857942529","377132426599727133"];
  if(!owners.includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setTitle("This Is An Owner-Only Command!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(!amount) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("This Command Is Used Like This \`+giftall [amount]\`!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(isNaN(amount)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be A Number!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(amount < 1) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be Greater Than 0!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(amount.startsWith("-")) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("Invalid Arguement!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
      db.all(`UPDATE userdb SET bal = bal + '${amount}'`)
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Congratulations! ${tada}`).setDescription(`**You Have Gifted ${amount}${diamond} To Everyone Who Is Registered!**`).setThumbnail(bot.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp())
db.close();
};

module.exports.config = {
  name: "giftall",
  description: "A Command To Gift Everyone Registered An Amount!",
  usage: "+giftall [amount]",
  accessableby: "Owner",
  aliases: [""]
}
