const Discord = module.require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
    let name = args.slice(1).join(" ");
    const url = `https://some-random-api.ml/pokedex?pokemon=${name}`;

    let res;
    res = await fetch(url).then(url => url.json())

    if (!name) {
        const noname = new Discord.MessageEmbed()
            .setTitle("You Need To Search For An Pokemon!!")
            .setColor(0xff0000)
            .setFooter("IAT Bot")
            .setTimestamp()
        message.channel.send(noname);
    } else {
        try{
        const pokeinfo = new Discord.MessageEmbed()
            .setAuthor(`Info Of ${name}`, message.author.displayAvatarURL)
            .addField('Name', res.name)
            .addField('Type', res.type[0])
            .addField('Species', res.species[0])
            .addField('Abilities', res.abilities[0] + ", " + res.abilities[1])
            .addField('Height', res.height)
            .addField('Weight', res.weight)
            .addField('Base Experience', res.base_experience)
            .addField('Gender', res.gender[0] + ", " + res.gender[1])
            .addField('Egg Groups', res.egg_groups[0] + ", " + res.egg_groups[1])
            .addField('Stats', 'Hp - ' + "-" + res.stats.hp + '\nAttack - ' + "-" + res.stats.attack + '\nDefense - ' + "-" + res.stats.defense + '\nSp_Atk - ' + res.stats.sp_atk + '\nSp_Def - ' + res.stats.sp_def + '\nSpeed - ' + res.stats.speed + '\nTotal - ' + res.stats.total)
            .addField('Evolution', res.family.evolutionLine + ".")
            .addField('Description', res.description)
            .addField('Generation', res.generation)
            .setThumbnail(res.sprites.normal)
            .setColor("GOLD")
        message.channel.send(pokeinfo);
    } catch(e){
    	console.log(e);
    	return message.channel.send(new Discord.MessageEmbed().setTitle("Error! Cannot Find That Pokemon!").setColor(0xff0000).setTimestamp().setFooter("IAT Bot"))
    }
    }
};

module.exports.config = {
    name: "pokemon",
    description: "A Command To View The Info Of Any Pokemon!",
    usage: "+pokemon",
    accessableby: "Members",
    aliases: ["pokeinfo", "poke"]
}
