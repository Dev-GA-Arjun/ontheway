import { useState, useEffect } from 'react'
import StoryCard from './StoryCard'
import { getSavedStories, updateStory, deleteStory } from '../services/api'

export default function Library() {
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadStories = async () => {
        try {
            const data = await getSavedStories()
            setStories(data)
        } catch (err) {
            setError('Failed to load library.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { loadStories() }, [])

    const handleDelete = async (id) => {
        await deleteStory(id)
        setStories(prev => prev.filter(s => s._id !== id))
    }

    const handleRename = async (id, title) => {
        await updateStory(id, title)
        setStories(prev => prev.map(s => s._id === id ? { ...s, title } : s))
    }

    if (loading) return <p className="loading">Loading your library...</p>
    if (error) return <p className="error">{error}</p>
    if (stories.length === 0) return <p className="empty">No saved stories yet. Generate one and save it!</p>

    return (
        <div className="library">
            <h2>My Library</h2>
            <div className="card-grid">
                {stories.map(story => (
                    <StoryCard
                        key={story._id}
                        story={story}
                        onDelete={handleDelete}
                        onRename={handleRename}
                    />
                ))}
            </div>
        </div>
    )
}