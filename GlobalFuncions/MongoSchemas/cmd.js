const { Schema, model } = require("mongoose")

const dbCmd = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        ativate: {
            type: Boolean,
            require: true
        },
        reason: {
            type: String,
            require: false
        }
    }
})

model("Commands", dbCmd)