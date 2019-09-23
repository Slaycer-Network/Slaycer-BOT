const Discord = require("discord.js")

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
        try {
            const embed1 = new Discord.MessageEmbed()
                .setColor([250, 244, 41])
                .setTitle('Ping?')

            const m = await message.channel.send(embed1)

            const embed2 = new Discord.MessageEmbed()
                .setColor([153, 61, 0])
                .setTitle('🏓 Pong!')
                .addField('⌚ Latência', `${(m.createdTimestamp - message.createdTimestamp)}ms`, true)
                .addField('⚡ Latencia da API', `${Math.round(client.ws.ping)}ms`, true)

            m.edit(`${message.author}`, embed2)
        } catch (error) {
            console.log(`Falha ao enviar o comando ${this.help.name}!!`)
            console.log(error)
        }
    }
}