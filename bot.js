const { Client } = require("discord.js")

const client = new Client()

const { token } = require("./configs/tokens.js").discord

client.login(token)