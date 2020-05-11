const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let usertotake = message.mentions.members.first();
    let rolename1 = args.slice(2).join(" ")
    const role132 = message.guild.roles.cache.find(r => r.name === rolename1)
    if (!message.member.permissions.has("MANAGE_ROLES")) {
        return message.channel.send(new Discord.MessageEmbed().setTitle('You Don\'t Have Enough Permissions!').setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
    }
    if (!usertotake || !rolename1) {
      return message.channel.send(new Discord.MessageEmbed().setTitle('This Command Is Used Like This \`+takerole [user] [rolename]\`').setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000)); 
    }
      if (!usertotake.roles.cache.find(r => r.name === rolename1)) {
            return message.channel.send(new Discord.MessageEmbed().setTitle(`${usertotake.displayName} Does Not Have ${rolename1} Role!`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
      } try{
          await usertotake.roles.remove(role132)
      } catch (err){
           console.log(err);
           return message.channel.send(new Discord.MessageEmbed().setTitle("Looks Like I Don\'t Have Permissions To Remove That Role!\n I Can\'t Remove Role That Are Above My Role!").setColor(0xff0000).setTimestamp().setFooter(message.guild.me.displayName)) 
      }
    message.channel.send(new Discord.MessageEmbed().setTitle("✅ Successfully Removed Role!").addField("**Member**", `${usertotake.displayName}`).addField("**Role Removed**", `${rolename1}`).setFooter(message.guild.me.displayName).setColor("GREEN"));
};

module.exports.config = {
    name: "takerole",
    description: "A Command To Remove Role Any Role From A Particular User!!",
    usage: "+takerole [user] [rolename]",
    accessableby: "Staffs & Moderator",
    aliases: ["removerole", "rrole"]
}
