const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, queue) => {
  const serverQueue = queue.get(message.guild.id);
  if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setTitle("You Should Be In A Voice Channel To Use That Command!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(!message.guild.me.voice.channel) return message.channel.send(new Discord.MessageEmbed().setTitle("I am Not In Any Voice Channel Currently!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(!serverQueue.songs[0]) return message.channel.send(new Discord.MessageEmbed().setTitle("There Are No Songs To Pause!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  serverQueue.connection.dispatcher.pause();
  message.channel.send(new Discord.MessageEmbed().setTitle(`⏸️ Paused \`${serverQueue.songs[0].title}\` ⏸️`).setColor(0x86ff00).setFooter(message.guild.me.displayName).setTimestamp());
};

module.exports.config = {
    name: "pause",
    description: "A Command To Pause The Current Song!",
    usage: "+pause",
    accessableby: "Members",
    aliases: [""]
}
