/*global CMDs*/
/*eslint no-undef: "error"*/

module.exports = {
    help: {
        name: "say",
        aliases: [],
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
            for (let i = 0; i < args.length; i++) {
                if (args[i].includes("<") && (args[i].includes(">") && args[i].includes(":"))) {
                    let id = args[i].slice().split(":").slice(-1)[0].split(">")[0]
                    args[i] = await client.emojis.resolve(id)
                }
            }

            message.channel.send(args.join(" "))
        } catch (error) {
            CMDs.erro(client, message, cmd, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}