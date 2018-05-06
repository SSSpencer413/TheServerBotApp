const error = require("./Special/Error.js");
const needle = require('needle');
exports.run = (client, msg, args) => {

  let message = args.join(" ");
  if(!message == undefined) return error.run(msg, "Please provide a message!");

  var data = {};
  data.embeds = [{
    color: 3447003,
    author: {
      name: `${msg.author.username} #${msg.author.discriminator}`,
      icon_url: msg.author.avatarURL
    },
    description: message,
    timestamp: new Date(),
  }];
  data.username = msg.guild.name;
  data.avatar_url = msg.guild.iconURL;
  needle.post("https://discordapp.com/api/webhooks/377946032765665291/"+process.env.Board_Webhook, data, {content_type:"application/json"})
  msg.channel.send({embed: {
    color: 16776960,
    title: "Fun",
    description: `Posted to the [board](https://discord.gg/MpMXhRa)! Go ahead and view it on our discord server!`,
  }});
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Post a message on the board!";
  info.Name = "board";
  info.Usage = "board <Message>";
  info.Example = "s!board Hellow world!";
  info.Category = "Fun";
  info.Color = 16776960;

  return info;
}
