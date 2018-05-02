
const error = require("./Special/Error.js");
exports.run = (client, msg, args) => {

  const replies = [
    "Yes.",
    "No.",
    "Maybe.",
    "Unclear.",
    "Refocus your ~~hatred~~ *energy.",
    "It is certain.",
    "Look, I have better things to do.",
    "*When HL3 comes out.*",
    "It seems so.",
    "It is decidedly so",
    "Without a doubt",
    "Yes – definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most Likely",
    "Outlook good",
    "Signs point to yes",
    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Ask someone else about that, I'm not sure... 🤔",
    "Very doubtful"
  ]
  let reaction = Math.floor(Math.random() * replies.length);
  msg.channel.send({embed: {
    color: 16776960,
    title: "Fun",
    description: replies[reaction],
  }
});
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Ask the magic 8ball for answers!";
  info.Name = "8ball";
  info.Usage = "8ball <Question>";
  info.Example = "s!8ball How are you?";
  info.Category = "Fun";
  info.Color = 16776960;

  return info;
}
