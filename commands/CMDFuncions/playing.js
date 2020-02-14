/*global playList*/
/*eslint no-undef: "error"*/
const Discord = require("discord.js")

module.exports = {
    youtubeFist: async (guild) => {
        const embed = new Discord.MessageEmbed()
            .setTitle("🎵 Tocando")
            .setDescription(`[${playList[guild][0].info.title}](${playList[guild][0].info.uri})`)
            .setFooter(`DJ: ${playList[guild][0].dj.tag}`, playList[guild][0].dj.displayAvatarURL())

        return embed
    },

    youtubeAdd: async (guild) => {
        const embed = new Discord.MessageEmbed()
            .setTitle("🎵 Adicionado na lista")
            .setDescription(`[${playList[guild][playList[guild].length - 1].info.title}](${playList[guild][playList[guild].length - 1].info.uri})`)
            .setFooter(`DJ: ${playList[guild][playList[guild].length - 1].dj.tag}`, playList[guild][playList[guild].length - 1].dj.displayAvatarURL())

        return embed
    }
}