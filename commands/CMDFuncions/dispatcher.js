module.exports = {
    playRadio: async (client, message, playNow ,connection, dispatcher) => {
        const play = await connection.play(playNow.data.link)

        dispatcher.events(play, client, message, connection)
    },
    events: async (play, client, message, connection) => {

    }
}