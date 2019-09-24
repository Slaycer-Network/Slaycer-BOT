/*global commands*/
/*eslint no-undef: "error"*/
module.exports = async (client, message) => {
    if (message.channel.type === "dm") return
    if (message.author.bot) return
    if (message.content.startsWith(client.prefix)) {
        const fullCmd = message.content.replace(client.prefix, '').split(' ')
        const cmd = fullCmd.shift()
        const args = fullCmd
        if (!commands[cmd]) return
        if (commands[cmd].config.dev && !client.dev.includes(message.author.id)) {
            message.channel.send(`**${message.author} você não é desenvolvedor!!**`)
            return
        }

        if (!message.guild.me.hasPermission(commands[cmd].config.permaBot)) {
            message.channel.send(`**${message.author} eu não tenho permição para fazer isso!!**`)
            return
        }

        if (!message.member.hasPermission(commands[cmd].config.permMember) ) {
            message.channel.send(`**${message.author} tu não tens permição para fazer isso!!**`)
            return
        }

        commands[cmd].run(client, message, args)
    }
}