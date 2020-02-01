module.exports = {
    connect: async (client, message) => {
        if (!message.member.voice.channel) {
            message.reply("vocês precisa de estar em 1 canal primeiro!!")
            return
        }
        if (message.guild.me.voice.channel && message.guild.me.voice.channel !== message.member.voice.channel) {
            message.reply("precisas de estar no mesmo canal que eu!!")
            return
        }
        if (!message.guild.me.voice.channel && !message.member.voice.channel.joinable) {
            message.reply("parece que não consigo entrar no canal pretendido!")
            return
        }
        
        try {
            return await client.lavalink.join({
                guild: message.guild.id,
                channel: message.member.voice.channel.id,
                host: client.lavalink.nodes.first().host
            })
        } catch (error) {
            message.reply("parece que houve 1 erro ao tentar entrar na sala! 😭")
            console.log(error)
            return
        }
    }
}