const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
   if(!message.author.id === "516247416878530560") return message.channel.send(new Discord.MessageEmbed().setTite("You Are Not The Bot Owner!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
    const rEmbed = new Discord.MessageEmbed().setTitle("Bot Is Restarting...").setColor("GREEN").setTimestamp().setFooter(message.guild.me.displayName)
    const embed = new Discord.MessageEmbed().setTitle("Restarted The Bot Successfully!").setColor("GREEN").setTimestamp().setFooter(message.guild.me.displayName)
    const sendRembed = await message.channel.send(rEmbed);
    bot.destroy();
  setTimeout(function(){
      bot.login(process.env.BOT_TOKEN);
     sendRembed.edit(embed);
     bot.user.setActivity("+help", {type:"LISTENING"});
  }, 5000)


};

module.exports.config = {
    name: "restart",
    description: "A Command To Restart The Bot!",
    usage: "+restart",
    accessableby: "Owner",
    aliases: [""]
}
