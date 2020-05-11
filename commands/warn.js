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
 if(!user || !reason) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This `+warn [user] [reason]`!").setFooter("IAT Bot").setTimestamp().setColor(0xff0000));
 if(message.mentions.members.first().permissions.has("ADMINISTRATOR" || "MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setTitle("You Can't Warn A Moderator/Admin!").setFooter("IAT Bot").setTimestamp().setColor(0xff0000));
 let warnChannel = message.guild.channels.cache.find(c => c.name === "〢warn-log");
 message.delete();
 const warnEmbed = new Discord.MessageEmbed()
 .setAuthor(`${user.tag}`, user.displayAvatarURL())
 .setTitle(`Warned ${user.username}!`)
 .addField(`**Moderator**`, `${message.author.tag}`)
 .addField(`**Reason**`, `${reason}`)
 .setThumbnail(bot.user.displayAvatarURL())
 .setColor("YELLOW")
 .setFooter("IAT Bot")
 .setTimestamp()

 message.channel.send(warnEmbed).then(m => m.delete({ timeout: 5000 }))
 user.send(warnEmbed);
 var d = new Date()
 var date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
 var time = d.getHours() + ":" + d.getMinutes() + ':' + d.getSeconds();
 var dateTime = date+" "+time;
 warnLog.all(`INSERT INTO warnlog (username, userid, wby, reason, dt) VALUES ('${user.tag}', '${user.id}', '${message.author.tag}', '${reason}', '${dateTime}')`, err =>{
     if(err){
         console.error(err);
     }
 });
};

module.exports.config = {
    name: "warn",
    description: "A Command To Warn The User!",
    usage: "+warn [user] [reason] ",
    accessableby: "Staffs & Moderators",
    aliases: [""]
}
