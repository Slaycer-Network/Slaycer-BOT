/*global played*/
/*eslint no-undef: "error"*/
module.exports = {
    playRadio: async (client, message, playNow ,connection, dispatcher) => {
        played[message.guild.id] = await connection.play(playNow.data.link)

        dispatcher.events(played[message.guild.id], client, message, connection, playNow)
    },
    playYouTube: async () => {},
    events: async (play, client, message, connection, playNow) => {
        play.on('finish', async () => {
            if (playNow.type === "radio") {
                connection.disconnect()
            } else {
                console.log("WIP")
            }
        })
    }
}