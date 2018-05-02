
const fs = require("fs");
const needle = require("needle");
exports.fire = (client, msg) => {
    const gsettings = JSON.parse(fs.readFileSync("./commands/Special/gsettings.json", "utf8"));
  msg.guild.member(client.user).setNickname(msg.guild.name);
    if(!msg.guild.roles.find("name", "BotManager")) {
      msg.guild.createRole({
        name: 'BotManager',
        color: 10038562
      },"Setup 1/4");
    }
    if(!msg.guild.roles.find("name", "BotAdmin")) {
      msg.guild.createRole({
        name: 'BotAdmin',
        color: 15105570
      },"Setup 2/4");
    }
    if(!msg.guild.roles.find("name", "S̕̕͡ì̛̆l̎̋͞e̔̓͂ñ̍͝č̾͡ȅ̀̕d̈́͒͡")) {
      msg.guild.createRole({
        name: 'S̕̕͡ì̛̆l̎̋͞e̔̓͂ñ̍͝č̾͡ȅ̀̕d̈́͒͡',
        color: 1
      },"Setup 3/4");
    }
    if(!gsettings[msg.guild.id].botChannel) {
      if (!msg.guild.channels.find('name', "theserverbotchannel")){
        msg.guild.createChannel('theserverbotchannel','text').then(channel => {
          gsettings[msg.guild.id].botChannel = channel.id;
          fs.writeFile("./commands/Special/gsettings.json", JSON.stringify(gsettings), (err) => {
            if (err) console.error(err)
          });
          needle.post("http://theserverbot.gearhostpreview.com/guildSettings?key="+process.env.APIKey, gsettings, {content_type:"application/json"}, function(er,re){});
        });
      }
    }
}
