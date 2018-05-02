const error = require("./Special/Error.js");
const fs = require("fs")
const needle = require('needle');
const cfunctions = require('./Special/currency.js');

exports.run = (client, msg, args) => {
  const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
  if (!gsettings[msg.guild.id]||!gsettings[msg.guild.id].pvp) return error.fire(msg, "Pvp is disabled!");
  let member = msg.mentions.members.first();
  if(member == undefined || member == null) return error.fire(msg, `Please ping someone to pickpocket!`);
  if (member.id == msg.author.id) return error.fire(msg, "You can't pickpocket yourself!");
  var amount = parseInt(args[1]);
  if(!amount || amount == undefined || amount < 1) return error.fire(msg, `Please enter in a positive amount to pickpocet!`);
  cfunctions.getList().then(r => {
    if (r[member.id]) {
      if (r[member.id].Credits[msg.guild.id] <= amount || !r[member.id].Credits[msg.guild.id]) return error.fire(msg, `That person has insufficient funds!`);
    } else return error.fire(msg, `That person has insufficient funds!`);
    msg.channel.send(`${member}`, {embed:{
          title: "PVP",
          color: 7419530,
          description: `${msg.author} is pickpocketing ${amount} Credits from ${member}!\nType 'catch ${msg.author.username}' to stop them!`,
    }}).then(() => {
      msg.channel.awaitMessages(response => (response.author.id == member.id || response.author.id == msg.guild.ownerID) && response.content === `catch ${msg.author.username}`, {
        max: 1,
        time: 10000,
        errors: ['time'],
      })  .then((collected) => {
            msg.channel.send({embed: {
              color: 7419530,
              title: "PVP",
              description: `${msg.author} has been caught pickpocketing ${member}!`
              }});
          })
          .catch((e) => {
            pickpocket(msg.author, member, amount, msg.guild.id, msg)

          });
      });
    });
  }



function pickpocket(plr1, plr2, amount, id, msg) {
  cfunctions.getList().then(r => {
    if (r[plr1.id] && r[plr2.id]) {
      if (r[plr2.id].Credits[msg.guild.id] <= amount) return error.fire(msg, `That person has insufficient funds!`);
      cfunctions.updateBalance(r, plr1, {"Credits": r[plr1.id].Credits[id]+amount, "Cubes": r[plr1.id].Cubes, "id": id}, true).then(() => {
          cfunctions.updateBalance(r, plr2, {"Credits": r[plr2.id].Credits[id]-amount, "Cubes": r[plr2.id].Cubes, "id": id});
      });
      msg.channel.send({embed: {
        color: 7419530,
        title: "PVP",
        description: `${plr1} has sucessfully pickpocketed ${amount} Credits from ${plr2}!`
      }});
    } else return error.fire(msg, "Something went wrong! Try using the 'balance' command on both users and try again! (No balances were changed!)");
  });
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Pickpocket a person.  Try not to get caught.  If you're the owner, you can catch the theif for them!";
  info.Name = "pickpocket";
  info.Usage = "pickpocket <@User> <Amount>";
  info.Example = "s!pickpocket @M2Paint#1123 500";
  info.Category = "PVP";
  info.Color = 7419530;

  return info;
}
