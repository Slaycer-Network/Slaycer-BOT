const fetch = require("node-fetch");
const { URLSearchParams } = require("url");
// eslint-disable-next-line no-useless-escape
const validate = new RegExp(/(?:https?:\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm);

module.exports = {
    isLink: async (text) => {
        if (validate.test(text)) {
            return text
        } else {
            return "ytsearch:"+text
        }
    },

    search: async (client ,search) => {
        const node = client.lavalink.nodes.first()

        const params = new URLSearchParams()
        params.append("identifier", search)

        return fetch(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, { headers: { Authorization: node.password } })
            .then(res => res.json())
            .catch(err => {
                console.error(err)
                return null
            });
    },
    loadType: async (type) => {
        switch (type) {
            case "TRACK_LOADED":
                return 1
            case "PLAYLIST_LOADED":
                return 2
            case "SEARCH_RESULT":
                return 3
            case "NO_MATCHES":
                return 4
            default:
                return 5
        }
    },
    typeResolve: async (type, message, loadType) => {
        let typeResolve = await loadType(type)
        if (typeResolve === 4 || typeResolve === 5) {
            if (typeResolve === 4){
                message.reply("parece que não econtrei nada correponde ao dados enviados!")
                return 0
            }else {
                message.reply("parece que os dados recebidos não são validos!")
                return 0
            } 
        } else return 1
    }
}