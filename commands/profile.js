const Discord = module.require("discord.js");
const sqlite = require("sqlite3");
const info = require("../info.json");
const Canvas = require("canvas");
const tr = require("transliteration").transliterate;

module.exports.run = async (bot, message, args) => {
    const diamond = bot.emojis.cache.get("706515264451117109");
  Canvas.registerFont("./assets/LEMONMILK-BoldItalic.otf", {family: "lemon"})
    const canvas = Canvas.createCanvas(1440, 1080);
    const ctx = canvas.getContext("2d");
  const user = message.author;

  const user2 = user.displayAvatarURL({format: 'png', dynamic: true, size: 1024})
    const db = new sqlite.Database("./database/userdb1.db", err => {
        if (err) console.log(err);
      });
      const db1 = new sqlite.Database("./database/xp.db", err => {
        if(err) console.error(err);
      });

      let sender = message.author.id;
      let senderData = {};
      db.each("SELECT * FROM userdb", (err, row) => {
        if(row.userId == sender) {
          senderData["userid"] = row.userId;
          senderData["bal"] = row.bal;
          senderData["bank"] = row.bankbal;
          senderData["premium"] = row.premium;
        }
      }, async() => {
        if(Object.keys(senderData).length != 0) {
            let name = tr(message.author.tag)
            db1.get(`SELECT * FROM xp WHERE userId = '${message.author.id}'`, async(err, rows)=>{
              if(rows === undefined) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Not Registered Or An Error Try Again..!**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000))
              const background = await Canvas.loadImage("./assets/20200510_152851.png")

               ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
               ctx.strokeStyle = '#faf9f9';
             	ctx.strokeRect(0, 0, canvas.width, canvas.height);

              ctx.strokeStyle = '#faf9f9';
              ctx.strokeRect(0, 0, canvas.width, canvas.height);

              ctx.font = '62px lemon'
              ctx.fillStyle = '#ffffff'
              ctx.fillText(`${name}`, 376, 296)

              ctx.font = '62px lemon'
              ctx.fillStyle = '#ffffff'
              ctx.fillText(`${rows.xp}`, 320, 447)

              ctx.font = '62px lemon'
              ctx.fillStyle = '#ffffff'
              ctx.fillText(`${senderData.bal}`, 499, 600)

              ctx.font = '62px lemon'
              ctx.fillStyle = '#ffffff'
              ctx.fillText(`${rows.level}`, 381, 754)

              const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png')
            message.channel.send(attachment);
        });
        db1.close();
         } else {
          message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Not Registered!**").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
        }
    });
db.close();
};

module.exports.config = {
    name: "profile",
    description: "A Command To View Your Profile!",
    usage: `${info.prefix}profile`,
    accessableby: "Members",
    aliases: [""]
}
