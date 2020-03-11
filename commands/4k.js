const Discord = module.require("discord.js");
const superagent = require('superagent');

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
      .query({ type: '4k' })
      .end((err, response) => {
        const fourk = new Discord.MessageEmbed()
          .setAuthor(`4k Images for ${message.author.username}!`)
          .setImage(response.body.message)
          .setTimestamp()
          .setColor("RANDOM")
          .setFooter('IAT Bot')
        message.channel.send(fourk);
      });
  } else {
    const notnsfw = new Discord.MessageEmbed()
      .setTitle('This channel is not a nsfw channel!!')
      .setTimestamp()
      .setColor(0xfa0202)
      .setFooter('IAT Bot')
    message.channel.send(notnsfw);
  }
};

module.exports.config = {
  name: "4k",
  description: "A Command To View 4k Nudes!",
  usage: "+4k",
  accessableby: "Members",
  aliases: [""]
}
