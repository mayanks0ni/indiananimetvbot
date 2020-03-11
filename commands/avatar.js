const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    const user = message.mentions.users.first() || message.author
    const avatarembed = new Discord.MessageEmbed()
        .setTitle(`User Avatar For ${user.tag}`)
        .setImage(`${user.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
        .setColor("RANDOM")
    message.channel.send(avatarembed);
};

module.exports.config = {
    name: "avatar",
    description: "A Command To View Avatar Of Yourself Or The Mentioned User!",
    usage: "+avatar [user]",
    accessableby: "Members",
    aliases: ["av"]
}
