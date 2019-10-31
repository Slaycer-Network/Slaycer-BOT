/*global up, bShard*/
/*eslint no-undef: "error"*/
const RPCs = require("../../data/precense.json")
const { ready } = require("../../GlobalFuncions/Mconsole.js")

module.exports = async (client) => {
    console.log(await ready(client))

    let u = 0

    let name = []

    for (let i = 0; i < RPCs.length; i++) {
        name[i] = RPCs[i].activity.name;
    }

    async function precence(i) {
        let RPC = RPCs[i]

        RPC.activity.name = await name[i].slice().replace("{uptime}", await up.uptime(Date.now()))
                                                 .replace("{prefix}", client.prefix)
                                                 .replace("{guilds}", await bShard.guildSize(client.shard))

        await client.user.setPresence(RPC)
    }

    precence(u)

    setInterval(() => {
        u = u + 1
        if (u >= RPCs.length) u = 0
        precence(u)
    }, 30 * 1000)

}