const translate = require('@vitalets/google-translate-api');
const Discord = require("discord.js");

module.exports.run = async(bot,message,args) => {
  const toLanguage = args[1];
  const text = args.slice(2).join(" ");
  if(!toLanguage || !text) return message.channel.send(new Discord.MessageEmbed().setTitle("Error!").setDescription("This Command Is Used Like This \`+translate [to language] [text]\`").setFooter("IAT Bot").setColor(0xff0000).setTimestamp());
    translate(text, {to: toLanguage}).then(res => {
     const translation = new Discord.MessageEmbed()
     .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
     .setTitle("Translation!")
     .addField("**From**", `${res.from.language.iso.toUpperCase()}`)
     .addField("**To**", `${toLanguage.toUpperCase()}`)
     .addField("**Tranlation**", `${res.text}`)
     .setThumbnail(bot.user.displayAvatarURL())
     .setFooter("IAT Bot", bot.user.displayAvatarURL())
     .setColor("RANDOM")
     .setTimestamp()
     message.channel.send(translation);
  }).catch(err => {
    return message.channel.send(new Discord.MessageEmbed().setTitle("Error!").setDescription(`**${err}**`).setFooter("IAT Bot").setColor(0xff0000).setTimestamp());
      console.error(err);
  });
}

module.exports.config = {
  name: "translate",
  description: "A Command To Translate The Provided Text Into Desired Language!",
  usage: "+translate [to language] [text]",
  accessableby: "Members",
  aliases: ["trans"]
}
