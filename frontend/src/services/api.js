const API_URL = import.meta.env.VITE_BACKEND_URL

export async function generateStory({ duration, genre }) {
    const response = await fetch(`${API_URL}/api/v1/story`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ duration, genre })
    })
    if (!response.ok) throw new Error('Failed to generate story')
    return response.json()
}

export async function saveStory({ title, genre, duration, content }) {
    const response = await fetch(`${API_URL}/api/v1/story/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre, duration, content })
    })
    if (!response.ok) throw new Error('Failed to save story')
    return response.json()
}

export async function getSavedStories() {
    const response = await fetch(`${API_URL}/api/v1/story/saved`)
    if (!response.ok) throw new Error('Failed to fetch stories')
    return response.json()
}

export async function updateStory(id, title) {
    const response = await fetch(`${API_URL}/api/v1/story/saved/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    })
    if (!response.ok) throw new Error('Failed to update story')
    return response.json()
}

export async function deleteStory(id) {
    const response = await fetch(`${API_URL}/api/v1/story/saved/${id}`, {
        method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete story')
    return response.json()
}