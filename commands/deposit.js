const Discord = module.require("discord.js");
const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./database/userdb1.db", err=>{
  if(err) console.log(err);
})
module.exports.run = async (bot, message, args) => {
  const diamond = bot.emojis.cache.get("706515264451117109");
  let amount = args[1];
  if(!amount) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("This Command Is Used Like This \`+deposit [amount]\`!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(isNaN(amount)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Amount Should Be A Number!**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(amount < 1) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Amount Should Be Greater Than 0!**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(amount.startsWith("-")) return message.channel.send(new Discord.MessageEmbed().setTitle("Invalid Arguement!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(amount != Math.floor(amount)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Amount Should Be A Whole Number Greater Than 0!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  let userInfo = `SELECT * FROM userdb WHERE userId = ?`;
  db.get(userInfo, [message.author.id], (err, row) => {
    if (err) {
      console.log(err);
      return;
    }
    if(row === undefined){
      return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("You Are Not Registered!").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    } else{
        if(row.bal < amount) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Don't Have That Much Money In Your Hand!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        db.all(`UPDATE userdb SET bal = bal - "${amount}" WHERE userId = '${message.author.id}'`)
        db.all(`UPDATE userdb SET bankbal = bankbal + "${amount}" WHERE userId = '${message.author.id}'`)
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**${amount}${diamond} Has Been Deposited In Your Bank!**`).setFooter(message.guild.me.displayName).setColor(0xff7d00).setTimestamp())
    }
  });
  
};

module.exports.config = {
    name: "deposit",
    description: "A Command To Deposit Your Balance In Your Bank!",
    usage: "+deposit [amount]",
    accessableby: "Members",
    aliases: ["dep"]
}
