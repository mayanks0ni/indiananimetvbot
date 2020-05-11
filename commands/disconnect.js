const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, queue) => {
  if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setTitle("You Should Be In A Voice Channel To Use That Command!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(!message.guild.me.voice.channel) return message.channel.send(new Discord.MessageEmbed().setTitle("I am Not In Any Voice Channel Currently!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  message.member.voice.channel.leave();
  queue.delete(message.guild.id);
  message.channel.send(new Discord.MessageEmbed().setTitle("🛑 Player Has Been Stopped And Disconnected! 🛑").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
};

module.exports.config = {
    name: "disconnect",
    description: "A Command Disconnect The Bot From The VC!",
    usage: "+disconnect",
    accessableby: "Members",
    aliases: ["dc"]
}
