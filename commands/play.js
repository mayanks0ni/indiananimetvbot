const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const { YTSearcher } = require('ytsearcher');

module.exports.run = async(bot, message, args) => {
  const link = args.slice(1).join(" ");
  const searcher = new YTSearcher({
    key:'AIzaSyDJK1Wt3k91HulnIk5icOMsUJzZ5_p9vp8',
    revealkey: true
  })

  let result = await searcher.search(link, { type: 'video' });
  console.log(result.first);
  if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const info = await ytdl.getInfo(result.first.url, (err, info) => {
      if(err) throw err;
    });
     const dispatcher = connection.play(ytdl(result.first.url, {'format': 'bestaudio/best',
    'outtmpl': '%(extractor)s-%(id)s-%(title)s.%(ext)s',
    'restrictfilenames': true,
    'noplaylist': true,
    'nocheckcertificate': true,
    'ignoreerrors': false,
    'logtostderr': false,
    'quiet': true,
    'no_warnings': true,
    'default_search': 'auto',
    'source_address': '0.0.0.0',
    'usenetrc': true}));
    const songI = {
      title: result.first.title,
      url: result.first.url,
      thumbnail: result.first.thumbnails.high,
      channel: result.first.channelTitle
    }
    const serverQueue = message.bot.queue.get(message.guild.id);
    if(serverQueue) {
      message.bot.queue.push(songI);
      message.channel.send("Song Queued!");
    } else{
    const songInfo = new Discord.MessageEmbed()
    .setTitle("Playing Song!")
    .addField("**Title**", result.first.title)
    .addField("**Channel Name**", result.first.channelTitle)
    .setThumbnail(result.first.thumbnails.high.url)
    .setColor("RED")
    .setFooter("IAT Bot")
    .setTimestamp()
    message.channel.send(songInfo);
      dispatcher.on('finish', () => {
        dispatcher.destroy();
        message.member.voice.channel.leave();
        console.log("left vc");
      })}
    } else {
      message.reply('You need to join a voice channel first!');
    }
}

module.exports.config = {
  name: "play",
  description: "A Command To Play Songs!",
  usage: "+play [name/link]",
  accessableby: "Members",
  aliases: [""]
}
