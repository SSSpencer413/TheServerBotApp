const error = require("./Special/Error.js");
const needle = require('needle');
const cfunctions = require('./Special/currency.js');

exports.run = (client, msg, args) => {
  cfunctions.getList().then(list => {
    let listarray = Object.entries(list);
    // sort by value
    listarray.sort(function (a, b) {
      return a[1].Credits[msg.guild.id] - b[1].Credits[msg.guild.id];
    });
    let leaderboard = {}
    listarray.forEach(function(key) {
      leaderboard[key[0]] = key[1].Credits[msg.guild.id]
    });
    for (var key in leaderboard) {
    // skip loop if the property is from prototype
    if (!leaderboard.hasOwnProperty(key)) continue;

    var obj = leaderboard[key];
      if (!obj) {
        delete leaderboard[key];
      }
    }
    let leaderarray = Object.keys(leaderboard).map(function(k){
      return [k, leaderboard[k]];
    });
    leaderarray.sort(function(a, b){
      return b[1] - a[1];
    });
  let text = "";
    for(i=0; i < 10; i++) {
      if (leaderarray[i]) {
        text = text+`${i+1}. <@${leaderarray[i][0]}> - ${leaderarray[i][1]} Credits${i==0 ? "<:GoldTrophy:381596756204322816>":""}\n`
      }
    }
    msg.channel.send({embed: {
      title: "Economy",
      color: 3066993,
      description: `*Here are the richest people in this server:*\n\n${text}`
    }});
  });
}


exports.help = (client, msg) => {
  let info = {};
  info.Description = "Look at the top 10 richest users in the server!";
  info.Name = "leaderboard";
  info.Usage = "leaderboard";
  info.Example = "s!leaderboard";
  info.Category = "Economy";
  info.Color = 3066993;

  return info;
}
