const error = require("./Special/Error.js");
exports.run = (client, msg, args) => {

  let message = args.join(" ")
  if(!message == undefined) return error.run(msg, "Please provide a message!");

  msg.channel.send({embed: {
    color: 16776960,
    title: "Fun",
    description: message
  }
  });
console.log(`${msg.author} said ${message} with the bot.`);
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Make the bot say something.";
  info.Name = "say";
  info.Usage = "say <Message>";
  info.Example = "s!say Hello World!";
  info.Category = "Fun";
  info.Color = 16776960;

  return info;
}
