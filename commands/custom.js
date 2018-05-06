const error = require("./Special/Error.js");
exports.run = (client, msg, args) => {

  msg.channel.send({
    embed: {
    color: 9936031,
    title: "Coming Soon!!!",
    description:"You have found a secret!!",
  }
});
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Custom commands maybe? ;)";
  info.Name = "custom";
  info.Usage = "custom <CmdName>";
  info.Example = "s!custom pling";
  info.Category = "Misc";
  info.Color = 9936031;

  return info;
}
