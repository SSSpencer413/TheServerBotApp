const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
const ownerlist = require("./commands/Special/owners.json");
const Helper = require("discordbots.org-api");
const DiscordBots = new Helper(config.dbltoken);
const needle = require("needle");

//https://discordapp.com/oauth2/authorize?client_id=358350504129986570&scope=bot&permissions=8
//<:CrossMark:370726096188080158> <:Checkmark:370726078857084938> <a:Loading:394129577720676354> <:Patreon:394168730193625088>
client.on('ready', () => {
  needle.get("http://theserverbot.gearhostpreview.com/guildSettings?key="+process.env.APIKey, function(e, r) {
    console.log("GET");
    if (!e && r.statusCode == 200) {
        fs.writeFile("./commands/Special/gsettings.json", JSON.stringify(r.body), (err) => {
          if (err) console.error(err)
        });
    } else {
      fs.writeFile("./commands/Special/gsettings.json", "{}", (err) => {
        if (err) console.log(err)
      });
    }
  });
  needle.get("http://theserverbot.gearhostpreview.com/bans?key="+process.env.APIKey, function(e, r) {
    if (!e && r.statusCode == 200) {
        fs.writeFile("./commands/Special/bannedUsers.json", JSON.stringify(r.body), (err) => {
          if (err) console.error(err)
        });
    } else {
      fs.writeFile("./commands/Special/bannedUsers.json", "{}", (err) => {
        if (err) console.log(err)
      });
    }
  });

  console.log('Connected!');
  client.user.setPresence({
  status: "online",
  game:{
    name: `${config.prefix}commands`,
    type: 3,
    url: "https://twitch.tv/twitch"
  }});
});

////////////////////////////TESTING
client.on('guildCreate', (guild) => {
  DiscordBots.postStatsShard(client.user.id, client.options.shardId, client.options.shardCount, Array.from(client.guilds).length);
  console.log("Joined "+guild.name);
});

client.on('guildDestroy', (guild) => {
  DiscordBots.postStatsShard(client.user.id, client.options.shardId, client.options.shardCount, Array.from(client.guilds).length);
  console.log("Left "+guild.name);
}); // */

client.on('guildMemberAdd', (member) => {
  const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
  if (gsettings[member.guild.id]) {
    if(gsettings[member.guild.id].botChannel) {
      if (member.guild.channels.get(gsettings[member.guild.id].botChannel)) {
        member.guild.channels.get(gsettings[member.guild.id].botChannel).send(`Hello ${member.user}!`, {embed: {
          title: "Server",
          color: 3066993,
          description: `Welcome, ${member.user}!`,
        }});
      }
    }
  }
  console.log(`${member.user.username} has joined ${member.guild.name}!`);
});

client.on('guildMemberRemove', (member) => {
  const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
  if (gsettings[member.guild.id]) {
    if(gsettings[member.guild.id].botChannel) {
      if (member.guild.channels.get(gsettings[member.guild.id].botChannel)) {
        member.guild.channels.get(gsettings[member.guild.id].botChannel).send({embed: {
          title: "Server",
          color: 3066993,
          description: `${member.user} has left! Goodbye!`,
        }});
      }
    }
  }
  console.log(`${member.user.username} has left ${member.guild.name}!`);
});


