import { useState } from 'react'
import StoryForm from '../components/StoryForm'
import StoryDisplay from '../components/StoryDisplay'
import LoadingState from '../components/LoadingState'
import { generateStory, saveStory } from '../services/api'

export default function GeneratePage() {
    const [story, setStory] = useState(null)
    const [genre, setGenre] = useState('')
    const [duration, setDuration] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async ({ duration, genre }) => {
        setLoading(true)
        setError(null)
        setGenre(genre)
        setDuration(duration)
        try {
            const data = await generateStory({ duration, genre })
            setStory(data.data)
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => setStory(null)

    const handleSave = async ({ title, genre, duration, content }) => {
        await saveStory({ title, genre, duration, content })
    }

    if (loading) return <LoadingState />
    if (story) return (
        <StoryDisplay
            story={story}
            genre={genre}
            duration={duration}
            onReset={handleReset}
            onSave={handleSave}
        />
    )

    return (
        <>
            {error && <p className="error">{error}</p>}
            <StoryForm onSubmit={handleSubmit} loading={loading} />
        </>
    )
}