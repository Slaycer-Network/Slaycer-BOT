const clc = require("cli-color")
const tokens = require("./data/tokens.json")
const { ShardingManager } = require("discord.js")

const manager = new ShardingManager("./bot.js", {
    token: tokens.discord.token
})

manager.spawn()

manager.on("shardCreate", async (shard) => {
    const sm = clc.yellowBright("[ShardingManager]")
    const sid = clc.cyanBright(`${shard.id + 1}`)
    const st = clc.cyanBright(`${manager.totalShards}`)

    console.log(`${sm} Ativando shard ${sid}/${st}`)
})