const { Schema } = require("mongoose")

const dbCmd = new Schema({
    name: String,
    type: String,
    status: {
        ativate: Boolean,
        reason: String
    }
})

module.exports = dbCmd