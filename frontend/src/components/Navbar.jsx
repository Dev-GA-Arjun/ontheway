import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation()

    return (
        <nav className="navbar">
            <span className="navbar-brand">OnTheWay</span>
            <div className="navbar-links">
                <Link
                    to="/"
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                    Generate
                </Link>
                <Link
                    to="/library"
                    className={`nav-link ${location.pathname === '/library' ? 'active' : ''}`}
                >
                    My Library
                </Link>
            </div>
        </nav>
    )
}