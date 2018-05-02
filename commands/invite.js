const error = require("./Special/Error.js");
exports.run = (client, msg, args) => {
  msg.channel.send({embed: {
    color: 9936031,
    title: "Misc",
    description: "Here's a link to invite me and to the official Discord Server!",
    fields: [
      {
          name: "Link",
          value: "Click [here](https://discordapp.com/oauth2/authorize?client_id=358350504129986570&scope=bot&permissions=8) to invite me!",
          inline: true
      },
      {
          name: "Discord Server",
          value: "Join [this server](https://discord.gg/WAT4R33) if you have questions!",
          inline: true
      },
      {
          name: "Website",
          value: "Click [here](https://ssspencer413.github.io/theserverbot) to visit the website!",
          inline: true
      },
      {
          name: "Support us on Patreon!",
          value: "Click [here](https://www.patreon.com/TheServerBot) to support us on Patreon!",
          inline: true
      },

    ],
    footer: {
      text: "Remember to use s!setup if you are the owner of the server!"
    }
  }});
}


exports.help = (client, msg) => {
  let info = {};
  info.Description = "Invite the bot to your server!";
  info.Name = "invite";
  info.Usage = "invite";
  info.Example = "s!invite";
  info.Category = "Misc";
  info.Color = 9936031;

  return info;
}
