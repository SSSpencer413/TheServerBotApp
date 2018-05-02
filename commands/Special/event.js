
exports.fire = (client, msg, args) => {
  if (args[0] == "Update") {
    let text = args.slice(1).join(" ");
    notify(client, args[0], text);
    client.user.setPresence({
    status: "idle",
    game:{
      name: `Update Notice: ${text}`,
      type: "WATCHING"
    }});
  } else if (args[0] == "Alert") {
    let text = args.slice(1).join(" ");
    notify(client, args[0], text);
    client.user.setPresence({
    status: "dnd",
    game:{
      name: `ALERT: ${text}`,
      type: "WATCHING"
    }});
  } else if (args[0] == "Special") {
    let text = args.slice(2).join(" ");
    notify(client, args[0], text, args[1]);
    client.user.setPresence({
    status: "online",
    game:{
      name: `${args[1]}: ${text}`,
      type: "WATCHING"
    }});
  } else {
    client.user.setPresence({
    status: "online",
    game:{
      name: `s!commands`,
      type: 3,
      url: "https://twitch.tv/twitch"
    }});
  }

}

const fs = require("fs");
const needle = require("needle");
function notify(client, status, text, title) {
    const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
    const colorlist = {
      "Alert": 15158332,
      "Update": 15105570,
      "Special": 3066993
    }
    var guilds = client.guilds.map(g=>{
      if (gsettings[g.id]) {
        if(gsettings[g.id].botChannel) {
          if (g.channels.get(gsettings[g.id].botChannel)) {
            g.channels.get(gsettings[g.id].botChannel).send({embed:{
              color : colorlist[status],
              title : status == "Special" ? title : status,
              description: text,
              timestamp: new Date(),
            }});
            console.log(`Announced to ${g.name} (${g.id})`);
            return g;
          }
        }
      }
    });

}
