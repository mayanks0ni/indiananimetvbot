const Discord = module.require("discord.js");
const superagent = require('superagent')
module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
      .query({ type: 'pussy' })
      .end((err, response) => {
        const pussy = new Discord.MessageEmbed()
          .setAuthor(`Pussy Images for ${message.author.username}!`)
          .setImage(response.body.message)
          .setTimestamp()
          .setColor("RANDOM")
          .setFooter('IAT Bot')
        message.channel.send(pussy);
      });
  } else {
    const notnsfw = new Discord.MessageEmbed()
      .setTitle('This channel is not a NSFW channel!!')
      .setColor(0xfa0202)
      .setTimestamp()
      .setFooter('IAT Bot')
    message.channel.send(notnsfw);
  }
};

module.exports.config = {
  name: "pussy",
  description: "A Command To View Pussy Images!",
  usage: "+pussy",
  accessableby: "Members",
  aliases: [""]
}
