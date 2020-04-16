// cores para o terminal
const clc = require("cli-color")
const red = clc.redBright
const yellow = clc.yellowBright
const green = clc.greenBright
const blue = clc.blueBright
const cyan = clc.cyanBright
//----------------

function tagGenretor(typeShard) {
    if (typeShard === "SM") return cyan("[ShardingManager]")
    else if (isNaN(typeShard)) return cyan(`[Shard-${typeShard+1}]`)
}

module.exports = {
    event:{
        error: red("[ERRO]"),
        aviso: yellow("[AVISO]"),
        sucesso: green("[SUCESSO]"),
        info: blue("[INFO]")
    },
    shard: {
        tagGenretor
    }
}