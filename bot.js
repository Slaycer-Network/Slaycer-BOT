/*global CMDs, dbcmd*/
/*eslint no-undef: "error"*/

const tokens = require("./data/tokens.json")
const config = require("./data/config.json")
const mongoose = require("mongoose")

async function db(shardID) {
    const { database } = require("./GlobalFuncions/Mconsole.js")
    const { connect, auth } = tokens.mongo
    for (let i in connect) {
        if (!connect[i]) {
            console.log("WIP")
            return false
        }
    }
    let eAuth = true
    for (let i in auth) {
        if (!auth[i]) {
            console.log("WIP")
            eAuth = false
        }
    }

    try {
        if (eAuth) {
            await mongoose.connect(`mongodb://${auth.user}:${auth.password}@${connect.ip}:${connect.port}/${connect.database}?authSource=admin`, {useNewUrlParser: true})
            return true
        } else {
            await mongoose.connect(`mongodb://${connect.ip}:${connect.port}/${connect.database}`, {useNewUrlParser: true})
            return true
        }
    } catch (error) {
        console.log("WIP")
        return false
    }
}

async function runDiscord() {
    const Discord = require("discord.js")
    const client = new Discord.Client()

    client.prefix = config.discord.prefix
    client.dev = config.discord.dev
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

    await client.login(tokens.discord.token)

    if (!(await db(client.shard.id))) return process.exit()
    require("./GlobalFuncions/MongoSchemas/cmd.js")

    global.dbcmd = mongoose.model("Commands")
/*
    Rever esta parte para ver se funciona
    \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/
*/
    const fs = require('fs')
    const cmdFiles = fs.readdirSync('./commands/')
    cmdFiles.forEach(async (file) => {
        try {
            if (file.split('.').slice(-1)[0] === 'js') {
                const cmd = require(`./commands/${file}`)
                await CMDs.register(cmd, file, dbcmd)
            }
        } catch (error) {
            console.log(/*`[${tags.ERROR}] Não fui possivel executar o comando ${file}:`*/ "WIP")
            console.log(error)
        }
    })
/*
    /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\
    Rever esta parte para ver se funciona
*/
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
}

runDiscord()