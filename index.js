const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
const Canvas = require("canvas");
const fetch = require("node-fetch");
const PREFIX = ','; 

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {
	if (err){
		console.error(err);
	}	
	
	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0){
		console.log("No files found!!");
	}

	console.log(`Loaded ${jsfiles.length} commands`);

	jsfiles.forEach((f, i) => {
		let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

bot.on('ready', () =>{
	console.log('The bot is online!');
	bot.user.setActivity('+help', {type:"LISTENING"});
});

bot.on('guildMemberAdd', async member =>{
	const channel = member.guild.channels.cache.find(channel => channel.name === "〢join-leave");
	if(!channel) return;
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');


	const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/645692503902781480/680017295019737118/UyWNCe.jpg');

	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);


	ctx.font = '28px Segoe Print';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome To The Server,', canvas.width / 2.5, canvas.height / 3.5);


	
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}! \nYou Are The \n${member.guild.memberCount}th Member!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format:'png', dynamic:true, size:1024}));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
          channel.send(`<@${member.id}> Welcome To ${member.guild.name}!`, attachment); 
})

bot.on('guildMemberRemove', member =>{
	const channel1 = member.guild.channels.cache.find(channel => channel.name === "〢join-leave");
	if(!channel1) return;
	const leaveembed = new Discord.MessageEmbed()
	.setDescription(`${member}, has left the server 🙁. Hope you'll be back soon!`)
        .setColor(0x3dffcf)
	channel1.send(leaveembed);
})

bot.on('message',async message=>{
	if(message.channel.id === "582850962121687045"){

	let menrole = message.guild.roles.cache.find(r=> r.name === "Anime Squad")
	if(message.content.startsWith("Hey")){
       message.channel.send(`${menrole}`);
	}}else{
		if(message.author.bot || message.channel.type === "dm") return;
		if (message.channel.id === "684369914810597376") {
		let msg = message.content
		const url = `https://some-random-api.ml/chatbot?message=${msg}`;
            let res; 
            res = await fetch(url).then(url => url.json());
			message.channel.send(res.response)
	} else {
        let msgArray = message.content.split(/\s+/g)
        let cmd = msgArray[0];
	let args = message.content.substring(PREFIX.length).split(" ");
	if (!message.content.startsWith(PREFIX)) return;
        if(message.channel.type === "dm") return; 
	let commandfile = bot.commands.get(cmd.slice(PREFIX.length)) || bot.commands.get(bot.aliases.get(cmd.slice(PREFIX.length)))
        if(commandfile) commandfile.run(bot,message,args);}
	}
	});


bot.login('NjQ2MDE1MTk3MDAxMDIzNDg5.XdK-mA.u4NHGAhShZlra3YgZ24gjB1zyYk');
