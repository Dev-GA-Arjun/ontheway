const promptBuilder = require('../utils/promptBuilder')
const API_KEY = process.env.API_KEY
const Story = require('../models/Story.model')

async function story(req, res) {
    try {
        const { duration, genre } = req.body
        if (!duration || !genre) {
            return res.status(400).json({ message: "Please fill all inputs" })
        }
        const { systemPrompt, userPrompt } = promptBuilder(duration, genre)
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                temperature: 0.7,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ]
            })
        })
        const aiData = await response.json()
        res.status(200).json({
            success: true,
            data: aiData.choices[0].message.content
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function savedStories(req, res) {
    try {
        const stories = await Story.find().sort({ createdAt: -1 })
        res.status(200).json(stories)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function saveStory(req, res) {
    try {
        const { title, genre, duration, content } = req.body
        if (!genre || !duration || !content) {
            return res.status(400).json({ error: "Missing required fields" })
        }
        const newStory = await Story.create({
            title: title || "Untitled",
            genre,
            duration,
            content
        })
        res.status(201).json(newStory)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function updateStory(req, res) {
    try {
        const id = req.params.id
        const { title } = req.body
        if (!title) {
            return res.status(400).json({ error: "Title is required" })
        }
        const updatedStory = await Story.findByIdAndUpdate(
            id,
            { title },
            { new: true, runValidators: true }
        )
        if (!updatedStory) {
            return res.status(404).json({ error: "Story not found" })
        }
        res.status(200).json({
            success: true,
            data: updatedStory
        })
    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({ error: "Invalid ID" })
        }
        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message })
        }
        res.status(500).json({ error: "Internal server error" })
    }
}

async function deleteStory(req, res) {
    try {
        const id = req.params.id
        const deleted = await Story.findByIdAndDelete(id)
        if (!deleted) {
            return res.status(404).json({ error: "Story not found" })
        }
        res.status(200).json({
            success: true,
            message: "Story deleted successfully"
        })
    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({ error: "Invalid ID" })
        }
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { story, saveStory, savedStories, updateStory, deleteStory }