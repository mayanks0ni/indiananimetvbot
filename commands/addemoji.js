const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
   if(!message.member.permissions.has("MANAGE_EMOJIS")) return message.channel.send(new Discord.MessageEmbed().setTitle("You Don\'t Have Enough Permissions!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
     let link = args[1];
     let name = args.slice(2).join(" ");
     if(!link || !name) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This \`+addemoji [link] [name]\`").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
     message.guild.emojis.create(link, name).catch(e => {
         if(e) return message.channel.send(new Discord.MessageEmbed().setTitle(`Error: ${e}`).setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
        });

};

module.exports.config = {
    name: "addemoji",
    description: "A Command To Create New Emoji!",
    usage: "+addemoji [link for emoji file] [name]",
    accessableby: "Staffs & Moderators",
    aliases: ["aemoji", "createemoji"]
}
