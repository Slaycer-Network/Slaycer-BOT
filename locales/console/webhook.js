const
    clc = require("cli-color"),
    { aviso, error, info, sucesso } = require("./tags.js").event,
    { tagGenretor } = require("./tags.js").shard

const web = tagGenretor("Web")

module.exports = {
    success: `${web}${aviso}${sucesso} O erro fui com Sucesso!!`,
}

