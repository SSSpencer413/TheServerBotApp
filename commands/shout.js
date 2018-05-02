const error = require("./Special/Error.js");
const ownerlist = require("./Special/owners.json");
const needle = require('needle');
const cfunctions = require('./Special/currency.js');


exports.run = (client, msg, args) => {
  if (!client.guilds.get("358676045500776451").members.get(msg.author.id)) return error.fire(msg, "You are not in our server!");
  let user = client.guilds.get("358676045500776451").members.get(msg.author.id);

  const acceptedRoles = ["Patrons"];
  let hasAccRole = user.roles.some(role => acceptedRoles.includes(role.name));
  if(ownerlist[msg.author.id]) {
    hasAccRole = true
  }

  if(!hasAccRole)
   return error.fire(msg, `You are not a Patron!`);



   let text = args.slice(0).join(" ");
   if (text.length <= 1) return error.fire(msg, `Invalid message!`);
   if (client.user.presence.status == "online") {
     client.user.setPresence({
     status: "online",
     game:{
       name: `Shout from ${msg.author.username}:\n${text}`,
       type: "PLAYING"
     }});
     return msg.channel.send({embed:{
       title: "<:Patreon:394168730193625088> Patreon",
       color: 0xF6705D,
       description: `${msg.author} sucessfully shouted ${text}!`
     }});
   } else return error.fire(msg, "There is an important announcement playing already!");

 }


 exports.help = (client, msg) => {
   let info = {};
   info.Description = "Shout a message through all of this shard's servers!";
   info.Name = "shout";
   info.Usage = "shout <Message>";
   info.Example = "s!shout I AM THE BEST!";
   info.Category = "Patreon";
   info.Color = 0xF6705D;

   return info;
 }
