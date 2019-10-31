//locais dos textos
const mConsole = require("../locales/pt/messages/console/mesages.json")
const tags = require("../locales/pt/messages/console/tags.json")

//Cores do terminal
const clc = require("cli-color")
let colorNull = clc.redBright.bgBlue.bold
let mgsNull = colorNull(mConsole.Null)
let yellow = clc.yellowBright
let green = clc.greenBright

//tags e a usas cores
async function colorTags (mgs) {
    let cT = {
        warning :   clc.yellowBright(`[${tags.WARNING}]`),
        error   :   clc.redBright(`[${tags.ERROR}]`),
        success :   clc.greenBright(`[${tags.SUCCESS}]`),
        info    :   clc.blueBright(`[${tags.INFO}]`)
    }
    return await mgs.replace("{WARNING}", cT.warning)
                    .replace("{ERROR}", cT.error)
                    .replace("{SUCCESS}", cT.success)
                    .replace("{INFO}", cT.info)
}

module.exports = {
    shardManager: async (name, shard, manager) => {
        const { shardManager } = mConsole

        if(!shardManager[name]) return mgsNull
        else {
            let frase = await colorTags(shardManager[name].slice())
            return frase.replace("{SM}", yellow("[ShardingManager]"))
                        .replace("{shard}", green(`${shard.id + 1}`))
                        .replace("{shardTotal}", green(`${manager.totalShards}`))
        } 
    },

    cmd: async (name, shardId, command) => {
        const { cmd } = mConsole
        let shardTag = clc.cyan(`[Shard-${shardId}]`)

        if (!cmd[name]) return mgsNull
        else {
            let frase = await colorTags(cmd[name].slice())
            let rFrase = await frase.replace("{command}", clc.cyanBright(command))
            return `${shardTag}${rFrase}`
        }
    },

    database: async (name, shardId) => {
        const { database } = mConsole
        let shardTag = clc.cyan(`[Shard-${shardId}]`)

        if(!database[name]) return mgsNull
        else if (Array.isArray(database[name])) {
            let mgs = []
            for (let i in database[name]) {
                let u = `${shardTag}${await colorTags(database[name][i].slice())}`
                mgs.push(u)
            }
            return mgs.join("\n")
        } else {
            return `${shardTag}${await colorTags(database[name].slice())}`
        }
    },

    ready: async (client) => {
        const { ready } = mConsole
        let frase = await colorTags(ready.slice())
        let u = await frase.replace("{BotName}", client.user.username)
        let shardTag = clc.cyan(`[Shard-${client.shard.ids[0] + 1}]`)
        return `${shardTag}${u}`
    },

    clcError: async (error) => {
        return clc.redBright(error)
    } 
}