/*global CMDs*/
/*eslint no-undef: "error"*/

const Discord = require("discord.js")

module.exports = {
    help: {
        name: "ping",
        aliases: [],
        description: "Latencia de respostas do bot!!"
    },

    config: {
        private: false,
        dev: false,
        permBot: 0,
        permMember: 0
    },

    // eslint-disable-next-line no-unused-vars
    run: async (client, message, args, cmd) => {
        try {
            const m = await message.channel.send("Ping?")

            const embed = new Discord.MessageEmbed()
                .setColor([153, 61, 0])
                .setTitle('🏓 Pong!')
                .addField('⌚ Latência', `${(m.createdTimestamp - message.createdTimestamp)}ms`, true)
                .addField('⚡ Latencia da API', `${Math.round(client.ws.ping)}ms`, true)

            m.edit(`${message.author}`, embed)
        } catch (error) {
            CMDs.erro(client, message, cmd, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}