/*global commands*/
/*eslint no-undef: "error"*/
module.exports = async (client, message) => {
    if (message.author.bot) return
    if (message.channel.type !== "dm") {
        if (message.content.startsWith(client.prefix)) {
            const fullCmd = message.content.replace(client.prefix, '').split(' ')
            const cmd = fullCmd.shift()
            const args = fullCmd

            if (!commands[cmd]) return

            if (!message.guild.me.permissionsIn(message.channel).has(2048)) {
                await message.author.send('Não tenho permição para falar no canal que executou o comando')
                    .catch(async () => {return})
                return
            }

            if (commands[cmd].config.dev && !client.dev.includes(message.author.id)) {
                await message.channel.send(`**${message.author} você não é desenvolvedor!!**`)
                return
            }

            if (!message.guild.me.hasPermission(commands[cmd].config.permaBot)) {
                await message.channel.send(`**${message.author} eu não tenho permição para fazer isso!!**`)
                return
            }

            if (!message.member.hasPermission(commands[cmd].config.permMember) ) {
                await message.channel.send(`**${message.author} tu não tens permição para fazer isso!!**`)
                return
            }

            commands[cmd].run(client, message, args)
        }
    }
}