const { shardManager } = require("./GlobalFuncions/Mconsole.js")
const tokens = require("./data/tokens.json")
const { ShardingManager } = require("discord.js")

const manager = new ShardingManager("./bot.js", {
    token: tokens.discord.token
})

manager.spawn()

manager.on("shardCreate", async (shard) => {
    console.log(await shardManager("create", shard, manager))
})