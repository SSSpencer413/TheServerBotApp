
const error = require("./Special/Error.js");
exports.run = (client, msg, args) => {
  let num = parseInt(args[0]);
  if (!num) num = 10;

  let choice = Math.round(Math.random() * num);
  let percent = Math.round((choice/num) * 100);
  let perbarnum = Math.round((choice/num) * 10);
  let filledbar = "█".repeat(perbarnum);
  let emptybar = "▒".repeat(10-perbarnum);
  let bar = `${filledbar}${emptybar}`;

  msg.channel.send({embed: {
    color: 16776960,
    title: "Fun",
    description: `Rating: **${choice}/${num}**\n${bar} (${percent}%)`,
  }
});
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Gives a random rating out of 10 by default.";
  info.Name = "rate";
  info.Usage = "rate (MaxNumber)";
  info.Example = "s!rate 500 This server!";
  info.Category = "Fun";
  info.Color = 16776960;

  return info;
}
