/*global playList, CMDs*/
/*eslint no-undef: "error"*/
const { youtubeFist } = require("./CMDFuncions/playing.js")
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
            if (!playList[message.guild.id][0]) {
                await message.reply("eu não estou tocando nenhuma musica!!")
            } else {
                await message.reply(await youtubeFist(message.guild.id))
            }
        } catch (error) {
            CMDs.erro(client, message, cmd, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}