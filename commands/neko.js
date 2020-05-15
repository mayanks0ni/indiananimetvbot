const Discord = module.require("discord.js");
const superagent = require("superagent");
const {prefix} = require("../info.json");
let sqlite = require("sqlite3");

module.exports.run = async (bot, message, args) => {
  let db = new sqlite.Database("./database/userdb1.db", err=>{
    if(err) console.error(err);
  });
  db.get(`SELECT * FROM userdb WHERE userId = '${message.author.id}'`,async (err, rows)=> {
    if(rows === undefined) return message.channel.send(new Discord.MessageEmbed().setTitle("You Need To Register An Account And Buy Premium Membership To Use This Command!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
    if(rows.pnsfw === "no") return message.channel.send(new Discord.MessageEmbed().setTitle("You Need To Buy Premium NSFW In Order To Use This Command!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
	if (!message.channel.nsfw) {
    const notnsfw = new Discord.MessageEmbed()
			.setDescription('**This is not a NSFW Channel!**')
			.setFooter(message.guild.me.displayName)
			.setTimestamp()
			.setColor(0xff0000)
		message.channel.send(notnsfw);
	} else {

		let { body } = await superagent
			.get(`https://nekos.life/api/v2/img/nsfw_neko_gif`);

		let boobembed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setTitle(`Neko NSFW GIF For ${message.author.username}!`)
			.setImage(body.url)
			.setTimestamp()
			.setFooter(message.guild.me.displayName)
		message.channel.send(boobembed);
	}
});
db.close();

};

module.exports.config = {
	name: "neko",
	description: "A Command To Get Neko NSFW Gif!",
	usage: `${prefix}neko`,
	accessableby: "Members",
	aliases: [""]
}
