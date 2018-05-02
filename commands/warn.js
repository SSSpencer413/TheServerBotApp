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


   let member = msg.mentions.members.first();
   if(member == undefined || member == null) return error.fire(msg, `Please ping someone to warn!`);
   if(member.id == msg.member.id || msg.guild.owner.id == member.id || member.id == "180803410306662401") return error.fire(msg, `That person cannot be warned!`);


   let mes = args.splice(0, 1);
   let reason = args.join(" ");
   if(!reason) return error.fire(msg, `You need a reason!`);
   let attachments = Array.from(msg.attachments)[0] == undefined ? undefined: Array.from(msg.attachments)[0][1].url;

   savewarn(msg, member, attachments, reason);
   member.send({embed:{
     color: 15105570,
     title: "Utility",
     description: `${msg.author} has warned you for: \n${reason}`
   }});

   msg.channel.send({embed:{
     color: 15105570,
     title: "Utility",
     description: `${member} been warned by ${msg.author}!`
   }});


}
function savewarn(msg, member, attachments, reason) {
  const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
  needle.get("http://theserverbot.gearhostpreview.com/moderation?key="+process.env.APIKey, function(e, r) {
    if (!e && r.statusCode == 200) {
        let body = r.body;
        let data = {};
        data["reason"] = reason;
        data["moderator"] = msg.author.id;
        data["attachments"] = attachments;
        data["timestamp"] = new Date();
        data["user"] = member.id;
        if (body[msg.guild.id] ==undefined) {
          data["id"] = 1;
          body[msg.guild.id] = [];
          body[msg.guild.id][0] = data;
        } else {
          let k = body[msg.guild.id].length;
          data["id"] = k;
          body[msg.guild.id][k] = data
        }
        needle.post("http://theserverbot.gearhostpreview.com/moderation?key="+process.env.APIKey, body, {content_type:"application/json"}, function(re, er){
          if (!e && r.statusCode == 200) {
            if (gsettings[msg.guild.id]) {
              if(gsettings[msg.guild.id].modChannel) {
                if (msg.guild.channels.get(gsettings[msg.guild.id].modChannel)) {
                  msg.guild.channels.get(gsettings[msg.guild.id].modChannel).send({embed:{
                    color: 15105570,
                    title: "Utility",
                    description: `Sucessfully saved warning!`,
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
                        name: "Reason:",
                        value: `${data.reason}`
                      },
                      {
                        name: "Attachments:",
                        value: `${!data.attachments ? `none`: `${data.attachments}`}`
                      },
                      {
                        name: "ID:",
                        value: `${body[msg.guild.id].length-1}`,
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
    }
  });
}


exports.help = (client, msg) => {
  let info = {};
  info.Description = "Warn a user by pinging them.";
  info.Name = "warn";
  info.Usage = "warn <@User> <reason>";
  info.Example = "s!warn @M2Paint#1123 Being mean!";
  info.Category = "Utility";
  info.Color = 15105570;

  return info;
}
