const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, queue) => {
  const serverQueue = queue.get(message.guild.id);
  if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setTitle("You Should Be In A Voice Channel To Use That Command!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(!message.guild.me.voice.channel) return message.channel.send(new Discord.MessageEmbed().setTitle("I am Not In Any Voice Channel Currently!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(!serverQueue.songs[0]) return message.channel.send(new Discord.MessageEmbed().setTitle("There Are No Songs To Resume!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  serverQueue.connection.dispatcher.resume();
  message.channel.send(new Discord.MessageEmbed().setTitle(`▶️ Resumed \`${serverQueue.songs[0].title}\` ▶️`).setColor(0x00ffc1).setFooter(message.guild.me.displayName).setTimestamp());
};

module.exports.config = {
    name: "resume",
    description: "A Command To Resume The Current Song!",
    usage: "+resume",
    accessableby: "Members",
    aliases: [""]
}
