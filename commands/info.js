const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    const Infoembed = new Discord.MessageEmbed()
        .addField('Name', 'Indian Anime TV')
        .addField('Prefix', '+')
        .addField('Version', '1.0.0')
        .addField('Owner', '**Spide¥#6125**')
        .setColor("RANDOM")
        .setDescription('I am a bot programmed by SpideY!')
    message.channel.send(Infoembed)
        .then(m => m.react(`678864853880012831`));
};

module.exports.config = {
    name: "info",
    description: "A Command To View The Info Of The Bot!",
    usage: "+info",
    accessableby: "Members",
    aliases: [""]
}
