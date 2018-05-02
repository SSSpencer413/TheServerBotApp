const error = require("./Special/Error.js");
const needle = require('needle');
const cfunctions = require('./Special/currency.js');
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

  var amount = parseInt(args[1]);
  var member = msg.mentions.members.first();
  if(member == undefined || member == null) return error.fire(msg, `Please ping someone to set their balance!`);
  if(!amount || amount <= 0) return error.fire(msg, `Please enter in a positive amount to set!`);
  if(amount > 999999999999) return error.fire(msg, `That's way too much!  What could you possibly need all of this money for?`);

  cfunctions.getList().then(r => {
    if (r[member.id]) {
      cfunctions.updateBalance(r, member, {"Credits": amount, "Cubes": r[member.id].Cubes, "id": msg.guild.id}, true).then(() =>{
        msg.channel.send({embed:{
              title: "Bot Manager",
              color: 10038562,
              description: `Set ${member}'s balance to ${amount}!`
          }});
      });
    } else return error.fire(msg, `Something went wrong! Try using the 'balance' command on that user and try again!`);
  });
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Set the balance of a user.";
  info.Name = "setbalance";
  info.Usage = "setbalance <@User> <Amount>";
  info.Example = "s!setbalance @M2Paint#1123 5000";
  info.Category = "Bot Manager";
  info.Color = 10038562;

  return info;
}
