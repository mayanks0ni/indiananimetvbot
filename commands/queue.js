const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, queue) => {
  const serverQueue = queue.get(message.guild.id);
  if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setTitle("You Should Be In A Voice Channel To Use That Command!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
  if(!message.guild.me.voice.channel) return message.channel.send(new Discord.MessageEmbed().setTitle("I am Not In Any Voice Channel Currently!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
  if(!serverQueue) return message.channel.send(new Discord.MessageEmbed().setTitle("There Are No Songs In The Queue!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
  if(!serverQueue.songs[1]) return message.channel.send(new Discord.MessageEmbed().setTitle("There's Nothing Playing!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());

  message.channel.send(new Discord.MessageEmbed().setTitle(`🎶 Queued Songs 🎶`).setDescription(`${serverQueue.songs.map(queueSong => `** - ** **${queueSong.title}**`).join("\n")}`).setColor(0x00ffc1).setFooter("IAT Bot").setTimestamp());
};

module.exports.config = {
    name: "queue",
    description: "A Command To View The Queue!",
    usage: "+queue",
    accessableby: "Members",
    aliases: ["q"]
}
