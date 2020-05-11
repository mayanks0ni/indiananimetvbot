const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (args[1]) {
        let command = args[1];
        if (bot.commands.has(command)) {
          let alias
            command = bot.commands.get(command);
            var cmdhelpembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`Help Commands`, bot.user.displayAvatarURL())
                .addField("**Command**", `**${command.config.name}**`)
                .addField("**Description**", `**${command.config.description}**`)
                .addField("**Usage**", `**${command.config.usage}**`)
                .addField("**Accessable By**", `**${command.config.accessableby}**`)
                .addField("**Aliases**", `**${command.config.aliases}**`)
                .setThumbnail(bot.user.displayAvatarURL())
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
            message.channel.send(cmdhelpembed);
        }
    }
    if (!args[1]) {
        let eco = new Discord.MessageEmbed()
        .setAuthor('💰 Economy Commands 💰')
        .addField('bal', 'A Command To View Your Balance!')
        .addField('bank', 'A Command To View Your Bank Balance!')
        .addField('daily', 'A Command To Claim Your Daily Reward!')
        .addField('withdraw', 'A Command To Withdraw An Amount From Your Bank!')
        .addField('deposit', 'A Command To Deposit An Amount In Your Bank!')
        .addField('give', 'A Command To Give An Amount To Someone!')
        .addField("profile", "A Command To View Your Profile!")
        .addField('shop', 'A Command To View The Shop!')
        .addField('buy', 'A Command To Buy An Item from The Shop!')
        .addField('transactions', 'A Command To View Your Transactions!')
        .setFooter(message.guild.me.displayName)
        .setTimestamp()
        .setColor(0xff47bf)

        let gamble = new Discord.MessageEmbed()
        .setAuthor("🎮 Gambling Commands 🎮")
        .addField("coinflip", "A Command To Gamble Money By Flipping Coins!")
        .addField("rolldice", "A Command To Gamble Money By Rolling Dice!")
        .addField("rps", "A Command To Gamble Money By playing Rock, Paper & Scissor!")
        .setFooter(message.guild.me.displayName)
        .setTimestamp()
        .setColor(0xff47bf)
        
                    let helpemb = new Discord.MessageEmbed()
                    .setAuthor('🗒️ Help Commands 🗒️')
                    .addField('**👤 User Help Commands 👤**', 'React With 👤 To Get More Info!')
                    .addField("**💰 Economy Commands 💰**", "React With 💰 to Get More Info!")
                    .addField("**🎮 Gambling Commands 🎮**", "React With 🎮 To Get More Info!")
                    .addField('**🛠️ Moderation Commands 🛠️**', 'React With 🛠️ To Get More Info!')
                    .addField('**⚙️ Admin Only Commands ⚙️**', 'React With ⚙️ To Get More Info!')
                    .addField('**🖲️ Other Commands 🖲️**', 'React With 🖲️ To Get More Info!')
                    .addField('**🎵 Music Commands 🎵**', 'React With 🎵 To Get More Info!')
                    .addField('**🔞 NSFW Commands 🔞**', 'React With 🔞 To Get More Info!')
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setFooter(message.guild.me.displayName)
                    .setTimestamp()
                    .setColor(0xff47bf)
                let userhelpcmd = new Discord.MessageEmbed()
                    .setAuthor('👤 User Help Commands 👤')
                    .addField('avatar', ' A Command To View The Avatar Of Yourself Or The Mentioned User!')
                    .addField('serverinfo', 'A Command To View The Server\'s Info!')
                    .addField('userinfo', 'A Command To View Info Of Yourself Or The Mentioned User!')
                    .setFooter(message.guild.me.displayName)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setTimestamp()
                    .setColor(0xff47bf)

                let moderationcmd = new Discord.MessageEmbed()
                    .setAuthor('🛠️ Moderation Commands 🛠️')
                    .addField('ban [user] [reason]', 'Moderation Command For Banning A Member!')
                    .addField('kick [user] [reason]', 'Moderation Command For Kicking A Member!')
                    .addField('announce [channel] [text]', 'A Command To Announce Messages!')
                    .addField('dm [user]', 'Directly send The Mentioned User Message Through The Bot!')
                    .addField('mentionrole [rolename]', 'Mentions The Role By Specifying Only Its Name!')
                    .addField('role [user] [role]', 'A Command To Add A Role To The Mentioned User!')
                    .addField('takerole [user] [role]', 'A Command To Take Role From The Mentioned User!')
                    .addField('warn [user] [reason]', 'A Command To Warn The Mentioned User!')
                    .addField('rolecolor [color] [role name]', 'A Command To Change The Color The Role!')
                    .addField('setnick [user] [nick name]', 'A Command To Change The Nickname Of The Mentioned User!')
                    .addField('pin [message id]', 'A Command To Pin The Message By Providing Its ID!')
                    .addField('addemoji [link] [name]','A Command To Add Emoji By Providing Its Link And Name!')
                    .setFooter(message.guild.me.displayName)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setTimestamp()
                    .setColor(0xff47bf)
                let othercmds = new Discord.MessageEmbed()
                    .setAuthor('🖲️ Other Commands 🖲️')
                    .addField('say [text]', 'A command to send messages through the bot!')
                    .addField('suggest [suggestion]', 'A Command To Give Suggestions!')
                    .addField('hug [user]', 'Hugs The Mentioned User!')
                    .addField('kiss [user]', 'Kisses The Mentioned User!')
                    .addField('pat [user]', 'Pats The Mentioned User!')
                    .addField('fact', 'Sends A Random Fact!')
                    .addField('spoiler', 'Makes The Given Text In Spoiler Form!')
                    .addField('wallpaper', 'Command To Get A Random Wallpaper!')
                    .addField('pokemon [name]', 'A Command To Get The Info Of The Pokémon!')
                    .addField('insult', 'A Command To Get A Roast Message!')
                    .addField('cmm [text]', 'A Command To Get A Change My Mind Image For The Provided Text!')
                    .addField('tweet [username] [text]', 'A Command To Tweet Through The Provided Username!')
                    .addField('trumptweet [text]','A Command To Get A Trump Tweet Image For The Provided Text!')
                    .addField('trash [user]','A Command To Get A Trash Waifu Image Of Yourself Or The Mentioned User!')
                    .addField('captcha [text]', 'A Command To Get A Captcha Image Of Yourself With The Desired Text!')
                    .addField('rip [user]', 'A Command To Get The Rip Image Of The Mentioned User!')
                    .addField('urban [word]', 'A Command To Get The Definition Of Word From Urban Dictionary!')
                    .addField('uptime', 'Command To View the Uptime Of The Bot!')
                    .addField("ping", "A Command To Check The Ping Of The Bot!")
                    .addField("xp", "A Command To View Your Or Others XP!")
                    .setColor(0xff47bf)
                    .setFooter(message.guild.me.displayName)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setTimestamp()
                let nsfwcmd = new Discord.MessageEmbed()
                    .setAuthor('🔞 NSFW Commands 🔞')
                    .addField('porn', 'Command For Viewing Porn Gifs!')
                    .addField('4k', 'Command For Viewing 4k Porn Images!')
                    .addField('pussy', 'Command For Viewing Pussy Images!')
                    .addField('hentai', 'Command For Viewing Hentai Images!')
                    .addField('hass', 'Command To View Hentai Ass Images!')
                    .addField('anal', 'Command To View Anal Images!')
                    .addField('hanal', 'Command To View Hentai Anal Images!')
                    .addField('boobs', 'Command To View Boobs Images!')
                    .setColor(0xff47bf)
                    .setFooter(message.guild.me.displayName)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setTimestamp()
                let adminonlycmd = new Discord.MessageEmbed()
                    .setAuthor('⚙️ Owner Only Commands ⚙️')
                    .addField("giftall", "A Command To Gift All The Registered A User An  Amount!")
                    .addField("gift", "A Command To Gift A Certain User An Amount!")
                    .addField('setstatus [type] [status]', 'A Command To Set The Status Of The Bot!')
                    .addField('restart', 'A Command To Restart The Bot!')
                    .addField('shutdown', 'A Command To Shutdown The Bot!')
                    .setColor(0xff47bf)
                    .setFooter(message.guild.me.displayName)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setTimestamp()
                let musiccmd = new Discord.MessageEmbed()
                    .setAuthor('🎵 Music Commands 🎵')
                    .addField('play', 'A Command To Play Songs!')
                    .addField('queue', 'A Command To View The Song Queue!')
                    .addField("nowplaying", "A Command To View the Info The Currently Playing Song!")
                    .addField('pause', 'A Command To Pause The Current Playback!')
                    .addField('resume', 'A Command To Resume The Playback!')
                    .addField('skip', 'A Command To Skip The Current Song!')
                    .addField('disconnect', 'A Command To Disconnect The Bot From The Voice Channel!')
                    .setColor(0xff47bf)
                    .setFooter(message.guild.me.displayName)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setTimestamp()
                const helpmsg = await message.channel.send(helpemb);
                await helpmsg.react(`👤`);
                await helpmsg.react(`💰`);
                await helpmsg.react(`🎮`);
                await helpmsg.react(`🛠️`);
                await helpmsg.react(`⚙️`);
                await helpmsg.react(`🖲️`);
                await helpmsg.react(`🎵`);
                await helpmsg.react(`🔞`);

                const filter = (reaction, user) => {
                    return ['👤','💰', '🎮', '🛠️', '⚙️', '🖲️', '🔞', '🎵'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                helpmsg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();

                        if (reaction.emoji.name === '👤') {
                            helpmsg.edit(userhelpcmd);
                            helpmsg.reactions.removeAll();
                        }
                        if (reaction.emoji.name === '💰') {
                            helpmsg.edit(eco);
                            helpmsg.reactions.removeAll();
                        }
                        if (reaction.emoji.name === '🎮') {
                            helpmsg.edit(gamble);
                            helpmsg.reactions.removeAll();
                        }
                        if (reaction.emoji.name === '🛠️') {
                            helpmsg.edit(moderationcmd);
                            helpmsg.reactions.removeAll();
                        }
                        if (reaction.emoji.name === '⚙️') {
                            helpmsg.edit(adminonlycmd);
                            helpmsg.reactions.removeAll();
                        }
                        if (reaction.emoji.name === '🖲️') {
                            helpmsg.edit(othercmds);
                            helpmsg.reactions.removeAll();
                        }
                        if (reaction.emoji.name === '🎵') {
                            helpmsg.edit(musiccmd);
                            helpmsg.reactions.removeAll();
                        }
                        if (reaction.emoji.name === '🔞') {
                            helpmsg.edit(nsfwcmd);
                            helpmsg.reactions.removeAll();
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
