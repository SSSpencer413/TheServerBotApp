const fs = require("fs")
const error = require("./Special/Error.js");
const needle = require("needle");

exports.run = (client, msg, args) => {
  let a = msg.channel.send({embed:{
    color: 9936031,
    title: "Misc",
    description: "Getting Status...",
    fields: [
      {
        name: "Main Server:",
        value: "<a:Loading:394129577720676354>",
        inline: true
      },
      {
        name: "Guild Settings Server:",
        value: "<a:Loading:394129577720676354>",
        inline: true
      },
      {
        name: "Currency Server:",
        value: "<a:Loading:394129577720676354>",
        inline: true
      },
    ]
  }}).then(message => {
    getStatus().then((r) => {
      message.edit({embed:{
        color: 9936031,
        title: "Misc",
        description: "Status:",
        fields: [
          {
            name: "Main Server:",
            value: r[0] == true ? "<:Checkmark:370726078857084938>" : "<:CrossMark:370726096188080158>",
            inline: true
          },
          {
            name: "Guild Settings Server:",
            value: r[1] == true ? "<:Checkmark:370726078857084938>" : "<:CrossMark:370726096188080158>",
            inline: true
          },
          {
            name: "Currency Server:",
            value: r[2] == true ? "<:Checkmark:370726078857084938>" : "<:CrossMark:370726096188080158>",
            inline: true
          },
        ]
      }});
    });
  });

}
function getStatus() {
  return new Promise ((resolve, reject) => {
    let t = {}
    t[0] = true
    needle.get("http://theserverbot.gearhostpreview.com/guildSettings?key="+process.env.APIKey, function(e, r) {
      if (!e && r.statusCode == 200) {
        t[1] = true
      } else {
        t[1] = false
      }
      needle.get("http://theserverbot.gearhostpreview.com/currency?key="+process.env.APIKey, function(er, rq) {
        if (!er && rq.statusCode == 200) {
          t[2] = true
        } else {
          t[2] = false
        }
        resolve(t);
      });
    });
  });
}


exports.help = (client, msg) => {
  let info = {};
  info.Description = "Shows the status of the servers!";
  info.Name = "status";
  info.Usage = "status";
  info.Example = "s!status";
  info.Category = "Misc";
  info.Color = 9936031;

  return info;
}
