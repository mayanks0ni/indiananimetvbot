const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let usertoadd = message.mentions.members.first();
    let rolename = args.slice(2).join(" ")
    const role12 = message.guild.roles.cache.find(r => r.name === rolename)
    if (!message.member.permissions.has("MANAGE_ROLES")) {
        return message.channel.send(new Discord.MessageEmbed().setTitle('You Don\'t Have Enough Permissions!').setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
    }
    if (!usertoadd || !rolename) {
        const noinfo = new Discord.MessageEmbed()
            .setTitle('This Command Is Used Like This \`+role [user] [rolename]\`')
            .setFooter('IAT Bot')
            .setTimestamp()
            .setColor(0xff0000)
        message.channel.send(noinfo);
    } else {
        if (usertoadd.roles.cache.find(r => r.name === rolename)) {
            const hasrole = new Discord.MessageEmbed()
                .setTitle(`${usertoadd.displayName} Already Has ${rolename}`)
                .setColor(0xff0000)
                .setFooter('IAT Bot')
            message.channel.send(hasrole);
        } else {
if(!message.guild.roles.cache.find(r => r.name === rolename) return message.channel.send(new Discord.MessageEmbed().setTitle("Couldn\'t Find That Role! (Type The Roles Exact Same Name!)").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());
            try{
          await usertoadd.roles.add(role12)
      } catch(err){
           console.log(err)
           return message.channel.send(new Discord.MessageEmbed().setTitle("Looks Like I Don\'t Have Permissions To Add That Role!\n I Can\'t Add Role That Are Above My Role!").setColor(0xff0000).setTimestamp().setFooter("IAT Bot"))

    }
    message.channel.send(new Discord.MessageEmbed().setTitle("✅ Successfully Added Role!").addField("**Member**", `${usertoadd.displayName}`).addField("**Role Added**", `${rolename}`).setFooter('IAT Bot').setColor("GREEN"));
        }
    }
};

module.exports.config = {
    name: "role",
    description: "A Command To Add Role Any Role To A PArticular User!!",
    usage: "+role [user] [rolename]",
    accessableby: "Staffs & Moderator",
    aliases: ["addrole", "giverole"]
}
