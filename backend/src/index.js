const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const storyRouter = require('./routes/story.routes')

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
})

app.use('/api/v1/story', storyRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})