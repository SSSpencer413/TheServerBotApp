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

  if (!msg.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return error.fire(msg, "Missing permissions!");
  let messagecount = parseInt(args[0]);
  if(!messagecount) return error.fire(msg, "Please provide an amount of messages to delete!");
  if (messagecount > 100 || messagecount < 2) return error.fire(msg, "Can only delete 2 - 100 messages!");
  msg.delete();


  var deletedMessageCount = 0
    msg.channel.fetchMessages({
         limit: messagecount
       })
       .then(function(messages){
         let msg_array = messages.array();
            msg_array.map(m => m.delete().catch(console.error));

              deletedMessageCount  = msg_array.length;
              if (deletedMessageCount >= 1) {
               msg.channel.send({embed:{
                 color: 15105570,
                 title: "Utility",
                 description: `${msg.author} sucessfully deleted ${deletedMessageCount} messages!`
               }});
               console.log(`${msg.author} sucessfully deleted ${deletedMessageCount} messages!`);
             } else {
               error.fire(msg, `Couldn't delete messages!`);
             }
        });
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Deletes a certain amount of messages as long as it is 100 or less.";
  info.Name = "purge";
  info.Usage = "purge <Messages>";
  info.Example = "s!purge 50";
  info.Category = "Utility";
  info.Color = 15105570;

  return info;
}
