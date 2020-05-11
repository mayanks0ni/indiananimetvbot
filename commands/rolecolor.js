const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send(new Discord.MessageEmbed().setTitle("You Don\'t Have Enough Permissions!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
   let rcolor = args[1];
   let rname = args.slice(2).join(" ");

   if(!rcolor || !rname) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This \`+rolecolor [hex code] [role name]\`").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
 try {
  const role = message.guild.roles.cache.find(r => r.name === rname).setColor(rcolor)
 } catch (e) {
   return message.channel.send(new Discord.MessageEmbed().setTitle(`Error!`).setDescription(`Error: Please Check The Syntax Once Again And Enter A Valid Hex Color And The Role's Exact Same Name!`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
 }
};

module.exports.config = {
    name: "rolecolor",
    description: "A Command To Change The Color Of The Role!",
    usage: "+rolecolor [hex code] [role name]",
    accessableby: "Staffs & Moderators",
    aliases: ["rcolor", "rc"]
}
