const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, queue) => {
  const serverQueue = queue.get(message.guild.id);
  if(!message.member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setTitle("You Should Be In A Voice Channel To Use That Command!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
  if(!message.guild.me.voice.channel) return message.channel.send(new Discord.MessageEmbed().setTitle("I am Not In Any Voice Channel Currently!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
  if(!serverQueue.songs[1]) return message.channel.send(new Discord.MessageEmbed().setTitle("There Are No Songs To Skip!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
  serverQueue.connection.dispatcher.end();
  message.channel.send(new Discord.MessageEmbed().setTitle(`⏩ Skipped \`${serverQueue.songs[0].title}\` ⏩`).setColor(0xff6200).setFooter("IAT Bot").setTimestamp());
};

module.exports.config = {
    name: "skip",
    description: "A Command To Skip The Current Song Only If There Is Next Song Available!",
    usage: "+skip",
    accessableby: "Members",
    aliases: [""]
}
