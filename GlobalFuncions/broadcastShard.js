module.exports = {
    guildSize: async (shard) => {
        try {
            const result = await shard.fetchClientValues("guilds.size")
            return await result.reduce(async (accumulator, currentValue) => accumulator + currentValue)
        } catch (error) {
            console.log("Falha ao processar o numero de guilds!")
            console.log(error)
            return "N/A"
        }
    }
}