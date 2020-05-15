const Discord = module.require("discord.js");
const superagent = require('superagent');
const info = require("../info.json");

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
      .query({ type: 'ass' })
      .end((err, response) => {
        const ass = new Discord.MessageEmbed()
          .setAuthor(`Ass Images for ${message.author.username}!`)
          .setImage(response.body.message)
          .setTimestamp()
          .setColor("RANDOM")
          .setFooter(message.guild.me.displayName)
        message.channel.send(ass);
      });
  } else {
    const notnsfw = new Discord.MessageEmbed()
      .setTitle('This channel is not a nsfw channel!!')
      .setTimestamp()
      .setColor(0xfa0202)
      .setFooter(message.guild.me.displayName)
    message.channel.send(notnsfw);
  }
};

module.exports.config = {
  name: "ass",
  description: "A Commamd To View Ass Images!",
  usage: `${info.prefix}ass`,
  accessableby: "Members",
  aliases: [""]
}
