import React, { useState, useEffect } from 'react';
import './AuthModal.css';
import toast from 'react-hot-toast';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
    const [mode, setMode] = useState(initialMode);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [loading, setLoading] = useState(false);

    // Sync initial mode when triggered from different buttons
    useEffect(() => {
        setMode(initialMode);
        setForm({ name: '', email: '', password: '', confirm: '' });
    }, [initialMode, isOpen]);

    // Close on backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    // Close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        if (isOpen) window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    // Google Sign-In Initialization
    useEffect(() => {
        if (!isOpen) return;

        const handleGoogleResponse = async (response) => {
            setLoading(true);
            try {
                const res = await fetch(`${window.API_BASE_URL}/api/auth/google`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idToken: response.credential })
                });

                const data = await res.json();
                if (res.ok) {
                    toast.success('Google Login successful!');
                    localStorage.setItem('user', JSON.stringify(data.user));
                    onClose();
                    window.location.reload();
                } else {
                    toast.error(data.message || 'Google authentication failed');
                }
            } catch (err) {
                console.error('Google Auth Error:', err);
                toast.error('Failed to connect to authentication server');
            } finally {
                setLoading(false);
            }
        };

        const initGoogle = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                    callback: handleGoogleResponse,
                });
                window.google.accounts.id.renderButton(
                    document.getElementById('google-login-btn'),
                    { theme: 'outline', size: 'large', width: '340px' }
                );
            }
        };

        // Retry if script isn't loaded yet
        const timer = setInterval(() => {
            if (window.google) {
                initGoogle();
                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mode === 'signup' && form.password !== form.confirm) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const endpoint = mode === 'signup' ? '/api/auth/register' : '/api/auth/login';
            const payload = mode === 'signup'
                ? { name: form.name, email: form.email, password: form.password }
                : { email: form.email, password: form.password };

            const res = await fetch(`${window.API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // needed for cookies
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                // For login vs login unverified
                if (mode === 'login' && res.status === 401 && data.message.includes('verify')) {
                    toast.error('Please check your email to verify your account.');
                } else {
                    toast.error(data.message || 'Authentication failed');
                }
                return;
            }

            if (mode === 'signup') {
                toast.success('Registration successful! Check your email.');
                setForm({ name: '', email: '', password: '', confirm: '' });
                setMode('login');
            } else {
                toast.success('Login successful!');
                localStorage.setItem('user', JSON.stringify(data.user));
                onClose();
                window.location.reload();
            }

        } catch (err) {
            console.error('Auth Error:', err);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-backdrop" onClick={handleBackdropClick}>
            <div className="auth-modal">

                {/* Close Button */}
                <button className="auth-close" onClick={onClose} aria-label="Close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Logo */}
                <div className="auth-logo">
                    <img src="/landing_page-assets/trophy_compressed.png" alt="Quizard" />
                    <span>Quizard</span>
                </div>

                {/* Title */}
                <h2 className="auth-title">
                    {mode === 'login' ? 'Welcome back!' : 'Create your account'}
                </h2>
                <p className="auth-subtitle">
                    {mode === 'login'
                        ? 'Sign in to continue your quiz journey.'
                        : 'Join thousands of quiz enthusiasts today.'}
                </p>

                {/* Tab Toggle */}
                <div className="auth-tabs">
                    <button className={`auth-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>Log In</button>
                    <button className={`auth-tab ${mode === 'signup' ? 'active' : ''}`} onClick={() => setMode('signup')}>Sign Up</button>
                </div>

                {/* Google Login */}
                <div id="google-login-btn" className="auth-google-wrapper"></div>

                {/* Divider */}
                <div className="auth-divider">
                    <span>or</span>
                </div>

                {/* Form */}
                <form className="auth-form" onSubmit={handleSubmit}>
                    {mode === 'signup' && (
                        <div className="auth-field">
                            <label>Full Name</label>
                            <div className="auth-input-wrap">
                                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                />
                            </div>
                        </div>
                    )}

                    <div className="auth-field">
                        <label>Email Address</label>
                        <div className="auth-input-wrap">
                            <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label>Password</label>
                        <div className="auth-input-wrap">
                            <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter password"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                            />
                            <button type="button" className="auth-eye" onClick={() => setShowPassword(v => !v)}>
                                {showPassword
                                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                }
                            </button>
                        </div>
                    </div>

                    {mode === 'signup' && (
                        <div className="auth-field">
                            <label>Confirm Password</label>
                            <div className="auth-input-wrap">
                                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    name="confirm"
                                    placeholder="Repeat password"
                                    value={form.confirm}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                />
                                <button type="button" className="auth-eye" onClick={() => setShowConfirm(v => !v)}>
                                    {showConfirm
                                        ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                        : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    }
                                </button>
                            </div>
                        </div>
                    )}

                    {mode === 'login' && (
                        <div className="auth-forgot">
                            <a href="#">Forgot password?</a>
                        </div>
                    )}

                    <button type="submit" className="auth-submit" disabled={loading}>
                        {loading
                            ? 'Please wait...'
                            : (mode === 'login' ? 'Log In' : 'Create Account')}
                    </button>
                </form>

                {/* Footer Switch */}
                <p className="auth-switch">
                    {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                    <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
                        {mode === 'login' ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </div>
        </div>
    );
}
