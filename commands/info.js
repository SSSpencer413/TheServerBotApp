const fs = require("fs")
const error = require("./Special/Error.js");
const needle = require("needle");
var v = "1.1.4 S0"

exports.run = (client, msg, args) => {
  var Announcement = client.user.presence.status == "dnd" ? client.user.presence.game.name : "none";
  msg.channel.send({embed:{
    color: 9936031,
    title: "Misc",
    description: "Here's some info on my shard!",
    fields: [
      {
        name: "Shard ID:",
        value: client.shard.id,
        inline: true
      },
      {
        name: "Version:",
        value: `v${v}`,
        inline: true
      },
      {
        name: "Creators:",
        value: `**SSSpencer413#4245**\n**MaximusTribee#1266**`,
        inline: true
      },
      {
        name: "Library:",
        value: "discord.js",
        inline: true
      },
      {
        name: "Help:",
        value: "Use `s!commands` for a list of commands.\nClick [here](https://discord.gg/WAT4R33, 'Join plz!') to join the official server!\nClick [here](https://ssspencer413.github.io/theserverbot) to visit the website!\nClick [here](https://www.patreon.com/TheServerBot) to support us on Patreon!",
        inline: true
      },
      {
        name: "Announcement:",
        value: `${Announcement}`,
        inline: true
      },
    ]
  }});
}


exports.help = (client, msg) => {
  let info = {};
  info.Description = "Get info on the shard.";
  info.Name = "info";
  info.Usage = "info";
  info.Example = "s!info";
  info.Category = "Misc";
  info.Color = 9936031;

  return info;
}
