/*global webhookAlerts*/
/*eslint no-undef: "error"*/
const
    locales = require("../../locales/console/shardManerger.js"),
    { hookErrorAlert } = webhookAlerts.erro,
    {  } = webhookAlerts.shardManerger
    
module.exports = async (shard, _process) => {
    console.log(locales.shardSpawn(shard.id))

    _process.stderr.setEncoding("utf-8")
    _process.stderr.on("data", (log) => {
        hookErrorAlert(log, shard.id)
    })

}