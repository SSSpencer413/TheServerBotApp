const error = require("./Special/Error.js");
const fs = require("fs");
const ownerlist = require("./Special/owners.json");
const bannedUsers = require("./Special/bannedUsers.json");
exports.run = (client, msg, args) => {
  const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
 //<:Checkmark:370726078857084938> <:CrossMark:370726096188080158>
  let member = msg.mentions.members.first();
  if(member == undefined || member == null) member = msg.member;



  msg.channel.send({embed: {
    color: 9936031,
    title: "Misc",
    description: `Here is some info on ${member.id == msg.author.id? "your": `${member}'s`} account:`,
    thumbnail: {
      "url": member.user.displayAvatarURL
    },
    fields: [
      {
        name: "Basic Identification:",
        value: `**Name**: ${member.user.username} #${member.user.discriminator} \n**ID**: ${member.id}\n**Bot**: ${member.user.bot}`
      },
      {
        name: "Guild Info:",
        value: `**Display Name**: ${member.displayName}\n**Owner**: ${member.guild.owner.id == member.id ? "true":"false"}\n**Joined**: ${member.joinedAt}`
      },
      {
        name: "Created:",
        value: `${member.user.createdAt}`,
        inline: true
      },
      {
        name: "Bot Permission Level:",
        value: `${getRole(member)}`,
        inline: true
      },
    ]
  }});
}

function getRole(member) {
  let roles = member.roles
  if(ownerlist[member.id]) {
    return "Owner";
  } else if(bannedUsers[member.id]) {
    return "Banned";
  } else if(roles.find("name", "S̕̕͡ì̛̆l̎̋͞e̔̓͂ñ̍͝č̾͡ȅ̀̕d̈́͒͡")) {
    return "S̕̕͡ì̛̆l̎̋͞e̔̓͂ñ̍͝č̾͡ȅ̀̕d̈́";
  } else if(roles.find("name", "BotManager")) {
    return "BotManager";
  } else if(roles.find("name", "BotAdmin")) {
    return "BotAdmin";
  } else {
    return "Member";
  }
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Get info on a user!";
  info.Name = "userinfo";
  info.Usage = "userinfo (@User)";
  info.Example = "s!userinfo @M2Paint#1123";
  info.Category = "Misc";
  info.Color = 9936031;

  return info;
}
