const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT

app.use(express.json()) // Midlleware

const storyRouter = require('./routes/story.routes')

app.get("/health", (req,res) => {
    res.status(200).json({
        status: "ok"
    })
})
app.use('/api/v1/story',storyRouter)

app.listen(PORT, () => {
    console.log("Server Running Successfully on http://localhost:3000")
})