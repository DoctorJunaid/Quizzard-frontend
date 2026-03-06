import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import AuthModal from '../AuthModal/AuthModal';

export default function Navbar() {
    const location = useLocation();
    const [authOpen, setAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [menuOpen, setMenuOpen] = useState(false);

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
                        <button className="nav-cta-ghost" onClick={() => openAuth('login')}>Log In</button>
                        <button className="nav-cta" onClick={() => openAuth('signup')}>Sign Up</button>
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
                            <button className="nav-cta-ghost" onClick={() => openAuth('login')}>Log In</button>
                            <button className="nav-cta" onClick={() => openAuth('signup')}>Sign Up</button>
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
