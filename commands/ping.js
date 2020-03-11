const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.channel.send('📡Ping - ' + Math.round(bot.ws.ping) + 'ms📡');
};

module.exports.config = {
    name: "ping",
    description: "A Command To Check The Ping Of The Bot!",
    usage: "+ping",
    accessableby: "Members",
    aliases: [""]
}
