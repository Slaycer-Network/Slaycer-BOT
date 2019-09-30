/*global CMDs, playingNow*/
/*eslint no-undef: "error"*/
const radios = require("../data/radio.json")
const playing = require("./CMDFuncions/playing.js")

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
            
            playingNow[message.guild.id] = {
                mode: playing.radio,
                data: radios[args[0]],
                dj: message.author
            }

            message.reply(await playingNow[message.guild.id].mode(message.guild.id))
        } catch (error) {
            CMDs.erro(client, message, cmd, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}