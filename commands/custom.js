const error = require("./Special/Error.js");
exports.run = (client, msg, args) => {

  msg.channel.send({
    embed: {
    color: 16776960,
    title: "Coming Soon!!!",
    description:"You have found a secret!!",
  }
});
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Shows the pong.";
  info.Name = "pong";
  info.Usage = "pong";
  info.Example = "s!pong";
  info.Category = "Fun";
  info.Color = 16776960;

  return info;
}
