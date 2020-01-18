/*global played, playList, playingNow*/
/*eslint no-undef: "error"*/

module.exports = {
    playRadio: async (client, message, playNow, connection, dispatcher, playing) => {
        played[message.guild.id] = await connection.play(playNow.data.link, {
            highWaterMark: 512,
            bitrate: 'auto'
        })

        dispatcher.events(played[message.guild.id], client, message, connection, playNow, dispatcher, playing)
    },

    playYouTube: async (client, message, connection, dispatcher, playing) => {
        
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