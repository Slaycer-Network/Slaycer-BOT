/*global cnt, playList, played, playingNow*/
/*eslint no-undef: "error"*/

module.exports = {
    connect: async (client, message) => {
        if (!message.member.voice.channel)
    },
    // eslint-disable-next-line no-unused-vars
    events: async (connection, client, message) => {
        connection.on("disconnect", () => {
            if (playingNow[message.guild.id] && playingNow[message.guild.id].type === "youtube") {
                playList[message.guild.id].splice(0)
            }
            playingNow[message.guild.id] = {}
            played[message.guild.id].destroy()
        })
        
        connection.on("error", async (error) => {
            message.channel.send(`${message.author} por algum motivo tive um problema de conectar o canal de voz!! ${error}`)
            console.log(error)
        })
    }
}