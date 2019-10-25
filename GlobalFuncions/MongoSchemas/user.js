const { Schema, model } = require("mongoose")

const dbUser = new Schema({
    id: {
        type: String,
        required: true
    },
    status: {
        banned: {
            type: Boolean,
            required: true
        },
        reason: {
            type: String,
            required: false
        }
    }
})

model("User", dbUser)