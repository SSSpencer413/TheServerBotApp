const Discord = require('discord.js');
const config = require("./config.json");
const Manager = new Discord.ShardingManager('./main.js', {totalShards: "auto", token: config.token});
const logger = require("./commands/Special/Logger.js");
Manager.spawn();

Manager.on('launch', shard => {
  console.log(process.env+"<");
  console.log(`Successfully launched shard ${shard.id}`);
  logger.log("Sharding", `Launched shard: ${shard.id}`);
});
