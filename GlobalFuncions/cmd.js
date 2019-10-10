/*global tags, commands, aliases*/
/*eslint no-undef: "error"*/

module.exports = {
    //usado para registrar comandos ao iniciar o bot
    register: async (cmd, file, db) => {
        async function verify() {
           return await db.ref(`GlobalConfig/commands/${file.split('.')[0]}/${file.split('.')[1]}`).once("value")
                .then(async (snap) => {
                    return snap.val()
                })
                .catch(async (e) => {
                    console.log(`[${tags.ERROR}] falha ao verificar o comando ${file.split('.')[0]} na database!!`)
                    console.log(e.message)
                    return process.exit()
                })
        }

        let data = await verify()

        if ((data) == null) {
            await db.ref(`GlobalConfig/commands/${file.split('.')[0]}/${file.split('.')[1]}`)
                .set({
                    ativate: "false",
                    reason: "null"
                })
                .then(async () => {
                    console.log(`[${tags.INFO}] Comando: ${file.split('.')[1]} registrado`)
                    data = await verify()
                })
                .catch(async (e) => {
                    console.log(`[${tags.ERROR}] Comando: ${file.split('.')[1]} falhou ao registrar na firebase!!`)
                    console.log(e.message)
                    return process.exit()
                })
        }



        commands[cmd.help.name] = {
            run: cmd.run,
            help: cmd.help,
            config: cmd.config,
            type: file.split('.')[0],
            block: {
                ativate: data.ativate,
                reason: data.reason
            }
        }

        for (let i in cmd.help.aliases) {
            aliases.set(cmd.help.aliases[i], cmd.help.name)
        }

        return console.log(`[${tags.SUCCESS}] Comando: ${cmd.help.name} ativado!!`)
    },

    erro: async (client, message, command, error) => {
        message.channel.send(`${message.author} algo deu muito errado deu errado!\nDescupe pelo inconveniência!! \`${error.message}\``)

        console.log(`[${tags.ERROR}] Falha no comando ${command}!!`)
        console.log(error)
    }
}