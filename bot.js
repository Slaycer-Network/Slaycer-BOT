/*global CMDs, dbcmd, clcError*/
/*eslint no-undef: "error"*/

const tokens = require("./data/tokens.json")
const config = require("./data/config.json")
const mongoose = require("mongoose")
const Mconsole = require("./GlobalFuncions/Mconsole.js")
const fs = require('fs')
global.clcError = Mconsole.clcError

async function db(shardID) {
    const { database } = Mconsole
    const { connect, auth } = tokens.mongo
    for (let i in connect) {
        if (!connect[i]) {
            console.log(await database("unknownData", shardID))
            return false
        }
    }
    let eAuth = true
    for (let i in auth) {
        if (!auth[i]) {
            console.log(await database("noAuthentication", shardID))
            eAuth = false
        }
    }

    try {
        if (eAuth) {
            await mongoose.connect(`mongodb://${auth.user}:${auth.password}@${connect.ip}:${connect.port}/${connect.database}?authSource=admin`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        } else {
            await mongoose.connect(`mongodb://${connect.ip}:${connect.port}/${connect.database}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        }
        console.log(await database("authentication", shardID))
        return true
    } catch (error) {
        console.log(await database("errAuthentication", shardID))
        console.log(await clcError(error))
        return false
    }
}

async function runDiscord() {
    const Discord = require("discord.js")
    const client = new Discord.Client()

    client.prefix = config.discord.prefix
    client.dev = config.discord.dev
    client.ytAPI = config.youtube.API
    client.cooldown = new Set()
    global.startRun = Date.now()
    global.commands = {}
    global.aliases = new Map()
    global.CMDs = require("./GlobalFuncions/cmd.js")
    global.up = require("./GlobalFuncions/uptime.js")
    global.bShard = require("./GlobalFuncions/broadcastShard.js")
    global.playingNow = {}
    global.cnt = {}
    global.played = {}
    global.playList = {}

    let mdb = await db((client.shard.ids[0] + 1))
    if (!mdb) return process.exit()
    require("./GlobalFuncions/MongoSchemas/cmd.js")

    global.dbcmd = mongoose.model("Commands")

    const cmdFiles = fs.readdirSync('./commands/')
    const { cmd } = Mconsole
    cmdFiles.forEach(async (file) => {
        try {
            if (file.split('.').slice(-1)[0] === 'js') {
                const cmd = require(`./commands/${file}`)
                await CMDs.register(cmd, file, dbcmd, (client.shard.ids[0] + 1))
            }
        } catch (error) {
            console.log(await cmd("loadError", (client.shard.ids[0] + 1), file.split('.')[1]))
            console.log(await clcError(error))
        }
    })
    
    const onFiles = fs.readdirSync('./events/on/')
    onFiles.forEach(async (file) => {
        if (file.split('.').slice(-1)[0] === 'js') {
            const onName = file.split('.')[0]
            const run = require(`./events/on/${file}`)
            client.on(onName, run.bind(null, client))
        }
    })

    const onceFiles = fs.readdirSync('./events/once/')
    onceFiles.forEach(async (file) => {
        if (file.split('.').slice(-1)[0] === 'js') {
            const onceName = file.split('.')[0]
            const run = require(`./events/once/${file}`)
            client.once(onceName, run.bind(null, client))
        }
    })

    try {
        await client.login(tokens.discord.token)
    } catch (error) {
        console(await clcError(error))
        return process.exit()
    }
}

runDiscord()