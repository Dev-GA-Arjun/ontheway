// models/Story.model.js
const mongoose = require('mongoose')

const storySchema = mongoose.Schema({
    title: {
        type: String,
        default: "Untitled"
    },
    genre: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Story", storySchema)