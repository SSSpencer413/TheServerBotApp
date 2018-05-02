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
   if(member == undefined || member == null) return error.fire(msg, `Please ping someone to see their history!`);

   getwarns(msg, member);


}
function getwarns(msg, member) {
  needle.get("http://theserverbot.gearhostpreview.com/moderation?key="+process.env.APIKey, function(e, r) {
    if (!e && r.statusCode == 200) {
      if (r.body[msg.guild.id]) {
        let serverWarns = r.body[msg.guild.id];
        let userwarns = serverWarns.map(w=>{
          if(w["user"] == member.id) {
            return w
          } else {
            return "DELETE"
          }
        });
        let f = userwarns.filter(function(w) {
          return w !== "DELETE";
        });
        if (f.length <= 0) return msg.channel.send({embed:{
          color: 15105570,
          title: "Utility",
          description: `${member} has a clean record!`
        }});
        let text = "";
          for(i=0; i < 10; i++) {
            if (f[i]) {
              text = text+`\n**Moderator**: <@${f[i]["moderator"]}>\n**Reason**:${f[i]["reason"]}\n**ID**: ${f[i]["id"]}\n`
            }
          }
        return msg.channel.send({embed:{
          color: 15105570,
          title: "Utility",
          description: `Here's a list of reports on ${member}:\n\n========${text}`,
          timestamp: new Date()
        }});
      } return msg.channel.send({embed:{
        color: 15105570,
        title: "Utility",
        description: `${member} has a clean record!`
      }});
    }
  });
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "See a user's moderation record.";
  info.Name = "moderation";
  info.Usage = "moderation <@User>";
  info.Example = "s!moderation <@User>";
  info.Category = "Utility";
  info.Color = 15105570;

  return info;
}
