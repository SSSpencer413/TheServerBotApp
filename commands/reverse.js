const error = require("./Special/Error.js");
exports.run = (client, msg, args) => {
function reverse(str) {
  var chars = str.split("");
  var length = chars.length;
  var half = length / 2;
  for (var i = 0; i < half; i++) {
    var temp = chars[i];
    var mirror = length - i - 1;
    chars[i] = chars[mirror];
    chars[mirror] = temp;
  }
  return chars.join("");
}

  let message = args.join(" ")
  if(!message == undefined) return error.run(msg, "Please provide a string!");

  msg.channel.send({
    embed: {
    color: 16776960,
    title: "nuF",
    description: reverse(message),
  }
});
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Reverse a string!";
  info.Name = "reverse";
  info.Usage = "reverse <String>";
  info.Example = "s!reverse Hello world!";
  info.Category = "Fun";
  info.Color = 16776960;

  return info;
}
