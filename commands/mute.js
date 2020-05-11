const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`).setTitle("You Don\'t Have Enough Permissions!").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
 
    let member = message.mentions.members.first();
    if(!member) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`).setTitle("This Command Is Used Like This \`+mute [member] [reason]\`").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    if(member.roles.cache.find(r => r.name === "Muted")) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`).setTitle("That User Is Already Muted!").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
    let reason = args.slice(2).join(" ");

    let muterole = message.guild.roles.cache.find(muterole => muterole.name === "Muted");
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
    } try {
      await member.roles.add(muterole)
    } catch(e) {
        console.log(e);
        return message.channel.send(new Discord.MessageEmbed().setTitle("Error! Can't Mute That User!").setColor(0xff0000).setTimestamp().setFooter(message.guild.me.displayName))
    }
    
    const mEmbed = new Discord.MessageEmbed()
    .setAuthor(`Successfully Muted ${member.displayName}!`)
    .setTitle(`${member.displayName} Has Been Muted!`)
    .addField(`**Moderator**`, `${message.author.tag}`)
    .addField(`**Reason**`, `${reason || "None"}`)
    .setColor(0x00ff90)
    .setFooter(message.guild.me.displayName)
    .setTimestamp()
    message.channel.send(mEmbed);
}

module.exports.config = {
    name: "mute",
    description: "A Command To Mute The User!",
    usage: "+mute [member] [reason]",
    accessableby: "Staffs & Moderators",
    aliases: [""]
}