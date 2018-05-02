const fs = require("fs")
const error = require("./Special/Error.js");
const needle = require("needle");
const ownerlist = require("./Special/owners.json");

exports.run = (client, msg, args) => {
  const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
  var server = msg.guild
  const acceptedRoles = ["BotManager"];
  let hasAccRole = msg.member.roles.some(role => acceptedRoles.includes(role.name));
  if(ownerlist[msg.author.id]) {
    hasAccRole = true
  } else if (msg.guild.owner.id == msg.author.id) {
    hasAccRole = true
  }

  if (gsettings[server.id]) {
    if (!args[0] || !hasAccRole) return msg.channel.send({embed: {
        color: 7419530,
        title: "PVP",
        description: `PVP is: **${gsettings[server.id].pvp == true ? "on":"off"}**`,
      }});

      var toggle = (args[0] == "true" || args[0] == "on") ? true:false
      updatePvp(server, toggle, msg)
  }

}

function updatePvp(server, toggle, msg) {
  const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
  gsettings[server.id].pvp = toggle

  fs.writeFile("./commands/Special/gsettings.json", JSON.stringify(gsettings), (err) => {
    if (err) console.error(err)
  });
  needle.post("http://theserverbot.gearhostpreview.com/guildSettings?key="+process.env.APIKey, gsettings, {content_type:"application/json"}, function(er,re){
    if (!er && re.statusCode == 200) {
      msg.channel.send({embed:{
          color: 7419530,
          title: "PVP",
          description: `PVP is now **${toggle == true ? "on":"off"}**!`,
      }});
    } else {
      msg.channel.send({embed:{
          color: 7419530,
          title: "PVP",
          description: `PVP is now temporarily **${toggle == true ? "on":"off"}**!`,
      }});
    }
  });
}


exports.help = (client, msg) => {
  let info = {};
  info.Description = "Displays if the server has pvp on or off.  If you are Bot Manager+, you can set pvp.";
  info.Name = "pvp";
  info.Usage = "pvp (on/off)";
  info.Example = "s!pvp on";
  info.Category = "PVP";
  info.Color = 7419530;

  return info;
}
