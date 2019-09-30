/*global CMDs*/
/*eslint no-undef: "error"*/
const axios = require('axios')
const radios = require("../data/radio.json")

module.exports = {
    help: {
        name: "radio",
        description: "Latencia de respostas do bot!!"
    },

    config: {
        private: false,
        dev: false,
        permBot: 0,
        permMember: 0
    },

    // eslint-disable-next-line no-unused-vars
    run: async (client, message, args) => {
        try {
            if (!radios[args[0]]) {
                return
            }

            const API = await axios.get(radios[args[0]].api)

            console.log(API.data.split("£").slice(1,5))

        } catch (error) {
            CMDs.erro(client, message, this.help.name, error)
        } finally {
            message.channel.stopTyping(true)
        }
    }
}