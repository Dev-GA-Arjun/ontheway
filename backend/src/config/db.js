// config/db.js
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("Database connected successfully")
    } catch (err) {
        console.error("Database connection failed:", err.message)
        process.exit(1)
    }
}

module.exports = connectDB