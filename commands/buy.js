const Discord = require("discord.js");
const sqlite = require("sqlite3");

module.exports.run = async(bot, message, args) => {
  const diamond = bot.emojis.cache.get("706515264451117109");
  const tada = bot.emojis.cache.get("706822382089666570");
let shopDB = new sqlite.Database("./database/shop.db", err => {
  if(err) console.error(err);
});

let db = new sqlite.Database("./database/userdb1.db", err => {
  if(err) console.error(err);
});

let pShop = new sqlite.Database("./database/pshop.db", err =>{
  if(err) console.error(err);
});

let itemShop = new sqlite.Database("./database/itemshop.db", sqlite.OPEN_CREATE | sqlite.OPEN_READWRITE, err => {
  if(err) console.error(err);
});

const trans = new sqlite.Database("./database/transactions.db", err => {
    if(err) console.error(err);
  });
let toBuy = args[1];
let toBuyList = ["role", "item", "premium"];
let sender = message.author.id;
let senderData = {};
const index = args[2];
if(!toBuyList.includes(toBuy) || !args[1] || !index || isNaN(index)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("This Command Is Used Like This \`+buy role|item|premium [index]\`!").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
db.each("SELECT * FROM userdb", (err, row) => {
if(row.userId == sender) {
  senderData["userid"] = row.userId;
  senderData["bal"] = row.bal;
  senderData["premium"] = row.premium;
  senderData["pnsfw"] = row.pnsfw;
}
}, () => {
if(Object.keys(senderData).length != 0) {
  if(args[1] === "role"){
  shopDB.get(`SELECT * FROM roleshop WHERE guildid = '${message.guild.id}' AND id = '${index}'`, (err, rows) => {
    if(rows === undefined) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Invalid Index!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    if(message.member.roles.cache.find(r => r.name === rows.role)) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Already Have That Role!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    if(senderData.bal < rows.price) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Don't Have That Much Money In Your Hand!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    const role1 = message.guild.roles.cache.find(r => r.name === rows.role);
    if(!role1) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Role Not Found!\nPlease Ask The Owner To Add The Role Again!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    db.all(`UPDATE userdb SET bal = bal - '${rows.price}' WHERE userId = '${message.author.id}'`)
    trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Bought Role ${rows.role}!", '-${rows.price}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
    message.member.roles.add(role1)
    message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Transaction Successful! ${tada}`).addField("**Role Bought:**", `**${rows.role}**`).addField("**Cost**", `**${rows.price}${diamond}**`).setThumbnail(bot.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
    })
  }else if(args[1] === "item"){
    if(index === "1"){
      itemShop.get(`SELECT * FROM itemshop WHERE id = 1`, (err, rows) => {
        if(rows === undefined) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Invalid Index!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        if(senderData.bal < rows.price) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Don't Have That Much Money In Your Hand!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        db.all(`UPDATE userdb SET bal = bal - '${rows.price}' WHERE userId = '${message.author.id}'`)
        const gotAmount = Math.floor(Math.random() * 6000);
        db.all(`UPDATE userdb SET bal = bal + '${gotAmount}' WHERE userId = '${message.author.id}'`)
        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Bought Item ${rows.item}!", '-${rows.price}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Received From Chest Of Money!", '+${gotAmount}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Transaction Successful! ${tada}`).addField("**Item Bought:**", `**${rows.item}**`).addField("**Cost**", `**${rows.price}${diamond}**`).setThumbnail(bot.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp()).then(
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Congratulations! You Got ${gotAmount}${diamond} From The Chest Of Money!`).setThumbnail(bot.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp()));

        })
    }else if(index === "2"){
      itemShop.get(`SELECT * FROM itemshop WHERE id = 2`, (err, rows) => {
        if(rows === undefined) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Invalid Index!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        if(senderData.premium === "yes") return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Already Have Premium Membership!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        if(senderData.bal < rows.price) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Don't Have That Much Money In Your Hand!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        db.all(`UPDATE userdb SET bal = bal - '${rows.price}' WHERE userId = '${message.author.id}'`)
        db.all(`UPDATE userdb SET premium = "yes" WHERE userId = '${message.author.id}'`)
        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Bought Item ${rows.item}!", '-${rows.price}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Transaction Successful! ${tada}`).addField("**Item Bought:**", `**${rows.item}**`).addField("**Cost**", `**${rows.price}${diamond}**`).setThumbnail(bot.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp()).then(
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Congratulations! ${tada}`).setDescription(`**You Successfully Bought Premium Membership And Got The Following Advantages -**\n\n\`\`\`- Access To Google Search Command!\n- 700 Diamonds As Daily Reward!\n- Access To Premium Shop!\`\`\`\n **\n Enjoy!!**`).setThumbnail(bot.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("YELLOW").setTimestamp()));
      });
    }else{
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Invalid Index!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    }
  }else if(args[1] === "premium"){
    if(senderData.premium === "yes"){
    if(index === "1"){
      pShop.get(`SELECT * FROM pshop WHERE id = 1`, (err, rws) => {
        if(rws === undefined) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Invalid Index!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        if(senderData.pnsfw === "yes") return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Already Have Premium NSFW Access!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        if(senderData.bal < rws.price) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Don't Have That Much Money In Your Hand!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        db.all(`UPDATE userdb SET bal = bal - '${rws.price}' WHERE userId = '${message.author.id}'`)
        db.all(`UPDATE userdb SET pnsfw = "yes" WHERE userId = '${message.author.id}'`)
        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Bought Item ${rws.item}!", '-${rws.price}', '${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}', '${message.author.id}')`)
        message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Transaction Successful! ${tada}`).addField("**Item Bought:**", `**${rws.item}**`).addField("**Cost**", `**${rws.price}${diamond}**`).setThumbnail(bot.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp()).then(
        message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Congratulations! ${tada}`).setDescription("**You Successfully Bought Premium NSFW And Got Access To Following Commands!**\n\n\`\`\`- rhentai\n- cum\n- neko\`\`\`\n **All Commands Will Send GIFs For Sure!\n Enjoy!!**").setThumbnail(bot.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp()));
      });
    }else{
      message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Invalid Index!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    }
  }else{
    message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Need To Buy Premium Membership To Use This Command!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
  }
  }
}
else {
  message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("You Are Not Registered!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
}

})
}
module.exports.config = {
      name: "buy",
      description: "A Command To Buy Items From The Shop!",
      usage: "+buy role|item|premium [index]",
      accessableby: "Members",
      aliases: [""]
}
