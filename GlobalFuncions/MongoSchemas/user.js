const { Schema } = require("mongoose")

const dbUser = new Schema({
    id: String,
    status: {
        banned: Boolean,
        reason: String
    }
})

module.exports = dbUser