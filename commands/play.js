const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async(bot, message, args) => {
  if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const dispatcher = connection.play(ytdl(`https://www.youtube.com/watch?v=PT2_F-1esPk`, {'format': 'bestaudio',
    'outtmpl': './Data/%(title)s.%(ext)s',
    'restrictfilenames': true,
    'skip_download': 'no',
    'forceurl': 'yes',
    'noplaylist': true,
    'nocheckcertificate': true,
    'ignoreerrors': false,
    'logtostderr': false,
    'quiet': true,
    'no_warnings': true,
    'default_search': 'auto',
    'source_address': '0.0.0.0',
    'filter': 'audioonly',
    'quality': 'highestaudio',}));
      dispatcher.on('finish', () => {
        dispatcher.destroy();

        console.log("left vc");
      })
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
