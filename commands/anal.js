const Discord = module.require("discord.js");
const superagent = require('superagent');
const info = require("../info.json");

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
      .query({ type: 'anal' })
      .end((err, response) => {
        const anal = new Discord.MessageEmbed()
          .setAuthor(`Anal Images for ${message.author.username}!`)
          .setImage(response.body.message)
          .setTimestamp()
          .setColor("RANDOM")
          .setFooter(message.guild.me.displayName)
        message.channel.send(anal);
      });
  } else {
    const notnsfw = new Discord.MessageEmbed()
      .setTitle('**This channel is not a NSFW channel!!**')
      .setTimestamp()
      .setColor(0xfa0202)
      .setFooter(message.guild.me.displayName)
    message.channel.send(notnsfw);
  }
};

module.exports.config = {
  name: "anal",
  description: "A Commamd To View Anal Images!",
  usage: `${info.prefix}anal`,
  accessableby: "Members",
  aliases: ["an"]
}
