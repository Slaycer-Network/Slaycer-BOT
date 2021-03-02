/*global webhookAlerts*/
/*eslint no-undef: "error"*/
    
module.exports = async (shard, _process) => {
    console.log(locales.shardSpawn(shard.id))

    _process.stderr.setEncoding("utf-8")
    _process.stderr.on("data", (log) => {
        
    })

}