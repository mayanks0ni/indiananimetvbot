const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    const rolename = args.slice(1).join(" ");
    if (!rolename) return message.channel.send(new Discord.MessageEmbed().setTitle('This Command Is Used Like This \`+inrole [rolename]\`').setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
    const inroleEmbed = new Discord.MessageEmbed()
        .setTitle(`Members With ${rolename} Role!`)
        .setDescription(message.guild.roles.cache.find(r => r.name === rolename).members.map(m => m.user.tag).join('\n'))
        .setFooter('IAT Bot')
        .setTimestamp()
        .setColor("RANDOM")
    message.channel.send(inroleEmbed);
};

module.exports.config = {
    name: "inrole",
    description: "A Command To View The Members In a Particular Role!",
    usage: "+inrole [rolename]",
    accessableby: "Members",
    aliases: ["ir"]
}
