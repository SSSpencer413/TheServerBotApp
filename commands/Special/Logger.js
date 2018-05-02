const needle = require("needle")
exports.log = (title, log, options) => {
  var data = {};
  data.embeds = [{
    color: 3447003,
    author: {
      name: title
    },
    description: log,
    timestamp: new Date(),
  }];
  needle.post("https://discordapp.com/api/webhooks/391617868195823627/izUlrc7r_fwDkMtS9kFpqDpvCI89yt23sSrAChRo8fXBJYohHFQjXTypC0IFMbaQlpuG", data, {content_type:"application/json"});
}
