const error = require("./Special/Error.js");
const ownerlist = require("./Special/owners.json");
const needle = require('needle');
const cfunctions = require('./Special/currency.js');


exports.run = (client, msg, args) => {
  let code = args[0];
  needle.get("http://theserverbot.gearhostpreview.com/codes?key="+process.env.APIKey, function(e ,r) {
    if (!e && r.statusCode == 200) {
      if (r.body[code]) {
        if (r.body[code].expired) return error.fire(msg, `Code Expired!`);
        if (!r.body[code].users[msg.author.id]) {
          let amount = r.body[code].Reward;
          let body = r.body;
          body[code].users[msg.author.id] = true;
          cfunctions.getList().then(re => {
              if (re[msg.author.id]) {
                var objtable = re[msg.author.id];
                var ob = {"Credits": objtable.Credits[msg.guild.id],"Cubes": objtable["Cubes"]+amount, "id": msg.guild.id};
                cfunctions.updateBalance(r, msg.author, ob);

                needle.post("http://theserverbot.gearhostpreview.com/codes?key="+process.env.APIKey, body, {content_type:"application/json"}, function(err, res) {
                  return msg.channel.send({
                    embed: {
                    color: 16776960,
                    title: "Fun",
                    description:`Code redeemed!`,
                  }});
                });
              } else {
                var pretable = {"Credits":0, "Cubes":amount, "id":msg.guild.id}
                cfunctions.updateBalance(r, msg.author, pretable);
                needle.post("http://theserverbot.gearhostpreview.com/codes?key="+process.env.APIKey, body, {content_type:"application/json"}, function(err, res) {
                  return msg.channel.send({
                    embed: {
                    color: 16776960,
                    title: "Misc",
                    description:`Code redeemed!`,
                  }});
                });
              }
          });
        } else return error.fire(msg, `Already redeemed!`);
      } else return error.fire(msg, `Invalid Code!`);
    }
  });
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Redeem a code!";
  info.Name = "code";
  info.Usage = "code <Code>";
  info.Example = "s!code ThisIsAFreeCode";
  info.Category = "Misc";
  info.Color = 9936031;

  return info;
}
