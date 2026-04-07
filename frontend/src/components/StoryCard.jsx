import { useState } from 'react'

export default function StoryCard({ story, onDelete, onRename }) {
    const [expanded, setExpanded] = useState(false)
    const [renaming, setRenaming] = useState(false)
    const [newTitle, setNewTitle] = useState(story.title)
    const [loading, setLoading] = useState(false)

    const handleRename = async () => {
        setLoading(true)
        try {
            await onRename(story._id, newTitle)
            setRenaming(false)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        await onDelete(story._id)
    }

    return (
        <div className="story-card">
            <div className="card-header">
                {renaming ? (
                    <div className="rename-row">
                        <input
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                            className="rename-input"
                        />
                        <button onClick={handleRename} disabled={loading}>
                            {loading ? '...' : 'Save'}
                        </button>
                        <button onClick={() => setRenaming(false)}>Cancel</button>
                    </div>
                ) : (
                    <h3 className="card-title">{story.title}</h3>
                )}
                <div className="card-badges">
                    <span className="badge">{story.genre}</span>
                    <span className="badge">{story.duration} min</span>
                </div>
            </div>

            <p className="card-preview" onClick={() => setExpanded(!expanded)}>
                {expanded
                    ? story.content
                    : story.content.slice(0, 120) + '...'}
            </p>

            <div className="card-actions">
                <button onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Collapse' : 'Read Full'}
                </button>
                <button onClick={() => setRenaming(true)}>Rename</button>
                <button onClick={handleDelete} className="delete-btn">Delete</button>
            </div>
        </div>
    )
}