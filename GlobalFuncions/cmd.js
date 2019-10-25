/*global commands, aliases*/
/*eslint no-undef: "error"*/

module.exports = {
    register: async (cmd, file, db) => {
        async function verify() {
            try {
                return await db.findOne({name: file.split('.')[1]})
            } catch (error) {
                console.log("WIP")
                console.log(error)
                return process.exit()
            }
        }

        let data = await verify()

        if (!data) {
            try {
                await db.create({
                    name: file.split('.')[1],
                    category: file.split('.')[0],
                    status: {
                        ativate: true,
                    }
                })
                console.log("WIP")
                data = await verify()
            } catch (error) {
                console.log("WIP")
                console.log(error)
                return process.exit()
            }
        }

        commands[cmd.help.name] = {
            run: cmd.run,
            help: cmd.help,
            config: cmd.config,
            type: file.split('.')[0],
            block: {
                ativate: data.status.ativate,
                reason: data.status.reason
            }
        }

        for (let i in cmd.help.aliases) {
            aliases.set(cmd.help.aliases[i], cmd.help.name)
        }

        return console.log(`WIP`)
    },

    erro: async (client, message, command, error) => {
        message.channel.send(`${message.author} algo deu muito errado deu errado!\nDescupe pelo inconveniência!! \`${error.message}\``)
        console.log(`WIP`)
        console.log(error)
    }
}