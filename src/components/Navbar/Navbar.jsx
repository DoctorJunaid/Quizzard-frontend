import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Navbar.css';
import AuthModal from '../AuthModal/AuthModal';

export default function Navbar() {
    const location = useLocation();
    const [authOpen, setAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Check for user in local storage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [authOpen]); // Re-check when modal closes (potentially after login)

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:5000/api/auth/logout', { method: 'POST' });
            localStorage.removeItem('user');
            setUser(null);
            toast.success('Logged out successfully');
            navigate('/');
        } catch (err) {
            toast.error('Logout failed');
        }
    };

    const openAuth = (mode) => {
        setAuthMode(mode);
        setAuthOpen(true);
        setMenuOpen(false);
    };

    // Close mobile menu on route change
    useEffect(() => { setMenuOpen(false); }, [location.pathname]);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const links = [
        { to: '/', label: 'Home' },
        { to: '/categories', label: 'Categories' },
        { to: '/leaderboard', label: 'Leaderboard' },
        { to: '/about', label: 'About' },
    ];

    return (
        <>
            <nav className="navbar">
                <div className="navbar-inner container">

                    {/* Logo */}
                    <Link to="/" className="nav-logo">
                        <div className="nav-logo-icon">
                            <img src="/landing_page-assets/trophy_compressed.png" alt="Quizard" className="nav-logo-img" />
                        </div>
                        <span className="nav-logo-text">Quizard</span>
                    </Link>

                    {/* Desktop Links */}
                    <ul className="nav-links">
                        {links.map(({ to, label }) => (
                            <li key={to}>
                                <Link to={to} className={`nav-link ${location.pathname === to ? 'nav-link--active' : ''}`}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop CTA */}
                    <div className="nav-cta-group">
                        {user ? (
                            <div className="nav-user-profile">
                                <div className="nav-user-info">
                                    <img src={user.avatar || "/landing_page-assets/trophy_compressed.png"} alt={user.name} className="nav-user-avatar" />
                                    <span className="nav-user-name">{user.name.split(' ')[0]}</span>
                                </div>
                                <button className="nav-cta-ghost" onClick={handleLogout}>Log Out</button>
                            </div>
                        ) : (
                            <>
                                <button className="nav-cta-ghost" onClick={() => openAuth('login')}>Log In</button>
                                <button className="nav-cta" onClick={() => openAuth('signup')}>Sign Up</button>
                            </>
                        )}
                    </div>

                    {/* Hamburger */}
                    <button
                        className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(v => !v)}
                        aria-label="Toggle menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="nav-mobile-menu">
                        <ul className="nav-mobile-links">
                            {links.map(({ to, label }) => (
                                <li key={to}>
                                    <Link
                                        to={to}
                                        className={`nav-mobile-link ${location.pathname === to ? 'active' : ''}`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="nav-mobile-cta">
                            {user ? (
                                <div className="nav-mobile-user">
                                    <div className="nav-user-info">
                                        <img src={user.avatar || "/landing_page-assets/trophy_compressed.png"} alt={user.name} className="nav-user-avatar" />
                                        <span className="nav-user-name">{user.name}</span>
                                    </div>
                                    <button className="nav-cta-ghost" onClick={handleLogout} style={{ width: '100%', marginTop: '1rem' }}>Log Out</button>
                                </div>
                            ) : (
                                <>
                                    <button className="nav-cta-ghost" onClick={() => openAuth('login')}>Log In</button>
                                    <button className="nav-cta" onClick={() => openAuth('signup')}>Sign Up</button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Auth Modal */}
            <AuthModal
                isOpen={authOpen}
                onClose={() => setAuthOpen(false)}
                initialMode={authMode}
            />
        </>
    );
}
