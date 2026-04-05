const API_URL = import.meta.env.VITE_BACKEND_URL

export async function generateStory({ duration, genre }) {
    const response = await fetch(`${API_URL}/api/v1/story`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ duration, genre })
    })
    if (!response.ok) throw new Error('Failed to generate story')
    const data = await response.json()
    console.log(data)
    return data
}