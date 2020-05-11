const Discord = module.require("discord.js");
const superagent = require('superagent');

module.exports.run = async (bot, message, args) => {
  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
      .query({ type: 'hanal' })
      .end((err, response) => {
        const hanal = new Discord.MessageEmbed()
          .setAuthor(`Hentai Anal Images for ${message.author.username}!`)
          .setImage(response.body.message)
          .setTimestamp()
          .setColor("RANDOM")
          .setFooter(message.guild.me.displayName)
        message.channel.send(hanal);
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
  name: "hanal",
  description: "A Command To View Hentai Anal Images!",
  usage: "+hanal",
  accessableby: "Members",
  aliases: ["hentaianal"]
}
