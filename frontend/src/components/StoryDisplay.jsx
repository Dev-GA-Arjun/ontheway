import { useState } from 'react'

export default function StoryDisplay({ story, genre, duration, onReset, onSave }) {
    const [saved, setSaved] = useState(false)
    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        setSaving(true)
        try {
            await onSave({ title: 'Untitled', genre, duration, content: story })
            setSaved(true)
        } catch (err) {
            console.error(err)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div>
            <div className="story-meta">
                {genre} · {duration} min read
            </div>
            <div className="story-body">
                {story.split('\n').filter(Boolean).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            <div className="story-actions">
                <button onClick={onReset}>Generate Another</button>
                <button onClick={handleSave} disabled={saved || saving}>
                    {saved ? 'Saved to Library!' : saving ? 'Saving...' : 'Save Story'}
                </button>
            </div>
        </div>
    )
}