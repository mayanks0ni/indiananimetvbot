const Discord = module.require("discord.js");
const randomPuppy = require("random-puppy");

module.exports.run = async (bot, message, args) => {
	const subReddits = ["meme",
		"animemes",
		"MemesOfAnime",
		"animememes",
		"AnimeFunny",
		"dankmemes",
		"dankmeme",
		"wholesomememes",
		"MemeEconomy",
		"techsupportanimals",
		"meirl",
		"me_irl",
		"2meirl4meirl",
		"AdviceAnimals"
	];

	const random = subReddits[Math.floor(Math.random() * subReddits.length)];


	const img = await randomPuppy(random);
	const memeembed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setImage(img)
		.setTitle(`From /r/${random}`)
		.setURL(`https://reddit.com/r/${random}`);

	message.channel.send(memeembed);
};

module.exports.config = {
	name: "meme",
	description: "A Command To View Memes From Reddit!",
	usage: "+meme",
	accessableby: "Members",
	aliases: [""]
}
