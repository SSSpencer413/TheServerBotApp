const fs = require("fs")
const error = require("./Special/Error.js");
const needle = require("needle");

exports.run = (client, msg, args) => {
  var gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
  var server = msg.guild
  if (gsettings[server.id]) {
    if (!args[0] || (server.ownerID !== msg.author.id && msg.author.id !== "180803410306662401")) return msg.channel.send({embed: {
        color: 9936031,
        title: "Misc",
        description: `The current prefix is: **${gsettings[server.id].prefix}**`,
      }});
      updatePrefix(server, args[0], msg, gsettings)
  }

}

function updatePrefix(server, pre, msg, gsettings) {
  gsettings[server.id].prefix = pre
  fs.writeFile("./commands/Special/gsettings.json", JSON.stringify(gsettings), (err) => {
    if (err) console.error(err)
  });
  needle.post("http://theserverbot.gearhostpreview.com/guildSettings?key="+process.env.APIKey, gsettings, {content_type:"application/json"}, function(er,re){
    if (!er && re.statusCode == 200) {
      msg.channel.send({embed:{
          color: 9936031,
          title: "Misc",
          description: `The prefix has been updated to: **${gsettings[server.id].prefix}**`,
        }});
    } else console.log(`${er} ${re.statusCode}`);
  });
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Check the prefix of the server.  If you are the owner, you may set the prefix.";
  info.Name = "prefix";
  info.Usage = "prefix (Prefix)";
  info.Example = "s!prefix !";
  info.Category = "Misc";
  info.Color = 9936031;

  return info;
}
