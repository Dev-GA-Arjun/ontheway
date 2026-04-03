const promptBuilder = require('../utils/promptBuilder')
const API_KEY = process.env.API_KEY

async function story(req, res) {
    try{
        const { duration, genre } = req.body
        if(!duration || !genre){
            return res.status(400).json({
                message: "Please fill all inputs"
            })
        }
        const { systemPrompt, userPrompt } = promptBuilder(duration, genre)
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openrouter/auto",
                temperature: 0.7,
                messages: [
                    { "role": "system", "content": systemPrompt},
                    { "role": "user", "content" : userPrompt}
                ]
            })
        })
        const aiData = await response.json()
        res.status(200).json({
            success: true,
            data: aiData.choices[0].message.content
        })
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

module.exports = story