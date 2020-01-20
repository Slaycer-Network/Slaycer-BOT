/*global CMDs*/
/*eslint no-undef: "error"*/

const moment = require('moment-timezone')
const Discord = require('discord.js')

module.exports = {
    help: {
        name: "userinfo",
        aliases: ["ui"],
        description: "Informações sobre de uma pessoa da guild"
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
            let User = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
            if(!User) User = message.guild.member(message.author.id)

            moment.locale('pt')

            const tempoAcc = moment(User.user.createdTimestamp)
            const tempoServer = moment(User.joinedTimestamp)
            const contaCriada = tempoAcc.tz('Europe/Lisbon').format('lll')
            const entrouNoServer = tempoServer.tz('Europe/Lisbon').format('lll')

            const embed = new Discord.MessageEmbed()
                .setTitle(`Informação de Conta do ${User.user.username}`)
                .setThumbnail(User.user.displayAvatarURL({format: "png", dynamic: true}))
                .setFooter(`*(Horario de Lisboa)`, 'https://i.imgur.com/Y7lq7lZ.png')
                .addField(`Tag`, User.user.tag, true)
                .addField(`ID`, User.user.id, true)
                .addField(`Conta criada*`, contaCriada, true)
                .addField(`Entrou no servidor*`, entrouNoServer, true)

            await message.reply(embed)
        } catch (error) {
            CMDs.erro(client, message, cmd, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}