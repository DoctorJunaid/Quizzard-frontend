import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import '../VerifyEmail/VerifyEmail.css'; // Reusing the same styling for the card

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!token) {
            setStatus('error');
            setMessage('No reset token provided in the URL.');
            return;
        }

        if (password !== confirm) {
            setStatus('error');
            setMessage('Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            setStatus('error');
            setMessage('Password must be at least 6 characters.');
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch(`http://localhost:5000/api/auth/reset-password?token=${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage(data.message || 'Password reset successfully! You can now log in.');
            } else {
                setStatus('error');
                setMessage(data.message || 'Failed to reset password. The link may have expired.');
            }
        } catch (err) {
            setStatus('error');
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="verify-page">
            <div className="verify-card" style={{ padding: '2.5rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <img src="/landing_page-assets/trophy_compressed.png" alt="Quizard" style={{ width: 60, height: 60, objectFit: 'contain' }} />
                </div>

                <h2 className="verify-title" style={{ marginBottom: '0.5rem' }}>
                    Reset Password
                </h2>

                {status !== 'success' ? (
                    <>
                        <p className={`verify-message ${status}`} style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
                            {message || 'Enter your new password below.'}
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px' }}>New Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    style={{
                                        width: '100%', padding: '12px', background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                                        color: '#fff', fontSize: '15px', outline: 'none'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '14px', color: '#cbd5e1', marginBottom: '8px' }}>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="Repeat new password"
                                    value={confirm}
                                    onChange={e => setConfirm(e.target.value)}
                                    required
                                    style={{
                                        width: '100%', padding: '12px', background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                                        color: '#fff', fontSize: '15px', outline: 'none'
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                className="verify-home-btn"
                                disabled={status === 'loading'}
                                style={{ marginTop: '1rem', width: '100%', border: 'none', cursor: 'pointer' }}
                            >
                                {status === 'loading' ? 'Resetting...' : 'Set New Password'}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <p className="verify-message success" style={{ marginTop: '1rem' }}>{message}</p>
                        <Link to="/" className="verify-home-btn" style={{ marginTop: '1rem' }}>
                            Return to Home
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
