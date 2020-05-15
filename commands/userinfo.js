const Discord = module.require("discord.js");
const moment = require("moment");

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};

module.exports.run = async (bot, message, args) => {
    var permissions = [];
    var acknowledgements = 'None';
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.member;

    if (member.permissions.has("KICK_MEMBERS")) {
        permissions.push("Kick Members");
    }

    if (member.permissions.has("BAN_MEMBERS")) {
        permissions.push("Ban Members");
    }

    if (member.permissions.has("ADMINISTRATOR")) {
        permissions.push("Administrator");
    }

    if (member.permissions.has("MANAGE_MESSAGES")) {
        permissions.push("Manage Messages");
    }

    if (member.permissions.has("MANAGE_CHANNELS")) {
        permissions.push("Manage Channels");
    }

    if (member.permissions.has("MENTION_EVERYONE")) {
        permissions.push("Mention Everyone");
    }

    if (member.permissions.has("MANAGE_NICKNAMES")) {
        permissions.push("Manage Nicknames");
    }

    if (member.permissions.has("MANAGE_ROLES")) {
        permissions.push("Manage Roles");
    }

    if (member.permissions.has("MANAGE_WEBHOOKS")) {
        permissions.push("Manage Webhooks");
    }

    if (member.permissions.has("MANAGE_EMOJIS")) {
        permissions.push("Manage Emojis");
    }

    if (member.permissions.has("SEND_MESSAGES")) {
        permissions.push("Send Messages");
    }

    if (member.permissions.has("READ_MESSAGES")) {
        permissions.push("Read Messages");
    }

    if (member.permissions.has("ADD_REACTIONS")) {
        permissions.push("Add Reactions");
    }

    if (member.permissions.has("ATTACH_FILES")) {
        permissions.push("Attach Files");
    }

    if (member.permissions.has("CHANGE_NICKNAME")) {
        permissions.push("Change Nickname");
    }

    if (member.permissions.has("CONNECT")) {
        permissions.push("Connect");
    }

    if (member.permissions.has("DEAFEN_MEMBERS")) {
        permissions.push("Deafen Members");
    }

    if (member.permissions.has("READ_MESSAGE_HISTORY")) {
        permissions.push("Read Message History");
    }

    if (member.permissions.has("MUTE_MEMBERS")) {
        permissions.push("Mute Members");
    }

    if (member.permissions.has("SPEAK")) {
        permissions.push("Speak");
    }

    if (permissions.length == 0) {
        permissions.push("No Permissions Found!");
    }

    if (`<@${member.user.id}>` == message.guild.owner) {
        acknowledgements = 'Server Owner';
    }
    if(permissions.length > 6){

    }

    const embed = new Discord.MessageEmbed()
        .setDescription(`<@${member.user.id}>`)
        .setAuthor(`${member.user.tag}`, member.user.avatarURL({format: 'png', dynamic:true, size:1024}))
        .setColor("RANDOM")
        .setFooter(`ID - ${member.id}`)
        .setThumbnail(member.user.displayAvatarURL)
        .setTimestamp()
        .addField("Status", `${status[member.user.presence.status]}`, true)
        .addField('Joined at: ', `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
        .addField(" Account Created at: ", `${moment(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
        .addField("Permissions: ", `${permissions.join(', ')}`, true)
        .addField(`Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`, `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(" **|** ") || "No Roles"}`, true)
        .addField("Acknowledgements: ", `${acknowledgements}`, true);

    message.channel.send({ embed });

};
module.exports.config = {
    name: "userinfo",
    description: "A Command To Vjew The Userinfo Of Yourself Or An User!",
    usage: "+userinfo [user]",
    accessableby: "Members",
    aliases: ["ui"]
}
