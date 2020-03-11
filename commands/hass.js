const Discord = module.require("discord.js");
const superagent = require('superagent');

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
      .query({ type: 'hass' })
      .end((err, response) => {
        const hass = new Discord.MessageEmbed()
          .setAuthor(`Hentai Ass Images for ${message.author.username}!`)
          .setImage(response.body.message)
          .setTimestamp()
          .setColor("RANDOM")
          .setFooter('IAT Bot')
        message.channel.send(hass);
      });
  } else {
    const notnsfw = new Discord.MessageEmbed()
      .setTitle('**This channel is not a NSFW channel!!**')
      .setTimestamp()
      .setColor(0xfa0202)
      .setFooter('IAT Bot')
    message.channel.send(notnsfw);
  }
};

module.exports.config = {
  name: "hass",
  description: "A Command To View Hentai Ass Images!",
  usage: "+hass",
  accessableby: "Members",
  aliases: ["hentaiass"]
}
