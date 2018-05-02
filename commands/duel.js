const error = require("./Special/Error.js");
const fs = require("fs")
const needle = require('needle');
const cfunctions = require('./Special/currency.js');
const wounded = new Set();

exports.run = (client, msg, args) => {
  const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
  if (!gsettings[msg.guild.id]||!gsettings[msg.guild.id].pvp) return error.fire(msg, "Pvp is disabled!");
  if (wounded.has(msg.author.id)) return error.fire(msg, "You are wounded!");
  let member = msg.mentions.members.first();
  if(member == undefined || member == null) return error.fire(msg, `Please ping someone to duel!`);
  if (wounded.has(member.id)) return error.fire(msg, "That person is wounded!");
  //if (member.id == msg.author.id) return error.fire(msg, "You can't duel yourself!");
  var amount = parseInt(args[1]);
  if(!amount || amount == undefined || amount < 1) return error.fire(msg, `Please enter in a positive amount to duel!`);
  cfunctions.getList().then(r => {
    if (r[msg.author.id]) {
      if (r[msg.author.id].Credits[msg.guild.id] <= amount || !r[msg.author.id].Credits[msg.guild.id]) return error.fire(msg, `You have insufficient funds!`);
    }
    if (r[member.id]) {
      if (r[member.id].Credits[msg.guild.id] <= amount || !r[member.id].Credits[msg.guild.id]) return error.fire(msg, `Other user has insufficient funds!`);
    }
    msg.channel.send({embed:{
          title: "PVP",
          color: 7419530,
          description: `${msg.author} has requested a duel for ${amount} Credits to ${member}!\nType 'accept ${msg.author.username}' to accept!`,
    }}).then(() => {
      msg.channel.awaitMessages(response => (response.author.id == member.id && response.content === `accept ${msg.author.username}`), {
        max: 1,
        time: 30000,
        errors: ['time'],
      }).then(c => {
        msg.channel.send({embed:{
              title: "PVP",
              color: 7419530,
              description: `${member} has accepted ${msg.author}'s duel!`,
        }});
          setTimeout(function() {draw(msg.author, member, amount, msg)}, 500);

      }).catch((e) => {
          msg.channel.send({embed:{
                title: "PVP",
                color: 7419530,
                description: `${member} didn't respond to ${msg.author}'s duel!`,
          }})
      });
    });
  });
}

  function draw(plr1, plr2, amount, msg) {

    var round1 = Math.round(Math.random()*10);
    var round2 = Math.round(Math.random()*10);
    var round3 = Math.round(Math.random());
    var points1 = 0;
    var points2 = 0;

    if (round1>5) {
      points1++
    } else {
      points2++
    }
    if (round2 < 5) {
      points1++
    } else {
      points2++
    }
    if (round3 == 1) {
      points1++
    } else {
      points2++
    }

    if (points1 > points2) {
      setTimeout(function() {reward(plr1, plr2, amount, msg.guild.id, msg)}, 500);
    } else if (points1 < points2) {
      setTimeout(function() {reward(plr2, plr1, amount, msg.guild.id, msg)}, 500);
    } else {
      setTimeout(function() {tie(plr2, plr1, points1, points2, amount, msg)}, 500);
    }

  /*  var x = Math.round(Math.random()*10)
    if (x>5) {
      setTimeout(function() {reward(plr1, plr2, amount, msg.guild.id, msg)}, 500);
    } else {
      setTimeout(function() {reward(plr2, plr1, amount, msg.guild.id, msg)}, 500);
    }
  } */

}



function reward(plr1, plr2, amount, id, msg) {
  cfunctions.getList().then(r => {
    if (r[plr1.id] && r[plr2.id]) {
      if (r[plr2.id].Credits[msg.guild.id] <= amount|| r[plr1.id].Credits[msg.guild.id] <= amount) return error.fire(msg, `Couldn't give money!`);
      const story = ["Pistol","Joust","Robots", "Snowball"];
      const storyTable = {
        "Pistol" : [`${plr1} and ${plr2} turn their backs from each other with their pistols drawn.`,`The sun of high noon beats down on them.`,`They both take 2 steps foward and...`,`BANG!`],
        "Joust" : [`${plr1} and ${plr2} mount their horses and equip their lances.`,`The bloodthirsty crowd roars with excitement...`,`The match begins with a bang!`,`The two jousters dash towards each other, lances out when suddenly...`,`CRASH!`],
        "Robots" : [`${plr1}'s robot glows blue as it rolls into the arena.`,`${plr2}'s robot jumps into the arena flashing red around it.`,`The two robots, controlled by their owners, fight to the death!`,`The red robot raises it's buzzsaw-hand and digs deep into the blue robot.`,`The Blue robot's flamethrower scorches the red robot.`,`The match was close, but it was a clear and messy victory...`],
        "Snowball" : [`Both ${plr1} and ${plr2} have huge stacks of snowballs by their sides.`, `${plr1} makes a huge tower of snow, while ${plr2} makes a deep pit in the snow.`, `The two snow warriors throw with all their might!`, `It seems that neither side can pull through to hit the other when suddenly...`, `WHOOSH!`, `A giant snowball with an icicle stuck in it flies through the air, striking its poor freezing victim straight in the face.`],
      }
      var reactnum = Math.round(Math.random()*(story.length));
      var reactstory = storyTable[story[reactnum]];
      if (!reactstory) reactstory = [`The duel was good, but the writer was killed by a flying wumpus...`]
      msg.channel.send({embed:{
        title: "PVP",
        color: 7419530,
        description: `Starting Duel... <a:Loading:394129577720676354>`
      }}).then(m => {
        setTimeout(() => {
          m.edit({embed:{
            title: "PVP",
            color: 7419530,
            description: reactstory.join("\n"),
            fields: [
              {
                  name: `Winner:`,
                  value: `${plr1}: +${amount} Credits`,
              },
              {
                  name: `Loser:`,
                  value: `${plr2}: -${amount} Credits`,
              },
            ]
          }});
        }, 250);
      });
      wounded.add(plr2.id);
      setTimeout(() => {
        // Removes the user from the set after 2.5 seconds
        wounded.delete(plr2.id);
      }, 3000);
      cfunctions.updateBalance(r, plr1, {"Credits": r[plr1.id].Credits[id]+amount, "Cubes": r[plr1.id].Cubes, "id": id}, true).then(() => {
          cfunctions.updateBalance(r, plr2, {"Credits": r[plr2.id].Credits[id]-amount, "Cubes": r[plr2.id].Cubes, "id": id});
      });
    } else return error.fire(msg, "Something went wrong! Try using the 'balance' command on both users and try again! (No balances were changed!)");
  });
}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "Request a duel for a person.  Place your bet, and (hopefully) win some credits!";
  info.Name = "duel";
  info.Usage = "duel <@User> <Bet>";
  info.Example = "s!duel @M2Paint#1123";
  info.Category = "PVP";
  info.Color = 7419530;

  return info;
}
