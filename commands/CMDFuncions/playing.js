/*global playingNow*/
/*eslint no-undef: "error"*/
const axios = require('axios')
const Discord = require("discord.js")

module.exports = {
    radio: async (guild) => {
        const embed = new Discord.MessageEmbed()
            .setTitle("🎵 Tocando - Radio")
            .setDescription(`[${playingNow[guild].data.name}](${playingNow[guild].data.homepage})`)
            .setFooter(`DJ: ${playingNow[guild].dj.tag}`, playingNow[guild].dj.displayAvatarURL())

        async function type(type) {
            if (type === "ajax1") {
                try {
                    const API = await axios.get(playingNow[guild].data.api.link)
                    const data = API.data.split("£").slice(2,5)
                    embed.addField(`Musica`, data[1], true)
                    embed.addField(`Autor/es`, data[0], true)
                    embed.setThumbnail(data[2])
                    return embed
                } catch (error) {
                    return embed
                }   
            } else {
                return embed
            }
        }

        return await type(playingNow[guild].data.api.type)
    },
    youtubeFist: async (guild) => {
        const embed = new Discord.MessageEmbed()
            .setTitle("🎵 Tocando - Youtube")
            .setDescription(`[${playingNow[guild].data.title}](${`https://youtu.be/${await playingNow[guild].data.id}`})`)
            .setFooter(`DJ: ${playingNow[guild].dj.tag}`, playingNow[guild].dj.displayAvatarURL())
            .setThumbnail(playingNow[guild].data.thumbnails.high.url)

        return embed
    }
}