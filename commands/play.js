const error = require("./Special/Error.js");
exports.run = (client, msg, args) => {
  error.fire(msg, `Command coming soon...`);
/*
  // play streams using ytdl-core
  const ytdl = require('ytdl-core');
  const streamOptions = { seek: 0, volume: 1 };
  let channel = msg.guild.channels.find('name', args[0]);
  if (!channel) return error.fire(msg, `Invalid voice channel!`);
  let lin = args[1];
  if (!lin) return error.fire(msg, `Please provide a link to play!`);
  if (!lin.startsWith("https://www.youtube.com/watch?v=") && !lin.startsWith("https://youtu.be/") && !lin.startsWith("https://m.youtube.com/")) return error.fire(msg, `Invalid link!`);
  channel.join()
   .then(connection => {
    const stream = ytdl(lin, {filter : 'audioonly'});
    const dispatcher = connection.playStream(stream, streamOptions);
    msg.channel.send({embed: {
      color: 16776960,
      title: "Fun/Music",
      description: `Now playing: ${lin} in ${channel}`,
    }});
    dispatcher.on("end", ()=>{
      msg.channel.send({embed: {
        color: 16776960,
        title: "Fun/Music",
        description: `Song ended!`,
      }});
    });
   })
   .catch(console.error);
*/
}


exports.help = (client, msg) => {
  let info = {};
  info.Description = "Play a link in a voice channel!";
  info.Name = "play";
  info.Usage = "play <Voice Channel Name> <Youtube Link>";
  info.Example = "s!play Music https://www.youtube.com/watch?v=dfnCAmr569k";
  info.Category = "Fun";
  info.Color = 16776960;

  return info;
}
