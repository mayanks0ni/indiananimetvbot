const Discord = module.require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
    let name = args.slice(1).join(" ");
    const url = `https://some-random-api.ml/lyrics?title=${name}`;

    let res;
    res = await fetch(url).then(url => url.json());

    if (!name) {
        const noname = new Discord.MessageEmbed()
            .setTitle("You Need To Search For A Song!!")
            .setColor(0xff0000)
            .setFooter(message.guild.me.displayName)
            .setTimestamp()
        message.channel.send(noname);
    } else {
        message.channel.send(res.lyrics, { split: true })
    }
};

module.exports.config = {
    name: "lyrics",
    description: "A Command To View The Lyrics Of The Song!",
    usage: "+lyrics [song]",
    accessableby: "Members",
    aliases: ["lyc"]
}
