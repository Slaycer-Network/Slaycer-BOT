/*global tags*/
/*eslint no-undef: "error"*/
const RPCs = require("../../data/precense.json")

module.exports = async (client) => {
    console.log(`[${tags.SUCCESS}] ${client.user.username} fui iniciado com sucesso!!`)

    async function precence(i) {
        let uptime = await up.uptime
        let prefix = client.prefix

        await client.user.setPresence(RPCs[i])

        setTimeout(async () => {
            let u = i + 1
            if (u >= RPCs.length) u = 0
            precence(u)
        }, 30 * 1000)
    }

    precence(0)
}