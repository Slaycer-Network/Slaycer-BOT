const tokens = require("./data/tokens.json")
const { ShardingManager } = require("discord.js")

const manager = new ShardingManager("./index.js", {
    token: tokens.discord.token
})

manager.spawn()

manager.on("shardCreate", shard => console.log(`Shard ${shard.id + 1} de ${manager.totalShards} ligado!!`))