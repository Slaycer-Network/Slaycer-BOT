/*global playingNow*/
/*eslint no-undef: "error"*/
module.exports = {
    help: {
        name: "playing",
        aliases: ["tocando", "np"],
        description: "Latencia de respostas do bot!!"
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
            message.reply(await playingNow[message.guild.id].mode(message.guild.id))
        } catch (error) {
            CMDs.erro(client, message, cmd, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}