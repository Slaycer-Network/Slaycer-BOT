const fetch = require("node-fetch");
const { URLSearchParams } = require("url");

module.exports = {
    search: async (client, search) => {
        const node = client.player.nodes.first()

        const params = new URLSearchParams()
        params.append("identifier", search)

        return fetch(`http://${node.host}:${node.port}/loadtracks?${params.toString()}`, { headers: { Authorization: node.password } })
        .then(res => res.json())
        .then(data => data.tracks)
        .catch(err => {
            console.error(err);
            return null;
        });
    }
}