client.on('message', message => {
if (message.channel.type == "text") {
  //Text
  let server = message.guild;
  //const
  const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
  const bannedUsers = JSON.parse(fs.readFileSync("./commands/Special/bannedUsers.json", "utf8"));



  //Handling bans...
  let banned = false
  let banRole = server.roles.find("name", "S̕̕͡ì̛̆l̎̋͞e̔̓͂ñ̍͝č̾͡ȅ̀̕d̈́͒͡");
  if(banRole) {
    if(message.member.roles.has(banRole.id)) {
      banned = true
    }
  }

  if (ownerlist[message.author.id] || (server.owner !== null && server.ownerID == message.author.id)) {
    banned = false
  }
  if(banned) {
    message.delete();
    return;
  }


  if (message.author.bot) return;
  if (message.channel.name == config.pausedservers[server.name]) return;
  if (bannedUsers[message.author.id]) {
    return;
  }
  /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                  TESTMODE
  var acceptedRoles = ["Tester", "Patrons"];
  let gudRole = message.member.roles.some(role => acceptedRoles.includes(role.name));
  if (!gudRole) return;
  //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */


/*  //AuditLogs
  let AuditLogs = JSON.parse(fs.readFileSync("./commands/Special/auditlogs.json", "utf8"));
  AuditLogs[`${message.id}`] =  {
    'author': `<@${message.author.id}>`,
    'content': message.content
  }
  fs.writeFile("./commands/Special/auditlogs.json", JSON.stringify(AuditLogs), (err) => {
    if (err) console.error(err)
  }); */



  //human reactions
 if (message.content.indexOf(`<@${client.user.id}>`) !== -1) {
    let emojiReact = ["📞", "👋", "👂", "✍️", "👁️", "📝", "🆗"];
    try {
      message.react(emojiReact[Math.round(Math.random()*(emojiReact.length))]);
    } catch (err) {
      console.error(err);
    }
  }

  if (message.content.startsWith(config.prefix+"commands")) {
    let commandFile = require(`./commands/commands.js`);
    commandFile.run(client, message);
    return;
  } else if (message.content.startsWith(config.prefix+"prefix")) {
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
      let commandFile = require(`./commands/prefix.js`);
      commandFile.run(client, message, args);
      return;
    } else if (message.content.startsWith(config.prefix+"setup")) {
        let commandFile = require(`./commands/setup.js`);
        commandFile.run(client, message);
        return;
    } else if (message.content.startsWith(config.prefix+"invite")) {
          let commandFile = require(`./commands/invite.js`);
          commandFile.run(client, message);
          return;
    } else if (message.content.startsWith(config.prefix+"info")) {
          let commandFile = require(`./commands/info.js`);
          commandFile.run(client, message);
          return;
      } else if (message.content.startsWith(config.prefix+"status")) {
          let commandFile = require(`./commands/status.js`);
          commandFile.run(client, message);
          return;
      } else if (message.content.startsWith(config.prefix+"serverinfo")) {
          let commandFile = require(`./commands/serverinfo.js`);
          commandFile.run(client, message);
          return;
      } else if (message.content.startsWith(config.prefix+"userinfo")) {
          let commandFile = require(`./commands/userinfo.js`);
          commandFile.run(client, message);
          return;
      } else if (message.content.startsWith(config.prefix+"pvp")) {
          let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
          let command = args.shift().toLowerCase();
          let commandFile = require(`./commands/pvp.js`);
          commandFile.run(client, message, args);
          return;
      } else if (message.content.startsWith(config.prefix+"setbotchannel")) {
          let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
          let command = args.shift().toLowerCase();
          let commandFile = require(`./commands/setbotchannel.js`);
          commandFile.run(client, message, args);
          return;
      } else if (message.content.startsWith(config.prefix+"setmodchannel")) {
          let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
          let command = args.shift().toLowerCase();
          let commandFile = require(`./commands/setmodchannel.js`);
          commandFile.run(client, message, args);
          return;
      } else if (message.content.startsWith(config.prefix+"eval")) {
        if (message.author.id == "180803410306662401") {
          let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
          let command = args.shift().toLowerCase();
          let commandFile = require(`./commands/Special/eval.js`);
          commandFile.fire(client, message, args);
          return;
        }
      } else if (message.content.startsWith(config.prefix+"code")) {
          let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
          let command = args.shift().toLowerCase();
          let commandFile = require(`./commands/code.js`);
          commandFile.run(client, message, args);
          return;
      }

  getPrefix(server).then((pre) => {
    var prefix = pre;

      if(message.content.indexOf(prefix) !== 0) return;

      // This is the best way to define args. Trust me.
      let args = message.content.slice(prefix.length).trim().split(/ +/g);
      const commandList = {
        "help":"commands",
        "serverinfo":"server",
        "cmd":"commands",
        "cmds":"commands",
        "mute":"silence",
        "bal":"balance",
        "setbal":"setbalance",
        "pp":"pickpocket",
        "prune":"purge",
        "clear":"purge",
        "delete":"purge",
        "leaderstats":"leaderboard",
        "ranks":"leaderboard",
        "topusers":"leaderboard",
        "user":"userinfo",
        "server":"serverinfo",
        "guild":"serverinfo",
        "choose":"pick",
        "unwarn":"resolve",
      }
      let command = args.shift().toLowerCase();
      if (commandList[command]) command = commandList[command];
      // The list of if/else is replaced with those simple 2 lines:
      try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
      } catch (err) {
        console.error(err);
      }
  });

} else if (message.channel.type == "dm") {
  //DM
  if (message.author.bot) return;
  if (ownerlist[message.author.id]) {
    //Owners
    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
      let commandFile = require(`./commands/Special/${command}.js`);
      commandFile.fire(client, message, args);
    } catch (err) {
      console.error(err);
    }
  } else {
    //Others
    message.channel.send({embed: {
      title: "Warning!",
      color: 15158332,
      description: `All DMs are logged and public!\nDo **not** send things to this bot you don't want the mods to see!`,
      footer: {
        text: "Yes, they are allowed to judge you based on it! (But not punish you!)"
      }
    }});
    let msgdata = {}
    msgdata.embeds = [{
      color: 3447003,
      title: `Message Id: ${message.id}`,
      author: {
        name: `Author Id: ${message.author.id}`
      },
      description: "**Content: **"+message.content,
      timestamp: message.createdtimestamp,
      fields: [
        {
          name: "Attachments:",
          value: `${Array.from(message.attachments)[0] == undefined ? Array.from(message.attachments)[0][1].url: `none`}`
        }
      ],
    }];
    msgdata.username = `${message.author.username} #${message.author.discriminator}`;
    msgdata.avatar_url = message.author.avatarURL;
    needle.post(process.env.DM_WebhookURL, msgdata, {content_type:"application/json"});
  }
}
});

function getPrefix(server) {
  return new Promise ((resolve, reject) => {
    const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
    if (gsettings[server.id]) {
      resolve(gsettings[server.id].prefix);
    } else {
      needle.get("http://theserverbot.gearhostpreview.com/guildSettings?key="+process.env.APIKey, function(e, r) {
        if (!e && r.statusCode == 200) {
          if (r.body[server.id]) {
            resolve(r.body[server.id].prefix);
          } else {
            var data = r.body
            data[server.id] = {"prefix":config.prefix, "pvp": false}
            console.log("Created Prefix");
            needle.post("http://theserverbot.gearhostpreview.com/guildSettings?key="+process.env.APIKey, data, {content_type:"application/json"}, function(er,re){
              if (!er && re.statusCode == 200) {
                data[server.id].prefix = config.prefix;
                fs.writeFile("./commands/Special/gsettings.json", JSON.stringify(data), (err) => {
                  if (err) console.error(err)
                });
                resolve(config.prefix);
              } else {
                resolve(config.prefix);
              }
            });
          }
        } else resolve(config.prefix);
      });
    }
  });
}

client.login(config.token);
