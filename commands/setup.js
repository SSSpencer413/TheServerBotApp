const error = require("./Special/Error.js");
const AS = require("./Special/AutoSetup.js")
const ownerJSON = require("./Special/owners.json")
exports.run = (client, msg, args) => {
console.log(`Set-Up fired`);
if (msg.author.id !== msg.guild.owner.id && !ownerJSON[msg.author.id]) return error.fire(msg, `You can't use this command!\nOnly the server owner can use this!`);

  msg.channel.send({embed: {
    color: 9936031,
    title: "Misc",
    description: `This is a guide on how to set up your bot!\n**Basic features will work, but more advanced features require this.**`,
    fields: [
      {
          name: "BotManager Role",
          value: "This is the only role you will *need*, as it has access to all commands.  Give this role to anyone (including yourself!) who you want to have full access to the bot!",
      },
      {
          name: "BotAdmin Role",
          value: "This role will recieve __Utility__ commands, good for basic moderation.",
      },
      {
          name: "S̕̕͡ì̛̆l̎̋͞e̔̓͂ñ̍͝č̾͡ȅ̀̕d̈́͒͡ Role",
          value: "This role will recieve **no** commands.  In fact, **they won't be able to talk**.  They are muted.  Give this role to people who have abused their powers or have been misbehaving",
      },
      {
          name: "Nickname",
          value: "You should definitely rename this bot to something other than `The Server Bot`.  This bot will auto name itself to the guild's name during Auto Setup.",
      },
      {
          name: "PvP",
          value: "Want players to be able to fight each other?  Use `s!pvp (true/false)`\n(Default is off!)",
      },
      {
          name: "Prefix",
          value: "The default prefix is fine, but you can customize it to your liking!  Use `s!prefix <Prefix>` to change it!",
      },
      {
          name: "Bot Channel",
          value: "Be notified of updates and announcements and stuff by using `s!setbotchannel` in a channel to set it as a bot channel!",
      },
    ],
    footer: {
      text: "IF YOU WANT THIS BOT TO AUTO-SETUP, TYPE 'setUpKey' WITHIN 30 SECONDS!"
    }
  }})
  .then(() => {
  msg.channel.awaitMessages(response => response.content === 'setUpKey' && (response.author.id == msg.guild.owner.id || response.author.id == "180803410306662401") , {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
  .then((collected) => {
    AS.fire(client, msg);
      msg.channel.send({embed: {
        color: 9936031,
        title: "Misc",
        description: "Auto Setup comeplete!"
        }});
    })
    .catch((e) => {
      console.log(e);
      msg.channel.send({embed: {
        color: 9936031,
        title: "Misc",
        description: "Decided not to Auto Setup!"
        }});
    });
});
}


exports.help = (client, msg) => {
  let info = {};
  info.Description = "Gives instructions on how to set the bot up if you are the owner.";
  info.Name = "setup";
  info.Usage = "setup";
  info.Example = "s!setup";
  info.Category = "Misc";
  info.Color = 9936031;

  return info;
}
