const Discord = module.require("discord.js");
const Canvas = require("canvas");

module.exports.run = async (bot, message, args) => {
    const canvas = Canvas.createCanvas(720, 1280);
    const ctx = canvas.getContext("2d");
  const user = message.mentions.users.first();

  if(!user) return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`).setTitle("This Command Is Used \`+rip [user]\`!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
  const user2 = user.displayAvatarURL({format: 'png', dynamic: true, size: 1024})

   const background = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/564520348821749766/687972262510329856/rest-in-peace-rip-headstone-blank-template-imgflip-53245711.png`)
   
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

   ctx.strokeStyle = '#000000';
   ctx.strokeRect(0, 0, canvas.width, canvas.height);

   

   ctx.font = '65px Segoe Print'
   ctx.fillText("2020-2021", 160, 1050)

   const userpfp = await Canvas.loadImage(user2)
   ctx.drawImage(userpfp, 200,500,300, 300);
   const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'rip.png')
   message.channel.send(attachment);
};

module.exports.config = {
    name: "rip",
    description: "A Command To Generate Rip Image For The Provided Text!",
    usage: "+rip [text]",
    accessableby: "Members",
    aliases: [""]
}
