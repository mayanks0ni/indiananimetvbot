const Discord = module.require("discord.js");
const sqlite = require("sqlite3").verbose();

module.exports.run = async (bot, message, args) => {
  const db = new sqlite.Database("./database/userdb1.db", err=>{
      if(err) console.log(err);
    });
    const diamond = bot.emojis.cache.get("706515264451117109");
  let userid = message.author.id;
  db.get(`SELECT * FROM userdb WHERE userId = '${message.author.id}'`,  (err, row) => {
    if (err) throw err;
			let sql;

			if(row === undefined){
        sql = `INSERT INTO userdb(userId, bal, bankbal, daily, premium, pnsfw) VALUES('${message.author.id}','500', '0', '', 'no', 'no')`
     db.all(sql, async err =>{
       setTimeout(async function(){
        const loading = await message.channel.send(new Discord.MessageEmbed().setAuthor("Please Wait...", `https://cdn.discordapp.com/emojis/653955849164685322.gif`).setFooter(message.guild.me.displayName).setColor("ORANGE").setTimestamp());
        const registered = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setTitle("Registered You On The Database!")
        .addField("Name", `${message.author.tag}`)
        .addField("ID", `${message.author.id}`)
        .addField("Balance", `500${diamond}`)
        .addField("Bank Balance", `0${diamond}`)
        .setFooter(message.guild.me.displayName)
        .setColor("GREEN")
        .setTimestamp()
        loading.edit(registered);
       }, 4000);
         if(err) throw err;
     })
			}
			else{
				return message.channel.send(new Discord.MessageEmbed().setDescription("**You Are Already Registered!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
      }
});
  db.close();
};

module.exports.config = {
    name: "register",
    description: "A Command To Regiter Your Account In The Database!",
    usage: "+register",
    accessableby: "Members",
    aliases: [""]
}
