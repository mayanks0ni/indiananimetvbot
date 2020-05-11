const Discord = module.require("discord.js");
const sqlite = require("sqlite3").verbose();

module.exports.run = async (bot, message, args) => {
  const db = new sqlite.Database("./database/userdb1.db", err=>{
    if(err) console.log(err);
  });

  const trans = new sqlite.Database("./database/transactions.db", err => {
      if(err) console.error(err);
    });

  const diamond = bot.emojis.cache.get("706515264451117109");

  let amount = args[2];
  let ht = args[1]
  let htList = ["h", "t", "h", "t"]
  let ch;
  let image;

  if(!amount || isNaN(amount) || !htList.includes(ht) || !ht) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This \`+coinflip h|t [amount]\`!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(amount < 1) return message.channel.send(new Discord.MessageEmbed().setTitle("The Amount Should Be Greater Than 0!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
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
    let chance = htList[Math.floor(Math.random() * htList.length)]
    console.log(chance);
    if(chance === ht){
      if(chance === "h"){
        ch = "Heads"
        image = "https://cdn.discordapp.com/attachments/564520348821749766/707182326668460092/1588675642028.png"
      }else if(chance === "t"){
        ch = "Tails"
        image = "https://cdn.discordapp.com/attachments/564520348821749766/707182327238754344/1588675597299.png"
      }
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Flipped ${ch}!\nYou Won ${amount*2}${diamond}**`).setImage(image).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
      db.all(`UPDATE userdb SET bal = bal + '${amount}' WHERE userId = '${message.author.id}'`)
      trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Won In Coin Flip!", '+${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
    }else{
      if(chance === "h"){
        ch = "Heads"
        image = "https://cdn.discordapp.com/attachments/564520348821749766/707182326668460092/1588675642028.png"
      }else if(chance === "t"){
        ch = "Tails"
        image = "https://cdn.discordapp.com/attachments/564520348821749766/707182327238754344/1588675597299.png"
      }
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription(`**You Flipped ${ch}!\nYou Lost ${amount}${diamond}**`).setImage(image).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
      db.all(`UPDATE userdb SET bal = bal - '${amount}' WHERE userId = '${message.author.id}'`)
      trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Lost In Coin Flip!", '-${amount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
    }
  }
  });
db.close();
};

module.exports.config = {
    name: "coinflip",
    description: "A Command To Gamble Coins By Flipping Coin!",
    usage: "+coinflip h|t [amount]",
    accessableby: "Members",
    aliases: ["flip", "cf"]
}
