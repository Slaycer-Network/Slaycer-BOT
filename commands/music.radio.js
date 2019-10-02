/*global CMDs, playingNow*/
/*eslint no-undef: "error"*/
const radios = require("../data/radio.json")
const playing = require("./CMDFuncions/playing.js")
const connect = require("./CMDFuncions/connection.js")
const dispatcher = require("./CMDFuncions/dispatcher.js")

module.exports = {
    help: {
        name: "radio",
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
            if (!args[0]) {
                return
            }
            if (!radios[args[0]]) {
                return
            }

            const connection = await connect.connect(client, message, connect)
            if (!connection) return

            playingNow[message.guild.id] = {
                mode: playing.radio,
                data: radios[args[0]],
                dj: message.author
            }

            await dispatcher.playRadio(client, message, playingNow[message.guild.id] ,connection, dispatcher)

            message.reply(await playingNow[message.guild.id].mode(message.guild.id))
        } catch (error) {
            CMDs.erro(client, message, cmd, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}