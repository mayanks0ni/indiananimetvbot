const Discord = module.require("discord.js");
const superagent = require('superagent');

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
      .query({ type: 'hentai_anal' })
      .end((err, response) => {
        const hentai = new Discord.MessageEmbed()
          .setAuthor(`Hentai Images for ${message.author.username}!`)
          .setImage(response.body.message)
          .setTimestamp()
          .setColor("RANDOM")
          .setFooter('IAT Bot')
        message.channel.send(hentai);
      });
  } else {
    const notnsfw = new Discord.MessageEmbed()
      .setTitle('This channel is not a nsfw channel!!')
      .setTimestamp()
      .setFooter('IAT Bot')
      .setColor(0xfa0202)
    message.channel.send(notnsfw);
  }
};

module.exports.config = {
  name: "hentai",
  description: "A Command To View Hentai Images!",
  usage: "+hentai",
  accessableby: "Members",
  aliases: [""]
}
