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
 if(!user) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This `+warnlog [user]`!").setFooter("IAT Bot").setTimestamp().setColor(0xff0000));
 warnLog.all(`SELECT * FROM warnlog WHERE userid = '${user.id}'`, (err, rows) =>{
    if(err){
        console.error(err);
        return;
    }
    if(rows.length < 1) return message.channel.send(new Discord.MessageEmbed().setTitle("No Warnings Found For That User!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
    var i;
    const warnEmbed = new Discord.MessageEmbed()
 .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
 .setTitle(`Warnings For ${user.username}!`)
 .setColor("YELLOW")
 .setFooter("IAT Bot")
 .setTimestamp()
 for(i=0;i < rows.length; i++){
     const w = rows[i]
    warnEmbed.addField(`\`#${i + 1}\``+"**At**" +" "+ `**${w.dt}**` + " " + "**By**" + " "+ `**${w.wby}**`, "**Reason:**" +" "+ `**${w.reason}**` + " ")
 }
 message.channel.send(warnEmbed)

});

};

module.exports.config = {
    name: "warnlog",
    description: "A Command To View The Warnlog Of The Specified User!",
    usage: "+warnlog [user]",
    accessableby: "Staffs & Moderators",
    aliases: [""]
}