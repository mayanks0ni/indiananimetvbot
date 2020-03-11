const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let usertotake = message.mentions.members.first();
    let rolename1 = args.slice(2).join(" ")
    const role132 = message.guild.roles.cache.find(r => r.name === rolename1)
    if (!message.member.permissions.has("MANAGE_ROLES")) {
        return message.channel.send(new Discord.MessageEmbed().setTitle('You Don\'t Have Enough Permissions!').setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
    }
    if (!usertotake || !rolename1) {
      return message.channel.send(new Discord.MessageEmbed().setTitle('This Command Is Used Like This \`+takerole [user] [rolename]\`').setFooter('IAT Bot').setTimestamp().setColor(0xff0000)); 
    }
      if (!usertotake.roles.cache.find(r => r.name === rolename1)) {
            return message.channel.send(new Discord.MessageEmbed().setTitle(`${usertotake.displayName} Does Not Have ${rolename1} Role!`).setColor(0xff0000).setFooter('IAT Bot').setTimestamp());
      }
          await usertotake.roles.remove(role132).catch(err=> {
               console.error(err);
            });
            const success = new Discord.MessageEmbed()
                .setTitle(`Successfully Removed ${rolename1} Role From User ${usertotake.displayName}!`)
                .setFooter('IAT Bot')
                .setColor("GREEN")
                message.channel.send(success); 
    
};

module.exports.config = {
    name: "takerole",
    description: "A Command To Remove Role Any Role From A Particular User!!",
    usage: "+takerole [user] [rolename]",
    accessableby: "Staffs & Moderator",
    aliases: ["removerole", "rrole"]
}
