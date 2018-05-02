const error = require("./Special/Error.js");
const ownerlist = require("./Special/owners.json");
exports.run = (client, msg, args) => {
  const acceptedRoles = ["BotAdmin", "BotManager"];
  let hasAccRole = msg.member.roles.some(role => acceptedRoles.includes(role.name));
  if(ownerlist[msg.author.id]) {
    hasAccRole = true
  } else if (msg.guild.owner.id == msg.author.id) {
    hasAccRole = true
  }

  if(!hasAccRole)
   return error.fire(msg, `You can't use this command! Contact a BotManager!`);

  let member = msg.mentions.members.first();
  if(member == undefined || member == null) return error.fire(msg, `Please ping someone to kick!`);
  if(member.id == msg.member.id || member.id == "180803410306662401" || !member.kickable) return error.fire(msg, `That person cannot be kicked!`);
  let mes = args.shift()
  let reason = args.join(" ")
  member.kick(`Kicked by: ${msg.author}\n`+reason);

   msg.channel.send({embed:{
     color: 15105570,
     title: "Utility",
     description: `${member} been kicked by ${msg.author}!`
   }});
   console.log(`${msg.author} kicked ${member} for "${reason}"`);
}


exports.help = (client, msg) => {
  let info = {};
  info.Description = "Kick a player by pinging them.";
  info.Name = "kick";
  info.Usage = "kick <@User> (reason)";
  info.Example = "s!kick @M2Paint#1123";
  info.Category = "Utility";
  info.Color = 15105570;

  return info;
}
