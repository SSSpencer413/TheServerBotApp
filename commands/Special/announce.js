const cl = {
  'DEFAULT': 0,
  'AQUA': 1752220,
  'GREEN': 3066993,
  'BLUE': 3447003,
  'PURPLE': 10181046,
  'GOLD': 15844367,
  'ORANGE': 15105570,
  'RED': 15158332,
  'GREY': 9807270,
  'DARKER_GREY': 8359053,
  'NAVY': 3426654,
  'DARK_AQUA': 1146986,
  'DARK_GREEN': 2067276,
  'DARK_BLUE': 2123412,
  'DARK_PURPLE': 7419530,
  'DARK_GOLD': 12745742,
  'DARK_ORANGE': 11027200,
  'DARK_RED': 10038562,
  'DARK_GREY': 9936031,
  'LIGHT_GREY': 12370112,
  'DARK_NAVY': 2899536
}

exports.fire = (client, msg, args) => {
  let server = client.guilds.get(args[0]);
  if (server) {
    let nonMessage = args.splice(0,3);
    let ucolor = 15844367;
    if (nonMessage[1] == "none") {
      nonMessage[1] = "";
    }
    if (nonMessage[2] == "true") {
      nonMessage[2] = true;
    } else {
      nonMessage[2] = false;
    }


    server.systemChannel.send(nonMessage[1], {tts: nonMessage[2],embed:{
      title: "Announcement:",
      description: args.join(" "),
      color: ucolor
    }
  });
  }
}
