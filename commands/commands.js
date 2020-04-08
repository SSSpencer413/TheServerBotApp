const fs = require("fs")
const error = require("./Special/Error.js");
const needle = require("needle");
const ownerlist = require("./Special/owners.json");
  function getEmbed(pre) {
    var funcmd = {
        title: "Fun Commands:",
        color: 16776960,
        description: "A list of fun, useless commands!",
        fields: [
          {
              name: `${pre}ping`,
              value: "Shows the ping.",
          },
          {
              name: `${pre}pong`,
              value: "Shows the pong.",
          },
          {
              name: `${pre}say <Message>`,
              value: "Make the bot say something.",
          },
          {
              name: `${pre}8ball <Question>`,
              value: "Ask the magic 8ball for answers!",
          },
          {
              name: `${pre}board <message>`,
              value: "Post a message on the board!",
          },
          {
              name: `${pre}pick <Options>`,
              value: "Pick an item from a list! Items are separated by a ';'!",
          },
          {
              name: `${pre}rate (MaxNumber)`,
              value: "Gives a random rating out of 10 by default.",
          },
        /*  {
              name: `${pre}play <Voice Channel Name> <Youtube Link>`,
              value: "Play a link in a voice channel!",
          }, */
          {
              name: `${pre}reverse <String>`,
              value: "Reverse a sting!",
          },

        ]
      }
      var moncmd = {
          title: "Economy Commands:",
          color: 3066993,
          description: "A list of commands for the bot's economy.",
          fields: [
            {
                name: `${pre}balance (@User)`,
                value: `Shows the balance of a user.`,
            },
            {
                name: `${pre}pay <@User> <Amount> <Currency Type>`,
                value: `Pay a person a certain amount.\nCurrency Type could be Credits or Cubes.`,
            },
            {
                name: `${pre}leaderboard`,
                value: `Look at the top 10 richest users in the server!`,
            },
          ]
        }

    var uticmd = {
        title: "Utility Commands:",
        color: 15105570,
        description: "A list of commands for Discord utility.",
        fields: [
          {
              name: `${pre}purge <Messages>`,
              value: `Deletes a certain amount of messages as long as it is 100 or less.`,
          },
          {
              name: `${pre}warn <@User> <reason>`,
              value: "Warn a user by pinging them.",
          },
          {
              name: `${pre}moderation <@User>`,
              value: "See a user's moderation record.",
          },
          {
              name: `${pre}resolve <ID> (reason)`,
              value: "Remove a warn.",
          },
          {
              name: `${pre}kick <@User> (reason)`,
              value: "Kick a player by pinging them.",
          },
        ]
      }
      var crecmd = {
          title: "Bot Manager Commands:",
          color: 10038562,
          description: "A list of commands for whoever manages the bot.",
          fields: [
            {
                name: `${pre}ban <@User> (reason)`,
                value: "Ban a user by pinging them.",
            },
            {
                name: `${pre}setbalance <@User> <Amount>`,
                value: `Set the balance of a user.`,
            },
            {
                name: `${pre}silence <@User> (time) (reason)`,
                value: `Silence a user. Time is in seconds!`,
            },
          ],
        }
        var DMcmd = {
            title: "DM Commands:",
            description: "A special list of commands for DM channel.",
            fields: [
              {
                  name: `s!announce <Server ID> (ONE WORD message) (tts) <Message>`,
                  value: "Send an announcement to the server.",
              },
              {
                  name: `s!maintainance (Announce) {message}`,
                  value: `Alert all servers of an announcement or maintainance mode.\n(If Announce = true, message is required, if false will reset the status, if null will st it to maintainance mode)`,
              },
              {
                  name: `s!dumplogs`,
                  value: `Reset all the logs and dump them into the console.`,
              },
              {
                  name: `s!eval <code>`,
                  value: `Run a piece of code!`,
              },
              {
                  name: `s!event <type> {title} <Message>`,
                  value: `Display an event!`,
              },
            ],
          }
          var pvpcmd = {
              title: "PVP Commands:",
              color: 7419530,
              description: "A list of commands that involve attacking other users.",
              fields: [
                {
                    name: `${pre}duel <@User> <Bet>`,
                    value: "Request a duel for a person.  Place your bet, and (hopefully) win some credits!",
                },
                {
                    name: `${pre}pickpocket <@User> <Amount>`,
                    value: "Pickpocket a person.  Try not to get caught.  If you're the owner, you can catch the theif for them!",
                },
              ]
            }
          var misccmd = {
              title: "Miscellaneous Commands:",
              color: 9936031,
              description: "Miscellaneous commands for various things! These commands will work with the default prefix in any server!",
              fields: [
                {
                    name: `${pre}pvp (true/false)`,
                    value: "Displays if the server has pvp on or off.  If you are Bot Manager+, you can set pvp.",
                },
                {
                    name: `${pre}commands`,
                    value: "This command.  Shows a list of the commands.",
                },
                {
                    name: `${pre}invite`,
                    value: "Invite the bot to your server.",
                },
                {
                    name: `${pre}setup`,
                    value: "Gives instructions on how to set the bot up if you are the owner.",
                },
                {
                    name: `${pre}prefix (prefix)`,
                    value: "Check the prefix of the server.  If you are the owner, you may set the prefix.",
                },
                {
                    name: `${pre}info`,
                    value: "Get info on the shard.",
                },
                {
                    name: `${pre}setbotchannel`,
                    value: "Set the current channel to the channel where the bot will post updates and welcome messages!",
                },
                {
                    name: `${pre}setmodchannel`,
                    value: "Set the current channel to the channel where the bot will post warnings and stuff.",
                },
                {
                    name: `${pre}serverinfo`,
                    value: "Get info on the server!",
                },
                {
                    name: `${pre}usererinfo (@User)`,
                    value: "Get info on a user!",
                },
                {
                    name: `${pre}code <code>`,
                    value: "Redeem a code!",
                },
              ],
              footer: {
                text: "Full documentation on the website bit.ly/TheServerBot!"
              }
            }
          return {
            0: moncmd,
            1: funcmd,
            2: uticmd,
            3: crecmd,
            4: DMcmd,
            5: misccmd,
            6: pvpcmd
          }
  }
  function getPrefix(server) {
    return new Promise ((resolve, reject) => {
      needle.get("http://theserverbot.gearhostpreview.com/guildSettings?key="+process.env.APIKey, function(e, r) {
        if (!e && r.statusCode == 200) {
          if (r.body[server.id]) {
            resolve(r.body[server.id].prefix);
          } else {
            var data = r.body
            data[server.id] = {"prefix":"s!"}
            needle.post("http://theserverbot.gearhostpreview.com/guildSettings?key="+process.env.APIKey, data, {content_type:"application/json"}, function(er,re){
              if (!er && re.statusCode == 200) {
                resolve("s!");
              } else {

                resolve("s!");
              }
            });
          }
        } else resolve("s!");
      });
    });
  }

