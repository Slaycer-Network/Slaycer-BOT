/*global commands, aliases, clcError*/
/*eslint no-undef: "error"*/

const { database, cmd } = require("./Mconsole.js")
const mCmd = cmd

module.exports = {
    register: async (cmd, file, db, shardID) => {
        async function verify() {
            try {
                return await db.findOne({name: file.split('.')[1]})
            } catch (error) {
                console.log(await database("findError", shardID))
                console.log(await clcError(error))
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
                console.log(await mCmd("registred", shardID, file.split('.')[1]))
                data = await verify()
            } catch (error) {
                console.log(await database("createError", shardID))
                console.log(await clcError(error))
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

        return console.log(await mCmd("loadSuccess", shardID, cmd.help.name))
    },

    erro: async (client, message, command, error) => {
        let shardID = (client.shard.ids[0] + 1)
        message.channel.send(`${message.author} algo deu muito errado deu errado!\nDescupe pelo inconveniência!! \`${error.message}\``)
        console.log(await mCmd("execError", shardID, command))
        console.log(await clcError(error))
    }
}