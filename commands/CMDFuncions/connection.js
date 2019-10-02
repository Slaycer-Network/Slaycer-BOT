/*global CMDs, playingNow, cnt*/
/*eslint no-undef: "error"*/

module.exports = {
    connect: async (client, message, connect) => {
        if (!message.guild.me.voice.channel || !cnt[message.guild.id]) {
            let channelvoice = await message.member.voice.channel
            if (!channelvoice) {
                message.reply('precisas de estar em um canal de voz primeiro!!')
                return
            }
            if (!channelvoice.joinable) {
                message.reply('não tenho permissão para entrar nesse canal!!')
                return
            }

            return cnt[message.guild.id] = await channelvoice.join()
                .then(async (connection) => {
                    await connection.voice.setSelfDeaf(true)
                    connect.events(connection, client, message)
                    return connection
                })
        } else if (message.member.voice.channel !== message.guild.me.voice.channel) {
            message.reply('você tem de estar no mesmo canal do  que eu!!')
            return
        } else {
            return cnt[message.guild.id]
        }
    },
    // eslint-disable-next-line no-unused-vars
    events: async (connection, client, message) => {
        connection.on("disconnect", () => {
            playingNow[message.guild.id] = {}
        })
    }
}