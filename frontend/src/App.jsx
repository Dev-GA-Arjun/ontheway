import { useState } from 'react'
import StoryForm from './components/StoryForm'
import LoadingState from './components/LoadingState'
import StoryDisplay from './components/StoryDisplay'
import { generateStory } from './services/api'

export default function App() {
    const [story, setStory] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async ({ duration, genre }) => {
        setLoading(true)
        setError(null)
        try {
            const data = await generateStory({ duration, genre })
            setStory(data.data)
        } catch (err) {
            setError(`Something went wrong. Please try again. ${err}`)
        } finally {
            setLoading(false)
        }
    }

    const handleReset = () => setStory(null)

    if (loading) return <LoadingState />
    if (story) return <StoryDisplay story={story} onReset={handleReset} />

    return (
        <>
            {error && <p className="error">{error}</p>}
            <StoryForm onSubmit={handleSubmit} loading={loading} />
        </>
    )
}