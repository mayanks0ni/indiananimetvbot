const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
        const noperms = new Discord.MessageEmbed()
            .setTitle('You Don\'t Have Enough Permissions!')
            .setFooter(message.guild.me.displayName)
            .setTimestamp()
            .setColor(0xff0000)
        message.channel.send(noperms);
    } else {
        const type1 = args[1].toUpperCase();
        const status1 = args.slice(2).join(" ");
        if(!status1 || !type1) return message.channel.send(new Discord.MessageEmbed().setTitle("This Command Is Used LIke This \`+setstatus [type (In Capital Letters)] [status]\`").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        bot.user.setActivity(status1, { type: type1 });
        const statusembed = new Discord.MessageEmbed()
            .setTitle(`Updated My Status to ${type1} ${status1}`)
            .setFooter(message.guild.me.displayName)
            .setTimestamp()
            .setColor("GREEN")
        message.channel.send(statusembed);
    }
};

module.exports.config = {
    name: "setstatus",
    description: "A Command To Set The Status Of The Bot!",
    usage: "+setstatus [type] [status]",
    accessableby: "Staffs & Moderators",
    aliases: ["ss"]
}
