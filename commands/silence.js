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
   if(member == undefined || member == null) return error.fire(msg, `Please ping someone to silence!`);
   if(member.id == msg.member.id || msg.guild.owner.id == member.id || member.id == "180803410306662401") return error.fire(msg, `That person cannot be silenced!`);
   if (!client.guilds.get(msg.guild.id).me.permissions.has("MANAGE_ROLES")) return error.fire(msg, `Lacking permissions to manage roles!`);
   let muteRole = msg.guild.roles.find("name", "S̕̕͡ì̛̆l̎̋͞e̔̓͂ñ̍͝č̾͡ȅ̀̕d̈́͒͡");
   if (!muteRole) return error.fire(msg, "S̕̕͡ì̛̆l̎̋͞e̔̓͂ñ̍͝č̾͡ȅ̀̕d̈́͒͡ role missing.");
   if (member.roles.find("name", "S̕̕͡ì̛̆l̎̋͞e̔̓͂ñ̍͝č̾͡ȅ̀̕d̈́͒͡")) {
     return error.fire(msg, `That user is already silenced!`)
   }

   var time = parseInt(args[1]) ? parseInt(args[1]) : null;
   let mes = args.splice(0, 2)
   let reason = args.join(" ")

   member.addRole(muteRole, `${msg.author} has silenced ${member}:\n`+reason);

   msg.channel.send({embed:{
     color: 10038562,
     title: "Bot Manager",
     description: `${member} been silenced by ${msg.author}!${time?` It is set to auto-end in ${time} seconds!`:""}`
   }});


   if (time) {
     setTimeout(function() {
       if (member.roles.find("name", "S̕̕͡ì̛̆l̎̋͞e̔̓͂ñ̍͝č̾͡ȅ̀̕d̈́͒͡")) {
         member.removeRole(muteRole);
       }
     }, time*1000);
   }

}


exports.help = (client, msg) => {
  let info = {};
  info.Description = "Silence a user. Time is in seconds!";
  info.Name = "silence";
  info.Usage = "silence <@User> (Time) (Reason)";
  info.Example = "s!silence @M2Paint#1123 30 Being mean to me!";
  info.Category = "Bot Manager";
  info.Color = 10038562;

  return info;
}
