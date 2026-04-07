import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import GeneratePage from './components/GeneratePage'
import Library from './components/Library'

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<GeneratePage />} />
                    <Route path="/library" element={<Library />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}