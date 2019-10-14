/*global CMDs, playingNow, playList*/
/*eslint no-undef: "error"*/
const radios = require("../data/radio.json")
const playing = require("./CMDFuncions/playing.js")
const connect = require("./CMDFuncions/connection.js")
const dispatcher = require("./CMDFuncions/dispatcher.js")

module.exports = {
    help: {
        name: "radio",
        aliases: ["fm"],
        description: "Ouvir uma tramição de radio"
    },

    config: {
        private: false,
        dev: false,
        permBot: 0,
        permMember: 0,
        permBotChannel: 0,
        permMemberChannel: 0
    },

    // eslint-disable-next-line no-unused-vars
    run: async (client, message, args, cmd) => {
        try {
            if (!args[0]) {
                let list = []

                for (let i in radios) {
                    list.push(`${radios[i].name}\n>>>>> ${client.prefix}${cmd} ${i}`)
                }

                message.channel.send(`${message.author} radio disponiveis:\n\`\`\`\n${list.join(`\n`)}\n\`\`\``)

                return
            }
            if (!radios[args[0]]) {
                message.channel.send(`${message.author} essa radio é desconhecida!!`)
                return
            }

            const connection = await connect.connect(client, message, connect)
            if (!connection) return

            if (playingNow[message.guild.id] && playingNow[message.guild.id].type === "youtube") {
                message.channel.send(`${message.author} saindo do sistema do YouTube e passando para modo radio!!`)
                playList[message.guild.id].splice(0)
            }

            playingNow[message.guild.id] = {
                type: "radio",
                mode: playing.radio,
                data: radios[args[0]],
                dj: message.author
            }

            await dispatcher.playRadio(client, message, playingNow[message.guild.id] ,connection, dispatcher, playing)

            message.reply(await playingNow[message.guild.id].mode(message.guild.id))
        } catch (error) {
            CMDs.erro(client, message, cmd, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}