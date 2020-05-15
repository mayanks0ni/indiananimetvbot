const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, queue) => {
  let vol = args[1];
  const serverQueue = queue.get(message.guild.id);
  if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setTitle("You Should Be In A Voice Channel To Use That Command!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(!message.guild.me.voice.channel) return message.channel.send(new Discord.MessageEmbed().setTitle("I am Not In Any Voice Channel Currently!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(!vol) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This \`+vol [volume]\`!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(isNaN(vol) || vol > 100 || vol < 0) return message.channel.send(new Discord.MessageEmbed().setTitle("Please Enter A Valid Number Between 0 and 100!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  try {
    serverQueue.connection.dispatcher.setVolumeLogarithmic(vol / 100);
  } catch (e) {
    console.log(e);
    message.channel.send(new Discord.MessageEmbed().setTitle("There Was An Error In Setting That Volume!\nMake Sure That Volume Level Is Between 0 and 100.").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp())
  }
  message.channel.send(new Discord.MessageEmbed().setTitle(`🔊 Changed The Volume To \`${vol}\` 🔊`).setColor(0x4f00ff).setFooter(message.guild.me.displayName).setTimestamp());
};

module.exports.config = {
    name: "volume",
    description: "A Command Set The Volume Of The Song!",
    usage: "+volume [volume]",
    accessableby: "Members",
    aliases: ["vol"]
}
