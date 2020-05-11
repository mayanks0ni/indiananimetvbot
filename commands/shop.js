const Discord = require("discord.js");
const sqlite = require("sqlite3");

module.exports.run = async (bot, message, args) => {
  const diamond = bot.emojis.cache.get("706515264451117109");
  let shopDB = new sqlite.Database("./database/shop.db", err => {
    if(err) console.error(err);
  });

  let itemShop = new sqlite.Database("./database/itemshop.db", err => {
    if(err) console.error(err);
  });

  let preshop = new sqlite.Database("./database/pshop.db", err => {
    if(err) console.error(err);
  })

  const shop = new Discord.MessageEmbed()
  .setAuthor("🛒 Shop! 🛒")
  .setTitle(`What Are You Going To Buy Today?`)
  .addField("**🛍️ Item Shop 🛍**️", "**React With 🛍️ To View Items!**")
  .addField("**⚔️ Role Shop ⚔️**", "**React With ⚔️ To View Roles!**")
  .addField("**💰 Premium Shop 💰**", "**React With 💰 To View Premium Items!**")
  .setColor(0xff00c3)
  .setFooter(message.guild.me.displayName)
  .setTimestamp()
  const sShop = await message.channel.send(shop);
  await sShop.react("🛍️")
  await sShop.react("⚔️")
  await sShop.react("💰")
  const filter = (reaction, user) => {
      return ['🛍️', '⚔️', '💰'].includes(reaction.emoji.name) && user.id === message.author.id;
  };
  sShop.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
          const reaction = collected.first();

          if (reaction.emoji.name === '🛍️') {
            itemShop.all(`SELECT * FROM itemshop`, (err, rows) => {
              if(err){
                console.error(err);
                return;
              }
              if(rows === undefined) return message.channel.send(new Discord.MessageEmbed().setTitle("There's Nothing In The Item Shop!").setColor(0xff00c3).setFooter(message.guild.me.displayName).setTimestamp());
              var a;
              const shopItem = new Discord.MessageEmbed()
              .setTitle("🛍️ Item Shop 🛍️")
              .setColor(0xff0053)
              .setFooter(message.guild.me.displayName)
              .setThumbnail(bot.user.displayAvatarURL())
              .setTimestamp()
              for(a=0;a<rows.length;a++){
                const rs = rows[a];
                shopItem.addField(`**\`#${a+1}\`${rs.item}**`, `**Price: ${rs.price}${diamond}\n${rs.Description}\nTo Buy Send \`+buy item ${rs.id}\`**`)
              }
              sShop.edit(shopItem);
              sShop.reactions.removeAll();
            });
          }
          if (reaction.emoji.name === '⚔️') {
            shopDB.all(`SELECT * FROM roleshop WHERE guildid = '${message.guild.id}'`, (err, rows) =>{
                if(err){
                  console.error(err);
                  return;
                }
                if(rows === undefined) return message.channel.send(new Discord.MessageEmbed().setTitle("There's Nothing In The Role Shop!").setColor(0xff00c3).setFooter(message.guild.me.displayName).setTimestamp());
                var i;
                const roleShop = new Discord.MessageEmbed()
                .setTitle("⚔️ Role Shop ⚔️")
                .setThumbnail(bot.user.displayAvatarURL())
                .setFooter(message.guild.me.displayName)
                .setColor(0xff00c3)
                .setTimestamp()
                for(i=0;i<rows.length;i++){
                  const rs = rows[i]
                  roleShop.addField(`**${rs.role}**`, `**Price: ${rs.price}${diamond} \nTo Buy Send \`+buy role ${rs.id}\`**`)
                }
                sShop.edit(roleShop);
                sShop.reactions.removeAll();
              });
          }
          if (reaction.emoji.name === '💰') {
             preshop.all(`SELECT * FROM pshop`, (err, rows) => {
              if(err){
                console.log(err);
                return;
              }
              if(rows === undefined) return message.channel.send(new Discord.MessageEmbed().setTitle("There's Nothing In The Premium Shop!").setColor(0xff00c3).setFooter(message.guild.me.displayName).setTimestamp());
              var i;
              const pShop = new Discord.MessageEmbed()
              .setTitle("💰 Premium Shop 💰")
              .setThumbnail(bot.user.displayAvatarURL())
              .setFooter(message.guild.me.displayName)
              .setColor(0xff00c3)
              .setTimestamp()
              for(i=0;i<rows.length;i++){
                const rs = rows[i]
                pShop.addField(`**${rs.item}**`, `**Price: ${rs.price}${diamond} \n${rs.description}\nTo Buy Send \`+buy premium ${rs.id}\`**`)
              }
              sShop.reactions.removeAll();
              sShop.edit(pShop);
              sShop.react('⏮️');
             })
          }
          if (reaction.emoji.name === '⏮️'){
            sShop.reactions.removeAll();
            sShop.edit(shopItem)
          }
        });

  if(args[1]){
    const owners = ["516247416878530560","477758607857942529","377132426599727133"];
    if(!owners.includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setTitle("This Is An Owner-Only Command!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
    const r = ["role"];
    if(!r.includes(args[1])) return message.channel.send(new Discord.MessageEmbed().setTitle("Invalid Arguement!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
    if (args[2]) {
      const ar = ["add", "remove"];
      if(!ar.includes(args[2])) return message.channel.send(new Discord.MessageEmbed().setTitle("Invalid Arguement!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
      if(args[2] === "add"){
        const roleName = args.slice(4).join(" ");
        const roleTofind = message.guild.roles.cache.find(r => r.name === roleName)
        if(!roleTofind) return message.channel.send(new Discord.MessageEmbed().setTitle("Invalid Role Name!\n(Type The Roles Exact Same Name.)").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        const price = args[3];
        shopDB.all(`INSERT INTO roleshop(role, price, guildid) VALUES('${roleName}', '${price}', '${message.guild.id}')`);
        message.channel.send(new Discord.MessageEmbed().setTitle("Role Added In The Shop!").setColor("GREEN").setFooter(message.guild.me.displayName).setTimestamp());
      } else {
        shopDB.all(`DELETE FROM roleshop WHERE guildid = '${message.guild.id}'`);
        message.channel.send(new Discord.MessageEmbed().setTitle("All Roles Have Been Removed From The Role Shop!").setColor("GREEN").setFooter(message.guild.me.displayName).setTimestamp());
        }
      }
    }
};

module.exports.config = {
    name: "shop",
    description: "A Command To View The Shop!",
    usage: "+shop",
    accessableby: "Members",
    aliases: [""]
}
