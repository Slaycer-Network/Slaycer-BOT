/*global CMDs, playingNow, playList*/
/*eslint no-undef: "error"*/
const playing = require("./CMDFuncions/playing.js")
const connect = require("./CMDFuncions/connection.js")
const dispatcher = require("./CMDFuncions/dispatcher.js")
const YouTube = require("simple-youtube-api")

module.exports = {
    help: {
        name: "play",
        description: "Tocar musicas do youtube"
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
            if (!args.join(' ')) {
                message.channel.send(`${message.author} você não pesquisou nada!!`)
                return
            }

            const youtube = new YouTube(client.ytAPI)

            let results = await youtube.searchVideos(args.join(" "), 1)

            if (!results[0]) {
                message.channel.send(`${message.author} parece que essa musica não está diponivel na região que estou!!`)
                return
            }

            const connection = await connect.connect(client, message, connect)
            if (!connection) return

            if (!playList[message.guild.id] || !playList[message.guild.id][0]) {
                if (!playList[message.guild.id]) {
                    playList[message.guild.id] = []
                }
                playList[message.guild.id].push({
                    data: results[0],
                    dj: message.author
                })

                await dispatcher.playYouTube(client, message, connection, dispatcher, playing)
                
                message.reply(await playingNow[message.guild.id].mode(message.guild.id))
            } else  {
                playList[message.guild.id].push({
                    data: results[0],
                    dj: message.author
                })
            }
        } catch (error) {
            CMDs.erro(client, message, cmd, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}