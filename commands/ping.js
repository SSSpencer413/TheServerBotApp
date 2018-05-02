const error = require("./Special/Error.js");
exports.run = (client, msg, args) => {


  msg.channel.send({embed: {
    color: 16776960,
    title: "Fun",
    description: "pong! `"+ `(${Date.now() - msg.createdTimestamp})`+"`",
  }});
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Shows the ping.";
  info.Name = "ping";
  info.Usage = "ping";
  info.Example = "s!ping";
  info.Category = "Fun";
  info.Color = 16776960;

  return info;
}
