const
    clc = require("cli-color"),
    { aviso, error, info, sucesso } = require("./tags.js").event,
    { tagGenretor } = require("./tags.js").shard

const 
    yellow = clc.yellowBright,
    red = clc.redBright

let tagShard = tagGenretor("SM")

module.exports = {
    noTokenDC: `${tagShard}${error} Parece que o ${yellow("Token do Discord")} não foi encontrado!!\n`+
               `${tagShard}${info} Por favor verifique o arquivo ${yellow("tokens.js")} na pasta ${yellow("configs")}`,
    invalTokenDC: `${tagShard}${error} Parece que o ${yellow("Token do Discord")} está ${red("invalido")} ou levou ${red("Rate Limit")}!!\n`+
                  `${tagShard}${info} Por favor verifique se o seu ${yellow("Token do Discord")} é valido ou se tem alguma restrição!!`,
    shardSpawn(shardID) {return `${tagShard}${info} Iniciando a Shard ${shardID}...`},
    
}