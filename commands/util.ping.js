module.exports = {
    help: {
        name: "ping",
        description: "Latencia de respostas do bot!!"
    },

    config: {
        private: false,
        dev: false,
        cooldown: false,
        permBot: 0,
        permMember: 0
    },

    // eslint-disable-next-line no-unused-vars
    run: async (client, message, args) => {
        const m = await message.channel.send('Ping?')
        m.edit(`<@!${message.author.id}> \n> 🏓 Pong! \n> ⌚ Latência: `+ '`' + (m.createdTimestamp - message.createdTimestamp) + 'ms`'+`\n> ⚡ Latencia da API: ` + '`' + Math.round(client.ws.ping) + 'ms`')
    }
}