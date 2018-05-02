const error = require("./Special/Error.js");
exports.run = (client, msg, args) => {

  let updsideDown = {
    "0": "0",
    "1": "l",
    "2": "ᄅ",
    "3": "E",
    "4": "力",
    "5": "S",
    "6": "9",
    "7": "L",
    "8": "8",
    "9": "6",
  }
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
function updsideDownify(str) {
  var chars = str.split("");
  var length = chars.length;
  for (var i = 0; i < length; i++) {
    if (updsideDown[chars[i]]) {
      chars[i] = updsideDown[chars[i]]
    }
  }
  return chars.join("");
}
let ping = reverse(`${Date.now() - msg.createdTimestamp}`);


  msg.channel.send({
    embed: {
    color: 16776960,
    title: "unℲ",
    description:"`"+updsideDownify(ping)+"` ¡ƃuᴉd",
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
