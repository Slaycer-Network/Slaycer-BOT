/*global CMDs, playList*/
/*eslint no-undef: "error"*/
const { search, isLink, typeResolve, loadType } = require("./CMDFuncions/search.js")
const { connect } = require("./CMDFuncions/connection.js")
const play = require("./CMDFuncions/dispatcher.js")
const list = require("./CMDFuncions/playing.js")

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
            if (!args[0]) return message.reply("você não escreveu nada para eu tocar!!")

            const song = await search(client ,await isLink(args.join(" ")))

            if (song === null) return message.reply("parece que aconteceu algum erro 😭!")
            let type = await typeResolve(song.loadType, message, loadType)
            if (type === 0) return

            let { tracks } = song
            if (tracks[0].info.isStream === true) return message.reply("este comando não disponibiliza suporta striming!!")

            const player = await connect(client, message)
            if (!player) return

            if (!playList[message.guild.id] || !playList[message.guild.id][0]) {
                if (!Array.isArray(playList[message.guild.id])) playList[message.guild.id] = []
                playList[message.guild.id].push({
                    track: tracks[0].track,
                    info: tracks[0].info,
                    dj: message.author
                })
                play.play(client, message, player, play)

                message.reply(await list.youtubeFist(message.guild.id))
            } else {
                playList[message.guild.id].push({
                    track: tracks[0].track,
                    info: tracks[0].info,
                    dj: message.author
                })
                message.reply(await list.youtubeAdd(message.guild.id))
            }

        } catch (error) {
            CMDs.erro(client, message, cmd, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}