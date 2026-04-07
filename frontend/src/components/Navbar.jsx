import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const { pathname } = useLocation()

    return (
        <nav className="navbar">
            <span className="nav-brand">OnTheWay</span>
            <div className="nav-links">
                <Link
                    to="/"
                    className={`nav-link ${pathname === '/' ? 'active' : ''}`}
                >
                    Generate
                </Link>
                <Link
                    to="/library"
                    className={`nav-link ${pathname === '/library' ? 'active' : ''}`}
                >
                    My Library
                </Link>
            </div>
        </nav>
    )
}