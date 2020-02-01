/*global playList*/
/*eslint no-undef: "error"*/

module.exports = {
    play: async (client, message, player, play) => {
        const { track } = playList[message.guild.id][0]

        player.play(track)

        play.event(client, message, player, play)
    },

    event: async (client, message, player, play) => {
        player.once("error", console.error);
        player.once("end", async data => {
            playList[message.guild.id].shift()
            if (data.reason === "REPLACED") return
            if (playList[message.guild.id][0]) {
                play.play(client, message, player, play)
            } else {
                await client.lavalink.leave(message.guild.id)
            }
        })
    }
}