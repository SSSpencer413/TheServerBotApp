const error = require("./Special/Error.js");
const fs = require("fs");
exports.run = (client, msg, args) => {
  const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
  let cbotchannel = false;
  let prefix = "s/";
  let pvp = false;
  let certified = false;
  if (gsettings[msg.guild.id]) {
    if(gsettings[msg.guild.id]['botChannel']) {
      if (msg.guild.channels.get(gsettings[msg.guild.id].botChannel)) {
        cbotchannel = msg.guild.channels.get(gsettings[msg.guild.id].botChannel);
      }
    }
    if(gsettings[msg.guild.id]['prefix']) {
      prefix = gsettings[msg.guild.id].prefix;
    }
    if(gsettings[msg.guild.id]['pvp']) {
      pvp = gsettings[msg.guild.id].pvp;
    }
    if(gsettings[msg.guild.id]['certification']) {
      certified = true;
    }
  } //<:Checkmark:370726078857084938> <:CrossMark:370726096188080158>
  msg.channel.send({embed: {
    color: 9936031,
    title: "Misc",
    description: `Here is some info on ${msg.guild.owner.id == msg.author.id? "your": "this"} server:`,
    thumbnail: {
      "url": msg.guild.iconURL
    },
    fields: [
      {
        name: "Basic Info:",
        value: `**Name**: ${msg.guild.name} (${msg.guild.nameAcronym}) \n**ID**: ${msg.guild.id}\n**Region**: ${msg.guild.region}`
      },
      {
        name: "Owner:",
        value: `${msg.guild.owner.id == msg.author.id? `You (${msg.guild.owner})` : msg.guild.owner}`
      },
      {
        name: "Created:",
        value: `${msg.guild.createdAt}`,
        inline: true
      },
      {
        name: "Members:",
        value: `${msg.guild.memberCount} members`,
        inline: true
      },
      {
        name: "Bot Channel:",
        value: `${cbotchannel ? cbotchannel : "None"}`,
        inline: true
      },
      {
        name: "Prefix:",
        value: `${prefix}`,
        inline: true
      },
      {
        name: "PvP:",
        value: `${pvp == true ? "Enabled" : "Disabled"}`,
        inline: true
      },
      {
        name: "Seal:",
        value: `${certified == true ? `<:TheServerBotCertified:381632995917824015>` : `None`}`,
        inline: true
      },
    ]
  }});
}


exports.help = (client, msg) => {
  let info = {};
  info.Description = "Get info on the server!";
  info.Name = "serverinfo";
  info.Usage = "serverinfo";
  info.Example = "s!serverinfo";
  info.Category = "Misc";
  info.Color = 9936031;

  return info;
}
