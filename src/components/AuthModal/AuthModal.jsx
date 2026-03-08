import React, { useState, useEffect, useRef } from 'react';
import './AuthModal.css';
import toast from 'react-hot-toast';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
    const [mode, setMode] = useState(initialMode);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [loading, setLoading] = useState(false);
    const googleInitialized = useRef(false);

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

    // Google Sign-In — use renderButton() with an invisible overlay technique.
    // renderButton() embeds Google's iframe which handles clicks natively inside
    // the iframe origin — so it can NEVER be popup-blocked by the browser.
    // We layer it transparently over our custom-styled visual button.
    useEffect(() => {
        if (!isOpen) return;

        const handleGoogleResponse = async (response) => {
            if (!response.credential) return;
            setLoading(true);
            const loadingToastId = toast.loading('Signing in with Google...');
            try {
                const res = await fetch(`${window.API_BASE_URL}/api/auth/google`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idToken: response.credential })
                });

                const data = await res.json();
                toast.dismiss(loadingToastId);
                if (res.ok) {
                    toast.success('Google Login successful!');
                    localStorage.setItem('user', JSON.stringify(data.user));
                    onClose();
                    window.location.reload();
                } else {
                    console.error('Google Auth Backend Error:', data);
                    toast.error(data.message || 'Google authentication failed');
                }
            } catch (err) {
                toast.dismiss(loadingToastId);
                console.error('Google Auth Error:', err);
                toast.error('Failed to connect to authentication server');
            } finally {
                setLoading(false);
            }
        };

        const renderGoogleButton = () => {
            if (!window.google) return;
            const container = document.getElementById('google-iframe-overlay');
            if (!container) return;

            // Clear any previous render
            container.innerHTML = '';

            window.google.accounts.id.initialize({
                client_id: window.GOOGLE_CLIENT_ID,
                callback: handleGoogleResponse,
                auto_select: false,
                cancel_on_tap_outside: true,
            });

            // Render the real Google button into our invisible overlay div.
            // Width must match the container so the iframe fills it entirely.
            window.google.accounts.id.renderButton(container, {
                theme: 'outline',
                size: 'large',
                width: 360,
                text: 'continue_with',
                shape: 'rectangular',
            });

            googleInitialized.current = true;
        };

        // Render immediately or wait for the GSI script to load
        if (window.google) {
            renderGoogleButton();
        } else {
            const timer = setInterval(() => {
                if (window.google) {
                    renderGoogleButton();
                    clearInterval(timer);
                }
            }, 100);
            return () => clearInterval(timer);
        }
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

                {/* Scrollable inner content */}
                <div className="auth-modal-inner">

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

                    {/* Google Sign-In — overlay technique:
                        - .auth-google-visual = our styled button (visual only, pointer-events:none)
                        - #google-iframe-overlay = real Google iframe on top (opacity ~0, intercepts clicks)
                        This prevents ANY popup blocking since Google handles clicks inside its own iframe. */}
                    <div className="google-btn-container">
                        {/* Visual layer — our 3D custom design */}
                        <div className="auth-google-visual" aria-hidden="true">
                            <svg className="auth-google-icon" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            </svg>
                            Continue with Google
                        </div>
                        {/* Real Google iframe — transparent overlay, catches the actual click */}
                        <div id="google-iframe-overlay" className="google-iframe-overlay"></div>
                    </div>


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

                </div>{/* end auth-modal-inner */}
            </div>
        </div>
    );
}
