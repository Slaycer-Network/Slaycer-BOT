/*global played, playList, playingNow*/
/*eslint no-undef: "error"*/
const ytdl = require("ytdl-core")

module.exports = {
    playRadio: async (client, message, playNow, connection, dispatcher, playing) => {
        played[message.guild.id] = await connection.play(playNow.data.link, {
            highWaterMark: 512,
            bitrate: 'auto'
        })

        dispatcher.events(played[message.guild.id], client, message, connection, playNow, dispatcher, playing)
    },

    playYouTube: async (client, message, connection, dispatcher, playing) => {
        playingNow[message.guild.id] = {
            type: "youtube",
            mode: playing.youtubeFist,
            data: playList[message.guild.id][0].data,
            dj: playList[message.guild.id][0].dj
        }

        let url = `https://youtu.be/${await playingNow[message.guild.id].data.id}`

        played[message.guild.id] = await connection.play(ytdl(url, { filter: 'audioonly' }), {
            highWaterMark: 512,
            bitrate: 'auto'
        })

        dispatcher.events(played[message.guild.id], client, message, connection, playingNow[message.guild.id], dispatcher, playing)
    },

    events: async (play, client, message, connection, playNow, dispatcher, playing) => {
        play.on('finish', async () => {
            if (playNow.type === "radio") {
                playingNow[message.guild.id] = {}
                connection.disconnect()
            } else {
                playList[message.guild.id].shift()
                if (!playList[message.guild.id][0]) {
                    playingNow[message.guild.id] = {}
                    connection.disconnect()
                } else {
                    dispatcher.playYouTube(client, message, connection, dispatcher, playing)
                }
            }
        })
    }
}