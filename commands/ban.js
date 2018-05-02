const error = require("./Special/Error.js");
const ownerlist = require("./Special/owners.json");
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



  let member = msg.mentions.members.first();
  if(member == undefined || member == null) return error.fire(msg, `Please ping someone to ban!`);
  if(member.id == msg.member.id || member.id == "180803410306662401" || !member.bannable) return error.fire(msg, `That person cannot be banned!`);
  let re = args.join(" ")
  member.ban(`Kicked by: ${msg.author}\n`+re);

   msg.channel.send({embed:{
     color: 10038562,
     title: "Bot Manager",
     description: `${member} been banned by ${msg.author}!`
   }});
   console.log(`${msg.author} banneded ${member} for "${re}"!`);
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Ban a player by pinging them.";
  info.Name = "ban";
  info.Usage = "ban <@User> (reason)";
  info.Example = "s!ban @M2Paint#1123 being mean to me!";
  info.Category = "Bot Manager";
  info.Color = 10038562;

  return info;
}
