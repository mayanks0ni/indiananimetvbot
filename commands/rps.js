const Discord = module.require("discord.js");
const sqlite = require("sqlite3").verbose();
const info = require("../info.json");

module.exports.run = async (bot, message, args) => {
  const db = new sqlite.Database("./database/userdb1.db", err=>{
    if(err) console.log(err);
  });

  const trans = new sqlite.Database("./database/transactions.db", err => {
      if(err) console.error(err);
    });

  const diamond = bot.emojis.cache.get("706515264451117109");

  var amount = args[2];
  let uchoice = args[1];
  let choices = ["r", "p", "s"];

  if(!amount || isNaN(amount) || !uchoice || !choices.includes(uchoice)) return message.channel.send(new Discord.MessageEmbed().setTitle(`This Command Is Used Like This \`${info.prefix}rps r|p|s [amount]\`!`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(amount < 1) return message.channel.send(new Discord.MessageEmbed().setTitle("The Amount Should Be Greater Than 100!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
  if(amount != Math.floor(amount)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**The Amount Should Be A Whole Number Greater Than 0!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  let userInfo = `SELECT * FROM userdb WHERE userId = ?`;
  db.get(userInfo, [message.author.id], (err, row) => {
    if (err) {
      console.log(err);
      return;
    }
    if(row === undefined){
      return message.channel.send(new Discord.MessageEmbed().setTitle("You Are Not Registered!").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    }else{
      if(row.bal < amount) return message.channel.send(new Discord.MessageEmbed().setTitle(`You Don't Have That Much Money In Your Hand!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
      let botChoice = choices[Math.floor(Math.random() * choices.length)]
      if(uchoice === "r" && botChoice === "r"){
        message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Its A Tie We Both Chose Rock!\n✊ V/S ✊**`).setFooter(message.guild.me.displayName).setColor("BLUE").setTimestamp());
        db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Rock, Paper & Scissor!", '-${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
      }else if(uchoice === "p" && botChoice === "p"){
        message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Its A Tie We Both Chose Paper!\n✋ V/S ✋**`).setFooter(message.guild.me.displayName).setColor("BLUE").setTimestamp());
        db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Rock, Paper & Scissor!", '-${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
      }else if(uchoice === "s" && botChoice === "s"){
        message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**Its A Tie We Both Chose Scissor!\n✌️ V/S ✌️**`).setFooter(message.guild.me.displayName).setColor("BLUE").setTimestamp());
        db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Rock, Paper & Scissor!", '-${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
      }else if(uchoice === "r" && botChoice === "p"){
        message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Lost ${amount}${diamond}!\n✊ V/S ✋**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Rock, Paper & Scissor!", '-${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
      }else if(uchoice === "p" && botChoice === "r"){
        message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Won ${amount*2}${diamond}!\n✋ V/S ✊**`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
        db.all(`UPDATE userdb SET bal = bal + '${amount}' WHERE userId = '${message.author.id}'`)
        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Won In Rock, Paper & Scissor!", '+${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
      }else if(uchoice === "p" && botChoice === "s"){
        message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Lost ${amount}${diamond}!\n✋ V/S ✌️**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Rock, Paper & Scissor!", '-${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
      }else if(uchoice === "s" && botChoice === "p"){
        message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Won ${amount*2}${diamond}!\n✌️ V/S ✋**`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
        db.all(`UPDATE userdb SET bal = bal + '${amount}' WHERE userId = '${message.author.id}'`)
        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Won In Rock, Paper & Scissor!", '+${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
      }else if(uchoice === "r" && botChoice === "s"){
        message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Won ${amount*2}${diamond}!\n✊ V/S ✌️**`).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
        db.all(`UPDATE userdb SET bal = bal + '${amount}' WHERE userId = '${message.author.id}'`)
        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Won In Rock, Paper & Scissor!", '+${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
      }else if(uchoice === "s" && botChoice === "r"){
        message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Lost ${amount}${diamond}!\n✌️ V/S ✊**`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Rock, Paper & Scissor!", '-${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
      }
    }
  });
db.close();
};

module.exports.config = {
    name: "rps",
    description: "A Command To Gamble Coins By Playing Rock, Paper & Scissor!",
    usage: `${info.prefix}rps r|p|s [amount]`,
    accessableby: "Members",
    aliases: [""]
}
