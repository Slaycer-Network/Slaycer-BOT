const fs = require("fs")
const { ShardingManager } = require("discord.js") //Chamar o gerenciador de shards da discord.js
const tokens = require("./configs/tokens.js") //Chama o arquivo onde tem os tokens
const locales = require("./locales/console/shardManerger.js")

global.webhookAlerts = {
    erro: require("./webhooksAlerts/error.js"),
    shardManerger: require("./webhooksAlerts/shardManeger.js")
}

const events = fs.readdirSync("./events/shardManager/", {
    withFileTypes: true, 
    encoding: "utf-8"
})

if (!tokens.discord.token) {
    console.log(locales.noTokenDC)
    return process.exit()
}

const manager = new ShardingManager("./bot.js", {
    mode: "worker",
    token: tokens.discord.token
})
    
manager.spawn("auto", 5500, -1).catch(() => {
    console.log(locales.invalTokenDC)
    return process.exit()
})

manager.on("shardCreate", async (shard) => {
    events.forEach(async (file) => {
        if(file.isDirectory()) return
        let isJs = file.name.split(".").slice(-1)[0]
        if(isJs !== "js") return
        const event = file.name.split(".")[0]
        const run = require(`./events/shardManager/${file.name}`)
        shard.on(event, run.bind(null, shard))
    })
})