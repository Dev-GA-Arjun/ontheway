const express = require('express')
const router = express.Router()

const story = require('../controllers/story.controllers')

router.post('/', story)

module.exports = router