const error = require("./Special/Error.js");
const ownerlist = require("./Special/owners.json");
const needle = require("needle");
const fs = require("fs");
exports.run = (client, msg, args) => {
  const acceptedRoles = ["BotManager", "BotAdmin"];
  let hasAccRole = msg.member.roles.some(role => acceptedRoles.includes(role.name));
  if(ownerlist[msg.author.id]) {
    hasAccRole = true
  } else if (msg.guild.owner.id == msg.author.id) {
    hasAccRole = true
  }

  if(!hasAccRole)
   return error.fire(msg, `You can't use this command!`);

   let Id = args[0] == "0"? 0 : parseInt(args[0]);
   let mes = args.splice(0, 1);
   let reason = args.join(" ");

   removewarn(msg, Id, reason);


}
function removewarn(msg, id, reason) {
  const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
  needle.get("http://theserverbot.gearhostpreview.com/moderation?key="+process.env.APIKey, function(e, r) {
    if (!e && r.statusCode == 200) {
        let body = r.body;
        if (body[msg.guild.id] == undefined) {
          return error.fire(msg, "That ID wasn't found!");
        } else {
          if (body[msg.guild.id][id-1]) {
            const data = body[msg.guild.id][id];
            body[msg.guild.id][id] = false;
            needle.post("http://theserverbot.gearhostpreview.com/moderation?key="+process.env.APIKey, body, {content_type:"application/json"}, function(re, er){
              if (!e && r.statusCode == 200) {
                if (gsettings[msg.guild.id]) {
                  if(gsettings[msg.guild.id].modChannel) {
                    if (msg.guild.channels.get(gsettings[msg.guild.id].modChannel)) {
                      msg.guild.channels.get(gsettings[msg.guild.id].modChannel).send({embed:{
                        color: 15105570,
                        title: "Utility",
                        description: `Sucessfully removed warning!`,
                        fields:[
                          {
                            name: "User:",
                            value: `<@${data.user}>`,
                            inline: true
                          },
                          {
                            name: "Moderator:",
                            value: `<@${data.moderator}>`,
                            inline: true
                          },
                          {
                            name: "Orginal Reason:",
                            value: `${data.reason}`,
                            inline: true
                          },
                          {
                            name: "Reason for Removal:",
                            value: `${!reason ? `none`: reason}`,
                            inline: true
                          },
                          {
                            name: "ID:",
                            value: `${id}`,
                            inline: true
                          },
                        ],
                        timestamp: new Date()
                      }});
                    }
                  }
                }
              }
            });

          } else return error.fire(msg, "That ID wasn't found!");
        }
    }
  });
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Remove a warn.";
  info.Name = "resolve";
  info.Usage = "resolve <ID> (reason)";
  info.Example = "s!resolve 4 False alarm!";
  info.Category = "Utility";
  info.Color = 15105570;

  return info;
}
