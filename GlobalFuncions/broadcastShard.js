module.exports = {
    guildSize: async (shard) => {
        try {
            const result = await shard.fetchClientValues("guilds.size")
            return await result.reduce(async (accumulator, currentValue) => accumulator + currentValue)
        } catch (error) {
            if(error.name === "Error [SHARDING_IN_PROCESS]") return
            console.log("Falha ao processar o numero de guilds!")
            console.log(error)
            return "N/A"
        }
    }
}