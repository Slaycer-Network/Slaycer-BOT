/*global CMDs, playingNow, playList*/
/*eslint no-undef: "error"*/
const { search, isLink, typeResolve, loadType } = require("./CMDFuncions/search.js")

module.exports = {
    help: {
        name: "play",
        aliases: ["tocar"],
        description: "Tocar musicas"
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
            if (!message.member.voice.channel) return 
            if (!args[0]) return message.reply("você não escreveu nada para eu tocar!!")

            const song = await search(client ,await isLink(args.join(" ")))

            if (song === null) return message.reply("parece que aconteceu algum erro 😭!")
            let type = await typeResolve(song.loadType, message, loadType)
            if (type === 0) return

            let { tracks } = song
            if (tracks[0].info.isStream === true) return message.reply("este comando não disponibiliza suporta striming!!")
            

        } catch (error) {
            CMDs.erro(client, message, cmd, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}