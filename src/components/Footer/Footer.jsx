import React from 'react';
import './Footer.css';

/* Social icon SVGs */
function IconTwitter() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-3.594-1.555c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.64 3.162a4.92 4.92 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 4.557z" />
        </svg>
    );
}

function IconFacebook() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
        </svg>
    );
}

function IconGithub() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-inner">
                <nav className="footer-links" aria-label="Footer navigation">
                    <a href="#">About</a>
                    <a href="#">Categories</a>
                    <a href="#">Help Center</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </nav>

                <div className="footer-socials">
                    <a href="#" className="social-icon" aria-label="Twitter"><IconTwitter /></a>
                    <a href="#" className="social-icon" aria-label="Facebook"><IconFacebook /></a>
                    <a href="#" className="social-icon" aria-label="GitHub"><IconGithub /></a>
                </div>

                <p className="footer-copy">© 2026 Quizard. All rights reserved.</p>
            </div>
        </footer>
    );
}
