const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
	if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`).setTitle("You Don\'t Have Enough Permissions!").setFooter("IAT Bot").setColor(0xff0000).setTimestamp());
    let time = args[2];
    let member = message.mentions.members.first();
    let reason = args.slice(3).join(" ");

    if(!time || !member) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`).setTitle("This Command Is Used Like This \`+tempmute [member] [duration (1m/1h/1d)] [reason]\`").setFooter("IAT Bot").setColor(0xff0000).setTimestamp());
    let muterole = message.guild.roles.cache.find(muterole => muterole.name === "Muted");
    if(member.roles.cache.find(r => r.name === "Muted")) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`).setTitle("That User Is Already Muted!").setFooter("IAT Bot").setColor(0xff0000).setTimestamp());
    if(!muterole) {
    	try{
    	 muterole = await message.guild.roles.create({
    	 	data:{
    			name: "Muted",
    			color: "#000000",
    			permissions: [],
    		},
    		reason: "Created Role For Muting People!",
    		})
    		await message.guild.channels.cache.forEach(async (channel, id) => {
    			await channel.createOverwrite(muterole, {
    				SEND_MESSAGES: false,
    				ADD_REACTIONS: false
    			});
    		});
    	}catch(e){
    		console.error(e);
    	}
    }
    await member.roles.add(muterole)
    const mEmbed = new Discord.MessageEmbed()
    .setAuthor(`Successfully Muted ${member.displayName}!`)
    .setTitle(`${member.displayName} Has Been Muted For ${time}!`)
    .addField(`**Moderator**`, `${message.author.tag}`)
    .addField(`**Reason**`, `${reason || "None"}`)
    .setColor(0x00ff90)
    .setFooter("IAT Bot")
    .setTimestamp()
    message.channel.send(mEmbed);

    setTimeout(function(){
      member.roles.remove(muterole);
      const mEmbed = new Discord.MessageEmbed()
    .setTitle(`${member.displayName} Has Been Unmuted!`)
    .setColor(0x00a5ff)
    .setFooter("IAT Bot")
    .setTimestamp()
    message.channel.send(mEmbed);
    }, ms(time));
}

module.exports.config = {
    name: "tempmute",
    description: "A Command To Temporarily Mute The User!",
    usage: "+tempmute [member] [duration (1m/1h/1d)] [reason]",
    accessableby: "Staffs & Moderators",
    aliases: ["tmute"]
}
