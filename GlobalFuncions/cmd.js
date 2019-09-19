/*global tags, commands*/
/*eslint no-undef: "error"*/

module.exports = {
    //usado para registrar comandos ao iniciar o bot
    register: async (cmd, file, db) => {
        async function verify() {
           return await db.ref(`GlobalConfig/commands/${file.split('.')[0]}`).once("value")
                .then(async (snap) => {
                    return snap.val()
                })
                .catch(async (e) => {
                    console.log(`[${tags.ERROR}] `)
                    console.log(e)
                    return process.exit()
                })
        }

        let data = await verify()

        if ((data) == null) {
            await db.ref(`GlobalConfig/commands/${file.split('.')[0]}`)
                .set({
                    ativate: "false",
                    reason: "null"
                })
                .then(async () => data = await verify())
                .catch(async (e) => {
                    console.log(`Comando: ${file} falhou ao registrar na firebase!!`)
                    console.log(e.message)
                    return process.exit()
                })
        }



        commands[cmd.help.name] = {
            run: cmd.run,
            help: cmd.help,
            config: cmd.config,
            block: {
                ativate: data.ativate,
                reason: data.reason
            }
        }

        return console.log(`[${tags.SUCCESS}]Comando: ${file} ativado!!`)
    }
}