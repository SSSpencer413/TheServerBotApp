const error = require("./Special/Error.js");
const needle = require('needle');
const cfunctions = require('./Special/currency.js');
const currencyTypeList = {
  "Credits": "Credits",
  "credits": "Credits",
  "c": "Credits",
  "¢": "Credits",
  "Cubes": "Cubes",
  "cubes": "Cubes",
  "C": "Cubes",
  "⏛": "Cubes"
}
exports.run = (client, msg, args) => {
  var amount = parseInt(args[1]);
  var currencytype = currencyTypeList[args[2]];
  var otheruser = msg.mentions.members.first();
  if(otheruser == undefined || otheruser == null) return error.fire(msg, `Please ping someone to pay!`);
  if(!amount || amount < 1) return error.fire(msg, `Please enter in a positive amount to pay!`);
  if (!currencytype) return error.fire(msg, `Please specify a currency type! (Credits, Cubes)`);

  cfunctions.getList().then(r => {
    if (r[msg.author.id]) {
      var ctable = r[msg.author.id]
      if (!r[msg.author.id]) return error.fire(msg, "Insufficient Funds!");
      var ctble = {"Credits": ctable["Credits"][msg.guild.id], "Cubes":ctable["Cubes"], "id": msg.guild.id};
      if (ctble[currencytype] >= amount) {
        ctble[currencytype] = ctble[currencytype] - amount;
          cfunctions.updateBalance(r, msg.author, ctble, true).then(() =>{
            if (r[otheruser.id]) {
              var objtable = r[otheruser.id]
              var ob = currencytype == "Credits" ?{"Credits": objtable.Credits[msg.guild.id]+ amount, "Cubes": objtable["Cubes"], "id": msg.guild.id}:{"Credits": objtable.Credits[msg.guild.id],"Cubes": objtable["Cubes"]+amount, "id": msg.guild.id}
              cfunctions.updateBalance(r, otheruser, ob);
              return sucess(msg.author, otheruser, amount, currencytype, msg);
            } else {
              var pretable = {"Credits":0, "Cubes":0, "id":msg.guild.id}
              pretable[currencytype] = amount
              cfunctions.updateBalance(r, otheruser, pretable);
              return sucess(msg.author, otheruser, amount, currencytype, msg);
            }
          });
        } else return error.fire(msg, "Insufficient Funds!");
    } else {
      cfunctions.updateBalance(r, msg.author, {"Credits":0, "Cubes":0, "id":msg.guild.id});
      error.fire(msg, "Insufficient Funds!");
    }
  });
}

function sucess(sender, reciever, amount, type, msg) {
  msg.channel.send({embed:{
        title: "Economy",
        color: 3066993,
        description: `${sender} has paid ${reciever} ${amount} ${type}!`
    }});
}


exports.help = (client, msg) => {
  let info = {};
  info.Description = "Pay a person a certain amount.\nCurrency Type could be Credits or Cubes.";
  info.Name = "pay";
  info.Usage = "pay <@User> <Amount> <Currency Type>";
  info.Example = "s!pay @M2Paint#1123 50 Credits";
  info.Category = "Economy";
  info.Color = 3066993;

  return info;
}
