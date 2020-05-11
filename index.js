const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const Canvas = require("canvas");
const fetch = require("node-fetch");
const PREFIX = "+";
const queue = new Map();
const ytdl = require("ytdl-core");
const server = require("./server.js");
const opts = {
  format: "bestaudio/best",
  outtmpl: "%(extractor)s-%(id)s-%(title)s.%(ext)s",
  restrictfilenames: true,
  noplaylist: true,
  nocheckcertificate: true,
  ignoreerrors: false,
  logtostderr: false,
  quiet: true,
  no_warnings: true,
  default_search: "auto",
  source_address: "0.0.0.0",
  usenetrc: true
};

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) {
    console.error(err);
  }

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    console.log("No files found!!");
  }

  console.log(`Loaded ${jsfiles.length} commands`);

  jsfiles.forEach((f, i) => {
    let pull = require(`./commands/${f}`);
    bot.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach(alias => {
      bot.aliases.set(alias, pull.config.name);
    });
  });
});

const db = new sqlite.Database("./database/xp.db", err => {
  if(err) console.error(err);
});

bot.on("ready", () => {
  console.log("The bot is online!");
  bot.user.setActivity("+help", { type: "LISTENING" });
});

bot.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.cache.find(
    channel => channel.name === "〢join-leave"
  );
  if (!channel) return;
  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/564520348821749766/689123263464341680/welcome-image.png"
  );

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.font = "28px Segoe Print";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    "Welcome To The Server,",
    canvas.width / 2.5,
    canvas.height / 3.5
  );

  ctx.fillStyle = "#ffffff";
  ctx.fillText(
    `${member.displayName}! \nYou Are The \n${member.guild.memberCount}th Member!`,
    canvas.width / 2.5,
    canvas.height / 1.8
  );

  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })
  );
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );
  channel.send(`<@${member.id}> Welcome To ${member.guild.name}!`, attachment);
});

bot.on("guildMemberRemove", member => {
  const channel1 = member.guild.channels.cache.find(
    channel => channel.name === "〢join-leave"
  );
  if (!channel1) return;
  const leaveembed = new Discord.MessageEmbed()
    .setDescription(
      `${member}, has left the server 🙁. Hope you'll be back soon!`
    )
    .setColor(0x3dffcf);
  channel1.send(leaveembed);
});

bot.on("message", async message => {
  if (message.channel.id === "582850962121687045") {
    let menrole = message.guild.roles.cache.find(r => r.name === "Anime Squad");
    if (message.content.startsWith("Hey")) {
      message.channel.send(`${menrole}`);
    }
  } else {
    if (message.author.bot || message.channel.type === "dm") return;
    if (message.channel.id === "684369914810597376") {
      let msg = message.content;
      const url = `https://some-random-api.ml/chatbot?message=${msg}`;
      let res;
      res = await fetch(url).then(url => url.json());
      message.channel.send(res.response);
    } else {
      let addXp = Math.floor(Math.random() * 7) + 8;
    db.get(`SELECT * FROM xp WHERE userId = '${message.author.id}'`, (err, rows)=>{
      if(err){
        console.error(err);
        return;
      }
      if(rows === undefined){
       return db.all(`INSERT INTO xp(userId, xp, level) VALUES('${message.author.id}', 0, "Newbie")`)
      }else{
        db.all(`UPDATE xp SET xp = xp + '${addXp}' WHERE userId = '${message.author.id}'`);
	}
	if(rows.xp > 1000){
        db.all(`UPDATE xp SET level = "Rookie" WHERE userId = '${message.author.id}'`);
	  }
      if(rows.xp > 5000){
		db.all(`UPDATE xp SET level = "The Insider" WHERE userId = '${message.author.id}'`);
	  }
	  if(rows.xp > 10000){
		db.all(`UPDATE xp SET level = "The Elite" WHERE userId = '${message.author.id}'`);
	  }
    });
      let msgArray = message.content.split(/\s+/g);
      let cmd = msgArray[0];
      let args = message.content.substring(PREFIX.length).split(" ");
      if (!message.content.startsWith(PREFIX)) return;
      if (message.channel.type === "dm") return;
      let commandfile =
        bot.commands.get(cmd.slice(PREFIX.length)) ||
        bot.commands.get(bot.aliases.get(cmd.slice(PREFIX.length)));
      if (commandfile) commandfile.run(bot, message, args, queue, play);
    }
  }
});

function play(guild, queueSong) {
  const serverQueue = queue.get(guild.id);
  if (!queueSong) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    serverQueue.textChannel.send(
      new Discord.MessageEmbed()
        .setTitle("I Left The Voice Channel As There Weren't Any Songs!")
        .setColor(0xff0000)
        .setFooter("IAT Bot")
        .setTimestamp()
    );
    return;
  }
  const dispatcher = serverQueue.connection
    .play(ytdl(queueSong.url, opts))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  let title;
  if (serverQueue.songs[1]) {
    title = serverQueue.songs[1].title;
  } else {
    title = "None";
  }
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(
    new Discord.MessageEmbed()
      .setAuthor(
        `Started Playing`,
        `https://cdn.discordapp.com/attachments/564520348821749766/696332404549222440/4305809_200x130..gif`
      )
      .addField("**Title**", `**[${queueSong.title}](${queueSong.url})**`)
      .addField("**Channel Name**", `${queueSong.channel}`)
      .addField("**Duration**", `${queueSong.duration}`)
      .addField("**Requested By**", `${queueSong.requestedby}`)
      .addField("**Upcoming**", `${title}`)
      .setThumbnail(queueSong.thumbnail)
      .setFooter("IAT Bot")
      .setTimestamp()
      .setColor("GREEN")
  );
}

bot.login(process.env.BOT_TOKEN);
