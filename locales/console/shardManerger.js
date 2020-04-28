const clc = require("cli-color")
const { aviso, error, info, sucesso } = require("./tags.js").event
const { tagGenretor } = require("./tags.js").shard

const yellow = clc.yellowBright
const red = clc.redBright

let tagShard = tagGenretor("SM")

module.exports = {
    noTokenDC: `${tagShard}${error} Parece que o ${yellow("Token do Discord")} não foi encontrado!!\n`+
               `${tagShard}${info} Por favor verifique o arquivo ${yellow("tokens.js")} na pasta ${yellow("configs")}`,
    invalTokenDC:`${tagShard}${error} Parece que o ${yellow("Token do Discord")} está ${red("invalido")} ou levou ${red("Rate Limit")}!!\n`+
                 `${tagShard}${info} Por favor verifique se o seu ${yellow("Token do Discord")} é valido ou se tem alguma restrição!!`
    
}