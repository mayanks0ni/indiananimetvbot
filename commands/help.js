const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (args[1]) {
        let command = args[1];
        if (bot.commands.has(command)) {
            command = bot.commands.get(command);
            var cmdhelpembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`Help Commands`, message.guild.iconURL)
                .setThumbnail(bot.user.displayAvatarURL)
                .setDescription(`\n**Command:** ${command.config.name}\n**Description:** ${command.config.description || "No Description"}\n**Usage:** ${command.config.usage || "No Usage"}\n**Accessable by:** ${command.config.accessableby || "Members"}\n**Aliases:** ${command.config.noalias || command.config.aliases}`)

                .setFooter('IAT Bot')
                .setTimestamp()
            message.channel.send(cmdhelpembed);
        }
    }
    if (!args[1]) {

        let helpemb = new Discord.MessageEmbed()
            .setAuthor('🗒️ Help Commands 🗒️')
            .addField('👤 User Help Commands 👤', 'React With 👤 To Get More Info!')
            .addField('🛠️ Moderation Commands 🛠️', 'React With 🛠️ To Get More Info!')
            .addField('⚙️ Admin Only Commands ⚙️', 'React With ⚙️ To Get More Info!')
            .addField('🖲️ Other Commands 🖲️', 'React With 🖲️ To Get More Info!')
            .addField('🔞 NSFW Commands 🔞', 'React With 🔞 To Get More Info!')
            .setDescription('**Get More Info Of Commands With Examples On My Website!** \n http://indiananimetvbot.herokuapp.com/index.html')
            .setFooter('IAt Bot')
            .setTimestamp()
            .setColor(0xff47bf)
        let userhelpcmd = new Discord.MessageEmbed()
            .setAuthor('👤 User Help Commands 👤')
            .addField('avatar [user]', 'Basic command to view the avatar URl of the mentioned user!')
            .addField('meminfo', 'A Command to view the member count of the server!')
            .addField('serverinfo', 'Gives The Server\'s Info!')
     .addField('userinfo', 'A Command To View Info Of Yourself Or The Mentioned User!')
            .setFooter('IAT Bot')
            .setTimestamp()
            .setColor(0xff47bf)

        let moderationcmd = new Discord.MessageEmbed()
            .setAuthor('🛠️ Moderation Commands 🛠️')
            .addField('ban [user] [reason]', 'Moderation command for banning a Member!')
            .addField('kick [user] [reason]', 'Moderation command for kicking a Member!')
            .addField('announce [channel] [text]', 'A command to announce messages!')
            .addField('dm [user]', 'Directly send the mentioned user message through the bot!')
            .addField('mentionrole [rolename]', 'Mentions the role by specifying only its name!')
.addField('role [user] [role]', 'A Command To Add A Role To The Mentioned User!')
.addField('takerole [user] [role]', 'A Command To Take Role From The Mentioned User!')
.addField('warn [user] [reason]', 'A Command To Warn The Mentioned User!')
.addField('rolecolor [color] [role name]', 'A Command To Change The Color The Role!')
.addField('setnick [user] [nick name]', 'A Command To Change The Nickname Of The Mentioned User!')
.addField('pin [message id]', 'A Command To Pin The Message By Providing Its ID!')
.addField('addemoji [link] [name]','A Command To Add Emoji By Providing Its Link And Name!')
            .setFooter('IAT Bot')
            .setTimestamp()
            .setColor(0xff47bf)
        let othercmds = new Discord.MessageEmbed()
            .setAuthor('🖲️ Other Commands 🖲️')
            .addField('say [text]', 'A command to send messages through the bot!')
            .addField('suggest [suggestion]', 'A command to give suggestions!')
            .addField('hug [user]', 'Hugs the mentioned user!')
            .addField('kiss [user]', 'Kisses the mentioned user!')
            .addField('pat [user]', 'Pats the mentioned user!')
            .addField('fact', 'Sends a random fact!')
            .addField('spoiler', 'Makes The Given Text In Spoiler Form!')
            .addField('wallpaper', 'Command to get a random wallpaper!')
            .setColor(0xff47bf)
            .setFooter('IAt Bot')
            .setTimestamp()
        let nsfwcmd = new Discord.MessageEmbed()
            .setAuthor('🔞 NSFW Commands 🔞')
            .addField('porn', 'Command for viewing porn gifs!')
            .addField('4k', 'Command for viewing 4k porn images!')
            .addField('pussy', 'Command for viewing pussy images!')
            .addField('hentai', 'Command for viewing Hentai images!')
            .addField('hass', 'Command to view Hentai Ass Images!')
            .addField('anal', 'Command to view Anal Images!')
            .addField('hanal', 'Command to view Hentai Anal Images!')
            .addField('boobs', 'Command to view Boobs Images!')
            .setColor(0xff47bf)
            .setFooter('IAt Bot')
            .setTimestamp()
        let adminonlycmd = new Discord.MessageEmbed()
            .setAuthor('⚙️ Admin Only Commands ⚙️')
            .addField('uptime', 'Command To View the Uptime Of The Bot!')
            .addField('setstatus [type] [status]', 'A Command To Set The Status Of The Bot!')
            .setColor(0xff47bf)
            .setFooter('IAt Bot')
            .setTimestamp()
        const helpmsg = await message.channel.send(helpemb);
        await helpmsg.react(`👤`);
        await helpmsg.react(`🛠️`);
        await helpmsg.react(`⚙️`);
        await helpmsg.react(`🖲️`);
        await helpmsg.react(`🔞`);

        const filter = (reaction, user) => {
            return ['👤', '🛠️', '⚙️', '🖲️', '🔞'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        helpmsg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '👤') {
                    helpmsg.edit(userhelpcmd);
                    helpmsg.clearReactions();
                }
                if (reaction.emoji.name === '🛠️') {
                    helpmsg.edit(moderationcmd);
                    helpmsg.clearReactions();
                }
                if (reaction.emoji.name === '⚙️') {
                    helpmsg.edit(adminonlycmd);
                    helpmsg.clearReactions();
                }
                if (reaction.emoji.name === '🖲️') {
                    helpmsg.edit(othercmds);
                    helpmsg.clearReactions();
                }
                if (reaction.emoji.name === '🔞') {
                    helpmsg.edit(nsfwcmd);
                    helpmsg.clearReactions();
                }
            })

    }

};

module.exports.config = {
    name: "help",
    description: "A Command To View The Help Page Of All Commands!",
    usage: "+help",
    accessableby: "Members",
    aliases: ["h"]
}
