/*global commands, aliases*/
/*eslint no-undef: "error"*/
var timeCooldown = {}
module.exports = async (client, message) => {
    if (message.author.bot) return
    if (message.channel.type !== "dm") {
        if (message.content === `<@!${client.user.id}>`) {
            if (!message.guild.me.permissionsIn(message.channel).has(2048)) return
            message.channel.send(`Olá ${message.author} eu sou o ${client.user} e o meu prefixo é \`${client.prefix}\``)
            return
        }
        if (message.content.startsWith(client.prefix)) {
            const fullCmd = message.content.replace(client.prefix, '').split(' ')
            let cmd = fullCmd.shift()
            const args = fullCmd

            if (!commands[cmd]) {
                if (!aliases.get(cmd)) return
                else cmd = aliases.get(cmd)
            }
            if (client.cooldown.has(message.author.id)) {
                message.channel.send(`${message.author}, aguarde \`${timeCooldown[message.author.id]/1000}s\` para utilizar outro comando.`)
                return
            } else {
                client.cooldown.add(message.author.id)
                timeCooldown[message.author.id] = 3000

                if (!message.guild.me.permissionsIn(message.channel).has(2048)) {
                    await message.author.send('Não tenho permição para falar no canal que executou o comando')
                        .catch(async () => {return})
                    return
                }

                if (commands[cmd].config.dev && !client.dev.includes(message.author.id)) {
                    await message.channel.send(`**${message.author} você não é desenvolvedor!!**`)
                    return
                }

                if (!message.guild.me.hasPermission(commands[cmd].config.permBot)) {
                    let missPerm = await message.guild.me.permissions.missing(commands[cmd].config.permBot).join(", ")
                    await message.channel.send(`**${message.author} eu não tenho permição de** \`${missPerm}\` **neste servidor para fazer isso!!**`)
                    return
                }

                if (!message.member.hasPermission(commands[cmd].config.permMember)) {
                    let missPerm = await message.member.permissions.missing(commands[cmd].config.permMember).join(", ")
                    await message.channel.send(`**${message.author} tu não tens permição de** \`${missPerm}\` **neste servidor para fazer isso!!**`)
                    return
                }

                if (!message.guild.me.permissionsIn(message.channel).has(commands[cmd].config.permBotChannel)) {
                    let missPerm = await message.guild.me.permissionsIn(message.channel).missing(commands[cmd].config.permBotChannel).join(", ")
                    await message.channel.send(`**${message.author} eu não tenho permição de** \`${missPerm}\` **neste canal para fazer isso!!**`)
                    return
                }

                if (!message.member.permissionsIn(message.channel).has(commands[cmd].config.permMemberChannel)) {
                    let missPerm = await message.member.permissionsIn(message.channel).missing(commands[cmd].config.permMemberChannel).join(", ")
                    await message.channel.send(`**${message.author} tu não tens permição de** \`${missPerm}\` **neste canal para fazer isso!!**`)
                    return
                }

                message.channel.startTyping(5)
                commands[cmd].run(client, message, args, cmd)

                var time = setInterval(() => {
                    timeCooldown[message.author.id] = timeCooldown[message.author.id] - 1
                    if (timeCooldown[message.author.id] <= 0) {
                        client.cooldown.delete(message.author.id)
                        clearInterval(time)
                    }
                }, 1)
            }
        }
    }
}