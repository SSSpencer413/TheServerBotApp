const error = require("./Special/Error.js");
const needle = require('needle');
const cfunctions = require('./Special/currency.js');
exports.run = (client, msg, args) => {
  let member = msg.mentions.members.first();
  if(member == undefined || member == null) member = msg.member;
    cfunctions.getList().then(r => {
      if (r[`${member.id}`]) {
        if (!r[member.id].Credits[msg.guild.id]){
          r[member.id].Credits[msg.guild.id] = 0
          cfunctions.updateBalance(r, member, {"Credits":0, "Cubes":r[member.id].Cubes, "id":msg.guild.id});
      }
          sendAmount(r[member.id].Credits[msg.guild.id], r[member.id].Cubes, member);
      } else {
        cfunctions.updateBalance(r, member, {"Credits":0, "Cubes":0, "id":msg.guild.id});
        sendAmount(0, 0, member);
      }
    })
    .catch(e => console.log(e));

  function sendAmount(c,g,m) {
    msg.channel.send({embed:{
          title: "Economy",
          color: 3066993,
          description: `${m}'s Balance!`,
          fields: [
            {
                name: "Credits",
                value: `${c}`,
                inline: true
            },
            {
                name: "Cubes",
                value: `${g}`,
                inline: true
            }
          ]
      }});
  }
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Shows the balance of a user.";
  info.Name = "balance";
  info.Usage = "balance (@User)";
  info.Example = "s!balance @M2Paint#1123";
  info.Category = "Economy";
  info.Color = 3066993;

  return info;
}
