import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './VerifyEmail.css';

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
    const [message, setMessage] = useState('');
    const hasFired = useRef(false);

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('No verification token provided in the URL.');
            return;
        }

        if (hasFired.current) return;
        hasFired.current = true;

        const verify = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/auth/verify-email?token=${token}`);
                const data = await res.json();
                if (res.ok) {
                    setStatus('success');
                    setMessage(data.message || 'Email verified successfully! You can now log in.');
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Verification failed. The link may have expired.');
                }
            } catch (err) {
                setStatus('error');
                setMessage('An error occurred during verification. Please try again later.');
            }
        };

        verify();
    }, [token]);

    return (
        <div className="verify-page">
            <div className="verify-card">
                <div className="verify-icon-wrapper">
                    {status === 'loading' && <div className="verify-spinner"></div>}
                    {status === 'success' && <img src="/landing_page-assets/trophy_compressed.png" alt="Success" className="verify-icon float-subtle" />}
                    {status === 'error' && <div className="verify-error-icon">!</div>}
                </div>

                <h2 className="verify-title">
                    {status === 'loading' && 'Verifying Email...'}
                    {status === 'success' && 'Verification Complete'}
                    {status === 'error' && 'Verification Failed'}
                </h2>

                <p className={`verify-message ${status}`}>
                    {status === 'loading'
                        ? 'Please wait while we verify your account securely.'
                        : message}
                </p>

                {status !== 'loading' && (
                    <Link to="/" className="verify-home-btn">
                        Return to Home
                    </Link>
                )}
            </div>
        </div>
    );
}
