/*global CMDs, playingNow, playList*/
/*eslint no-undef: "error"*/

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
            
        } catch (error) {
            CMDs.erro(client, message, cmd, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}