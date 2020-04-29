const Discord = module.require("discord.js");
const sqlite = require("sqlite3").verbose();

module.exports.run = async (bot, message, args) => {
    let warnLog = new sqlite.Database("./database/warnLog.db", err => {
        if(err){
            console.error(err);
        }
    });
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setTitle("You Don\'t Have Enough Permissions!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
 const user = message.mentions.users.first();
 let reason = args.slice(2).join(" ");
 if(!user || !reason) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This `+warnclear [user] [reason]`!").setFooter("IAT Bot").setTimestamp().setColor(0xff0000));
 
 warnLog.all(`DELETE FROM warnlog WHERE userid = '${user.id}'`, (err, rows) =>{
     if(err){
         console.error(err);
     } 
     if(rows === undefined) return message.channel.send(new Discord.MessageEmbed().setTitle("No Warnings Found For That User").setFooter("IAT Bot").setTimestamp().setColor(0xff0000))
     const warnEmbed = new Discord.MessageEmbed()
 .setAuthor(`${user.tag}`, user.displayAvatarURL())
 .setTitle(`Cleared All Warnings For ${user.username}!`)
 .addField(`**Reason**`, `${reason}`)
 .setColor("GREEN")
 .setFooter("IAT Bot")
 .setTimestamp()
 message.channel.send(warnEmbed);
 });
};

module.exports.config = {
    name: "warnclear",
    description: "A Command To Clear All Warnings Of The User!",
    usage: "+warnclear [user] [reason]",
    accessableby: "Staffs & Moderators",
    aliases: ["wclear"]
}