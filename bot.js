const { Client } = require("discord.js")

const client = new Client()

const { token } = require("./configs/tokens.js").discord

client.on("ready", async () => {
    console.log("iniciou")
    let guild = await client.guilds.cache.first()
    let channel = await guild.channels.cache.get("552279500956762137")
    let m = await channel.send("teste")
    let n = 1
    setInterval(async() => {
        m.edit(n)
        n = n + 1
        console.log("ping")
    }, 10 * 1000)
})

client.login(token)