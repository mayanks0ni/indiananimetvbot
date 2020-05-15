const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, queue) => {
  const serverQueue = queue.get(message.guild.id);
  if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setTitle("You Should Be In A Voice Channel To Use That Command!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(!message.guild.me.voice.channel) return message.channel.send(new Discord.MessageEmbed().setTitle("I am Not In Any Voice Channel Currently!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  if(!serverQueue) return message.channel.send(new Discord.MessageEmbed().setTitle("There's Nothing Playing Right Now!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  let title;
  if(serverQueue.songs[1]){
    title = serverQueue.songs[1].title;
  }else{
    title = "None";
  }

  message.channel.send(new Discord.MessageEmbed().setTitle(`Currently Playing \n\`${serverQueue.songs[0].title}\`!`).addField("**Upcoming**", `\`${title}\``).setColor(0xc5ff00).setFooter(message.guild.me.displayName).setTimestamp());
};

module.exports.config = {
    name: "nowplaying",
    description: "A Command To View The Song Playing Currently!",
    usage: "+nowplaying",
    accessableby: "Members",
    aliases: ["np", "currentsong"]
}