exports.run = (client, msg, args) => {
  const modRoles = ["BotAdmin", "BotManager"];
  let hasHighRole = msg.member.roles.some(role => modRoles.includes("BotManager"));
  let hasModRole = msg.member.roles.some(role => modRoles.includes(role.name));
  if(ownerlist[msg.author.id]) {
    hasModRole = true
  } else if (msg.guild.owner.id == msg.author.id) {
    hasModRole = true
  }
  getPrefix(msg.guild).then((p) => {
    emb = getEmbed(p)

    msg.channel.send({embed: emb[5]});
    msg.channel.send({embed: emb[6]});
    msg.channel.send({embed: emb[0]});
    msg.channel.send({embed: emb[1]});


    if (hasModRole) {
      msg.channel.send({embed: emb[2]});
      if (hasHighRole || ownerlist[msg.author.id] || msg.guild.owner.id == msg.author.id) {
        msg.channel.send({embed: emb[3]});
      }
    }
    if (ownerlist[msg.author.id]) {
      msg.channel.send({embed: emb[4]});
    }

    msg.channel.send({embed:{
      description: `Sent a list to you, ${msg.author}!`,
      title: "Help",
      color: 3066993,
      footer: {
        text: "Full documentation on the website bit.ly/TheServerBot!"
      }
    }});
  });



}

exports.help = (client, msg) => {
  let info = {};
  info.Description = "";
  info.Name = "";
  info.Usage = "";
  info.Example = "";
  info.Category = "";
  info.Color = 0;

  return info;
}
