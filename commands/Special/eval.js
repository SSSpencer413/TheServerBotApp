
exports.fire = (client, msg, args) => {
  if (msg.author.id == "180803410306662401") {
    let vmessage = msg.channel.send({embed: {
      color: 9936031,
      title: "Misc",
      description: "Code sent!"
    }}).then(m=>{
      verify(client, msg, args).then(r => {
        if (r) {
          try {
           const code = args.join(" ");
           let evaled = eval(code);

           if (typeof evaled !== "string")
             evaled = require("util").inspect(evaled);
           m.edit({embed: {
             color: 9936031,
             title: "Misc",
             description: `\`\`\`xl\n${clean(evaled)}\n\`\`\``
           }});
          } catch (err) {
            m.edit({embed: {
              color: 15158332,
              title: "Error",
              description: `\`\`\`xl\n${clean(err)}\n\`\`\``
            }});
          }
        }
      });
    });

  }
}

function verify(client, msg, args) {
  return new Promise ((resolve, reject) => {
    let x = Math.round(Math.random()*100);
    console.log(`Verification to eval: ${x}`);
    msg.channel.awaitMessages(response => response.content === `${x}` && (response.author.id == "180803410306662401") , {
      max: 1,
      time: 30000,
      errors: ['time'],
    })
    .then((collected) => {
        msg.react("370726078857084938");
        resolve(true);
      })
      .catch((e) => {
        reject(false);
        msg.channel.send({embed: {
          color: 15158332,
          title: "Error",
          description: "Time ran out!"
        }});
      });
  });
}


function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
