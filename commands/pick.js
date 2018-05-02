
const error = require("./Special/Error.js");
exports.run = (client, msg, args) => {
  let newargs = args.join(" ");
  let list = newargs.split(";");

  if (list.length <= 1|| !list) return error.fire(msg, "Please provide multiple options! Items are separated by ';'");

  let reaction = Math.floor(Math.random() * list.length);
  msg.channel.send({embed: {
    color: 16776960,
    title: "Fun",
    description: `Result: **${list[reaction]}**`,
  }
});
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Pick an item from a list! Items are separated by a ';'!";
  info.Name = "pick";
  info.Usage = "pick <Options>";
  info.Example = "s!pick Chocolate;Strawberry;Boring Vanilla";
  info.Category = "Fun";
  info.Color = 16776960;

  return info;
}
