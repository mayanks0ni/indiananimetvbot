const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
   if(!message.author.id === "516247416878530560") return message.channel.send(new Discord.MessageEmbed().setTite("You Are Not The Bot Owner!").setColor(0xff0000).setFooter("IAT Bot").setTimestamp());

    await message.channel.send(new Discord.MessageEmbed().setTitle("Bot Is Shutting Down...").setColor("GREEN").setTimestamp().setFooter("IAT Bot"));
    process.exit();

};

module.exports.config = {
    name: "shutdown",
    description: "A Command To Shutdown The Bot!",
    usage: "+shutdown",
    accessableby: "Owner",
    aliases: [""]
}
