const error = require("./Special/Error.js");
const ownerlist = require("./Special/owners.json");
const fs = require("fs");
const needle = require("needle");
exports.run = (client, msg, args) => {
  const acceptedRoles = ["BotManager"];
  let hasAccRole = msg.member.roles.some(role => acceptedRoles.includes(role.name));
  if(ownerlist[msg.author.id]) {
    hasAccRole = true
  } else if (msg.guild.owner.id == msg.author.id) {
    hasAccRole = true
  }

  if(!hasAccRole)
   return error.fire(msg, `You can't use this command!`);
   if (args[0] == "none") {
     setmodChannel(msg, "none");
   } else {
     setmodChannel(msg, msg.channel);
  }
}

function setmodChannel(msg, channel) {
  const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
  var text = `The mod channel has been set to: **${msg.guild.channels.get(gsettings[msg.guild.id].modChannel)}**`;
  if (channel == "none") {
    gsettings[msg.guild.id].modChannel = null;
    text = `The mod channel has been removed!`;
  } else {
    gsettings[msg.guild.id].modChannel = channel.id;
    text = `The mod channel has been set to: **${msg.guild.channels.get(gsettings[msg.guild.id].modChannel)}**`;
  }
  fs.writeFile("./commands/Special/gsettings.json", JSON.stringify(gsettings), (err) => {
    if (err) console.error(err)
  });
  needle.post("http://theserverbot.gearhostpreview.com/guildSettings?key="+process.env.APIKey, gsettings, {content_type:"application/json"}, function(er,re){
    if (!er && re.statusCode == 200) {
      msg.channel.send({embed:{
          color: 9936031,
          title: "Misc",
          description: text,
        }});
    }
  });
}


exports.help = (client, msg) => {
  let info = {};
  info.Description = "Set the current channel to the channel where the bot will post warnings and stuff. (Typing 'none' will remove the channel!)";
  info.Name = "setModChannel";
  info.Usage = "setModChannel (none)";
  info.Example = "s!setModChannel";
  info.Category = "Misc";
  info.Color = 9936031;

  return info;
}
