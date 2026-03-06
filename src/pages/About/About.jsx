import React from 'react';
import './About.css';

export default function About() {
    return (
        <div className="about-page container">

            {/* ── HERO SECTION ── */}
            <section className="about-hero">
                <div className="ab-hero-left">
                    <h1 className="ab-heading">About Quizard</h1>
                    <p className="ab-sub">The Ultimate Destination for Fun and Learning!</p>
                    <p className="ab-text">
                        <strong>Quizard</strong> is your go-to platform for exciting online quizzes!
                        Our mission is to make learning fun, engaging, and accessible for everyone,
                        whether you're a trivia enthusiast, a student, or just looking to challenge your mind.
                    </p>
                </div>
                <div className="ab-hero-right">
                    <div className="ab-glow" />
                    <img
                        src="/landing_page-assets/aboutHero.png"
                        alt="Rocket launching from books"
                        className="ab-hero-img float-slow"
                    />
                </div>
            </section>

            <hr className="ab-divider" />

            {/* ── FEATURES SECTION ── */}
            <section className="ab-features">
                <div className="ab-feature-card">
                    <div className="ab-f-icon-wrapper">
                        <img src="/landing_page-assets/target.png" alt="Mission" className="ab-f-img float-fast" />
                    </div>
                    <div className="ab-f-content">
                        <h3>Our Mission</h3>
                        <p>To inspire learning through fun and interactive quizzes.</p>
                    </div>
                </div>
                <div className="ab-feature-card">
                    <div className="ab-f-icon-wrapper">
                        <img src="/landing_page-assets/star.png" alt="Why Choose Us" className="ab-f-img float-medium" />
                    </div>
                    <div className="ab-f-content">
                        <h3>Why Choose Us?</h3>
                        <p>Thousands of quizzes in various categories, rewarding challenges, and a vibrant community.</p>
                    </div>
                </div>
                <div className="ab-feature-card">
                    <div className="ab-f-icon-wrapper">
                        <img src="/landing_page-assets/bulb.png" alt="Our Story" className="ab-f-img float-slow" />
                    </div>
                    <div className="ab-f-content">
                        <h3>Our Story</h3>
                        <p>Founded by a team of passionate quiz lovers dedicated to making knowledge accessible to all.</p>
                    </div>
                </div>
            </section>

            <hr className="ab-divider" />

            {/* ── TEAM SECTION ── */}
            <section className="ab-team-section">
                <h2 className="ab-section-title">Meet the Team</h2>
                <div className="ab-team-grid">
                    <div className="ab-team-member">
                        <div className="ab-tm-avatar-box">
                            <img src="/landing_page-assets/avatar1.png" alt="Sarah" className="ab-tm-avatar float-medium" />
                        </div>
                        <h4>Sarah</h4>
                        <p>Founder & CEO</p>
                    </div>
                    <div className="ab-team-member">
                        <div className="ab-tm-avatar-box">
                            <img src="/landing_page-assets/avatar2.png" alt="Mike" className="ab-tm-avatar float-slow" />
                        </div>
                        <h4>Mike</h4>
                        <p>Quiz Master</p>
                    </div>
                    <div className="ab-team-member">
                        <div className="ab-tm-avatar-box">
                            <img src="/landing_page-assets/avatar3.png" alt="Emily" className="ab-tm-avatar float-fast" />
                        </div>
                        <h4>Emily</h4>
                        <p>Content Specialist</p>
                    </div>
                    <div className="ab-team-member">
                        <div className="ab-tm-avatar-box">
                            <img src="/landing_page-assets/avatar4.png" alt="James" className="ab-tm-avatar float-medium" />
                        </div>
                        <h4>James</h4>
                        <p>Lead Developer</p>
                    </div>
                </div>
            </section>

            <hr className="ab-divider" />

            {/* ── COMMUNITY SECTION ── */}
            <section className="ab-community">
                <h2 className="ab-section-title">Join Our Community!</h2>
                <p className="ab-com-desc">
                    Connect with fellow quiz lovers and stay updated on the latest news and events.
                </p>
                <div className="ab-socials">
                    <a href="#" className="ab-social-btn fb">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                    </a>
                    <a href="#" className="ab-social-btn tw">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                    </a>
                    <a href="#" className="ab-social-btn dc">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" /></svg>
                    </a>
                </div>
            </section>
        </div>
    );
}
