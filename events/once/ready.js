/*global tags, up*/
/*eslint no-undef: "error"*/
const RPCs = require("../../data/precense.json")

module.exports = async (client) => {
    console.log(`[${tags.SUCCESS}] ${client.user.username} fui iniciado com sucesso!!`)

    let u = 0

    let name = []

    for (let i = 0; i < RPCs.length; i++) {
        name[i] = RPCs[i].activity.name;
    }

    async function precence(i) {
        let RPC = RPCs[i]

        RPC.activity.name = await name[i].slice().replace("{uptime}", await up.uptime(Date.now()))
                                                 .replace("{prefix}", client.prefix)

        await client.user.setPresence(RPC)
    }

    precence(u)

    setInterval(() => {
        u = u + 1
        if (u >= RPCs.length) u = 0
        precence(u)
    }, 30 * 1000)

}