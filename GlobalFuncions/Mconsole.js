//locais dos textos
const mConsole = require("../locales/pt/messages/console/mesages.json")
const tags = require("../locales/pt/messages/console/tags.json")

//Cores do terminal
const clc = require("cli-color")
let colorNull = clc.redBright.bgBlue.bold
let mgsNull = colorNull(mConsole.Null)
let yellow = clc.yellowBright
let green = clc.greenBright

module.exports = {
    shardManager: async (name, shard, manager) => {
        const { shardManager } = mConsole

        if(!shardManager[name]) return mgsNull
        else return shardManager[name].slice().replace("{SM}", yellow("[ShardingManager]"))
                                              .replace("{shard}", green(`${shard.id + 1}`))
                                              .replace("{shardTotal}", green(`${manager.totalShards}`))
    }
}