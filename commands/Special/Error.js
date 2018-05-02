exports.fire = (msg, error) => {
  msg.channel.send({embed: {
    author: {
      iconURL: msg.author.avatarURL
    },
    color: 15158332,
    footer:{text: "Join https://discord.gg/WAT4R33 if this is a mistake!"},
    title: "Error",
    description: "<:CrossMark:370726096188080158> `"+error+"` <:CrossMark:370726096188080158>",
  }
});
}
