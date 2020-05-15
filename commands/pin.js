const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setTitle("You Don\'t Have Enough Permissions!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
    if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.channel.send("I Don\'t Have Manage Messages Permissions!")
    const id = args[1];
    if(!id) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used Like This \`+pin [id]\`").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  (await message.channel.messages.fetch(id)).pin();
};

module.exports.config = {
    name: "pin",
    description: "A Command To Pin The Message By Providing Its ID!",
    usage: "+pin [id]",
    accessableby: "Staffs & Moderators",
    aliases: [""]
}
