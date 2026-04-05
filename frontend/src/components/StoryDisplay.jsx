export default function StoryDisplay({ story, onReset }) {
    return (
        <div>
            <p className="story-meta">Your story</p>
            <div className="story-body">
                {story.split('\n').filter(Boolean).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            <button onClick={onReset}>Generate Another</button>
        </div>
    )
}