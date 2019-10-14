/*global CMDs, playingNow, playList*/
/*eslint no-undef: "error"*/
const playing = require("./CMDFuncions/playing.js")
const connect = require("./CMDFuncions/connection.js")
const dispatcher = require("./CMDFuncions/dispatcher.js")
const YouTube = require("simple-youtube-api")
const ytdl = require("ytdl-core")

module.exports = {
    help: {
        name: "play",
        aliases: ["tocar"],
        description: "Tocar musicas do youtube"
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

            let data = await ytdl.getBasicInfo(`https://youtu.be/${await results[0].id}`)

            if (data.status !== "ok") {
                message.channel.send(`${message.author} parece que estou tendo problemas com o youtube desculpe!!`)
                return
            }

            if (data.player_response.videoDetails.lengthSeconds > 7200) {
                message.channel.send(`${message.author} o seu video tem mais de 2 horas de reprodução, por esse motivo fui bloqueado!`)
                return
            }

            const connection = await connect.connect(client, message, connect)
            if (!connection) return

            if (playingNow[message.guild.id] && playingNow[message.guild.id].type === "youtube") {
                message.channel.send(`${message.author} saindo do modo radio e passando para o sistema do YouTube!!`)
                playList[message.guild.id].splice(0)
            }

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
                message.reply(await playing.youtubeAdd(message.guild.id))
            }
        } catch (error) {
            CMDs.erro(client, message, cmd, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}