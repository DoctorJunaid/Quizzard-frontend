import React from 'react';
import './CTA.css';

export default function CTA() {
    return (
        <section className="cta-section">
            {/* Purple glow wave behind text — matches reference */}
            <div className="cta-glow-wave" aria-hidden="true" />

            <div className="container cta-inner">
                <h2 className="cta-heading">Ready to Start Playing?</h2>
                <p className="cta-sub">Join now and test your knowledge!</p>
                <div className="cta-buttons">
                    <button className="cta-btn-primary">Sign Up Now</button>
                    <button className="cta-btn-ghost">Log In</button>
                </div>
            </div>
        </section>
    );
}
