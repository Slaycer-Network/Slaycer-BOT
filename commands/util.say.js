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
                    let emoji = await client.emojis.resolve(id)
                    // eslint-disable-next-line require-atomic-updates
                    if (emoji) args[i] = emoji
                } else if (args[i].startsWith(":") && args[i].endsWith(":")) {
                    let name = args[i].slice().split(":")[1]
                    let emoji = await client.emojis.filter(g => g.name == name)
                    // eslint-disable-next-line require-atomic-updates
                    if (emoji) args[i] = emoji.first()
                }
            }

            await message.channel.send(args.join(" "))
        } catch (error) {
            CMDs.erro(client, message, cmd, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}