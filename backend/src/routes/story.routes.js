// story.routes.js
const express = require('express')
const router = express.Router()
const { story, saveStory, savedStories, updateStory, deleteStory } = require('../controllers/story.controllers')

router.post('/', story)
router.post('/save', saveStory)
router.get('/saved', savedStories)
router.put('/saved/:id', updateStory)
router.delete('/saved/:id', deleteStory)

module.exports = router