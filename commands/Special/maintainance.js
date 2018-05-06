
exports.fire = (client, msg, args) => {
  if (args[0] == "true") {
    let text = args.slice(1).join(" ");
    notify(client, "Announcement", text);
    client.user.setPresence({
    status: "dnd",
    game:{
      name: `Announcement from ${msg.author.username}:\n${text}`,
      type: "PLAYING"
    }});
  } else if (args[0] == "false") {
    client.user.setPresence({
    status: "online",
    game:{
      name: `s!commands`,
      type: 3,
      url: "https://twitch.tv/twitch"
    }});
  } else {
    notify(client, "Maintainance", "The bot is on maintainance mode!");
    client.user.setPresence({
    status: "idle",
    game:{
      name: `Maintainance Mode - Expect shutdowns and breakages!`,
      type: "WATCHING"
    }});
  }

}
const fs = require("fs");
const needle = require("needle");
function notify(client, status, text) {
    const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
    const colorlist = {
      "Announcement": 15158332,
      "Maintainance": 15105570
    }
    var guilds = client.guilds.map(g=>{
      if (gsettings[g.id]) {
        if(gsettings[g.id].botChannel) {
          if (g.channels.get(gsettings[g.id].botChannel)) {
            g.channels.get(gsettings[g.id].botChannel).send({embed:{
              color : colorlist[status],
              title : status,
              description: text,
              timestamp: new Date(),
            }});
            return g;
          }
        }
      }
    });

}
