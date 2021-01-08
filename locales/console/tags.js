// cores para o terminal
const clc = require("cli-color")
const red = clc.redBright
const yellow = clc.yellowBright
const green = clc.greenBright
const blue = clc.blueBright
const cyan = clc.cyanBright
//----------------

function tagGenretor(typeShard) {
    let type
    switch (typeShard) {
        case "SM":
            type = cyan("[ShardingManager]")
            break;
        case "Web":
            type = cyan("[Webhook]")
            break;
        default:
            type = cyan(`[Shard-${typeShard+1}]`)
            break;
    }
    return type
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