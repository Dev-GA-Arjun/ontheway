import { useState } from 'react'

export default function StoryForm({ onSubmit, loading }) {
    const [duration, setDuration] = useState(10)
    const [genre, setGenre] = useState('thriller')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ duration, genre })
    }

    return (
        <div>
            <h1>OnTheWay</h1>
            <p>A story sized for your commute.</p>
            <form onSubmit={handleSubmit}>
                <select value={duration} onChange={e => setDuration(Number(e.target.value))}>
                    <option value={5}>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={20}>20 minutes</option>
                    <option value={25}>25 minutes</option>
                </select>
                <select value={genre} onChange={e => setGenre(e.target.value)}>
                    <option value="thriller">Thriller</option>
                    <option value="mystery">Mystery</option>
                    <option value="folklore">Folklore</option>
                    <option value="sci-fi">Sci-Fi</option>
                    <option value="romance">Romance</option>
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Story'}
                </button>
            </form>
        </div>
    )
}