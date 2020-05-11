const Discord = module.require("discord.js");
const sqlite = require("sqlite3").verbose();

module.exports.run = async (bot, message, args) => {
    const db = new sqlite.Database("./database/userdb1.db", err=>{
        if(err) console.log(err);
      });
      const diamond = bot.emojis.cache.get("706515264451117109");
  let amount = args[1];
  if(!amount) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("This Command Is Used Like This \`+withdraw [amount]\`!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(isNaN(amount)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be A Number!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(amount < 1) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("The Amount Should Be Greater Than 0!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(amount.startsWith("-")) return message.channel.send(new Discord.MessageEmbed().setTitle("Invalid Arguement!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  let userInfo = `SELECT * FROM userdb WHERE userId = ?`;
  db.get(userInfo, [message.author.id], (err, row) => {
    if (err) {
      console.log(err);
      return;
    }
    if(row === undefined){
      return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Not Registered!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    } else{
        if(row.bankbal < amount) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Don't Have That Much Money In Your Bank!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        db.all(`UPDATE userdb SET bankbal = bankbal - "${amount}" WHERE userId = '${message.author.id}'`)
        db.all(`UPDATE userdb SET bal = bal + "${amount}" WHERE userId = '${message.author.id}'`)
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Have Withdrawn ${amount}${diamond} From Your Bank!**`).setFooter(message.guild.me.displayName).setColor(0xf600ff).setTimestamp())
    }
  });
  db.close();
};

module.exports.config = {
    name: "withdraw",
    description: "A Command To Withdraw An Amount From Your Bank!",
    usage: "+withdraw [amount]",
    accessableby: "Members",
    aliases: ["with"]
}
