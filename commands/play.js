const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const { YTSearcher } = require('ytsearcher');

module.exports.run = async(bot, message, args, queue, play) => {
  const link = args.slice(1).join(" ");
  const searcher = new YTSearcher({
    key:'AIzaSyCbGU28WM6ljX5k9RW0HPBcvXPMnL4jme0',
    revealkey: true
  })

  let result = await searcher.search(link, { type: 'video' });
  console.log(result.first);
  if (message.member.voice.channel) {
  const serverQueue = queue.get(message.guild.id);
  const info1 = await ytdl.getInfo(result.first.url)
  var date = new Date(0);
  date.setSeconds(info1.length_seconds);
  var timeString = date.toISOString().substr(11, 8);
  console.log(timeString);

  const queueSong = {
      title: result.first.title,
      url: result.first.url,
      thumbnail: result.first.thumbnails.high.url,
      channel: result.first.channelTitle,
      requestedby: message.author.tag,
      duration: timeString
  }
if(!serverQueue) {
  const queueContruct = {
      textChannel: message.channel,
      voiceChannel: message.member.voice.channel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    message.channel.send(new Discord.MessageEmbed().setTitle(`✅ Connected To \`${message.member.voice.channel.name}\`! ✅`).setColor(0xff008b).setFooter(message.guild.me.displayName).setTimestamp());
  message.channel.send(new Discord.MessageEmbed().setAuthor(`Song Queued`, `https://cdn.discordapp.com/attachments/564520348821749766/696334217205907516/giphy.gif`).addField("**Queued**", `**[${result.first.title}](${result.first.url})**`).setColor("YELLOW").setFooter(message.guild.me.displayName).setTimestamp());
  queueContruct.songs.push(queueSong)
  queue.set(message.guild.id, queueContruct);
  try{
    var connection = await message.member.voice.channel.join();
    queueContruct.connection = connection;
    play(message.guild, queueContruct.songs[0]);

 } catch (err) {
   console.log(err);
   queue.delete(message.guild.id);
   message.channel.send(`\`${err}\``);
 }
} else {
  message.channel.send(new Discord.MessageEmbed().setAuthor(`Song Queued`, `https://cdn.discordapp.com/attachments/564520348821749766/696334217205907516/giphy.gif`).addField("**Queued**", `**[${result.first.title}](${result.first.url})**`).setColor("YELLOW").setFooter(message.guild.me.displayName).setTimestamp());
  serverQueue.songs.push(queueSong);
    }
    } else {
      return message.channel.send(new Discord.MessageEmbed().setTitle("You Need To Be In A Voice Channel To Use That Command!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
    }
}
module.exports.config = {
  name: "play",
  description: "A Command To Play Songs!",
  usage: "+play [name]",
  accessableby: "Members",
  aliases: ["p"]
}
