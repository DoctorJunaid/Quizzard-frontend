import React from 'react';
import './Hero.css';

export default function Hero() {
    return (
        <section className="hero">
            <div className="container hero-inner">

                {/* ── LEFT: Text content ── */}
                <div className="hero-left">
                    <h1 className="hero-heading">
                        Test Your Knowledge<br />
                        with Fun Quizzes!
                    </h1>
                    <p className="hero-sub">
                        Challenge yourself with engaging quizzes on a variety of
                        topics. Learn, compete, and have fun!
                    </p>
                    <div className="hero-buttons">
                        <button className="btn-primary hero-btn-primary">Get Started</button>
                        <button className="hero-btn-ghost">How It Works</button>
                    </div>
                </div>

                {/* ── RIGHT: Visual composition ── */}
                <div className="hero-right" aria-hidden="true">

                    {/* Soft glow ring behind assets */}
                    <div className="hero-glow" />

                    {/* Trophy — top-left of visual */}
                    <img
                        src="/landing_page-assets/trophy_compressed.png"
                        alt=""
                        className="hero-asset hero-trophy float-slow"
                    />

                    {/* Planet — top-right */}
                    <img
                        src="/landing_page-assets/Globe_compressed.webp"
                        alt=""
                        className="hero-asset hero-planet float-medium"
                    />

                    {/* Star — middle-left */}
                    <img
                        src="/landing_page-assets/star_compressed.webp"
                        alt=""
                        className="hero-asset hero-star float-fast"
                    />

                    {/* Shield — right side */}
                    <img
                        src="/landing_page-assets/shield_compressed.webp"
                        alt=""
                        className="hero-asset hero-shield float-medium"
                    />

                    {/* Mobile — central */}
                    <img
                        src="/landing_page-assets/mobile_compressed.webp"
                        alt="Quiz App on Mobile"
                        className="hero-asset hero-mobile float-slow"
                    />

                    {/* Girl — overlapping phone, bottom */}
                    <img
                        src="/landing_page-assets/girlImage_compressed.webp"
                        alt=""
                        className="hero-asset hero-girl"
                    />

                    {/* Cloud — floats beneath phone & girl */}
                    <img
                        src="/landing_page-assets/purple-clouds.webp"
                        alt=""
                        className="hero-asset hero-cloud"
                    />
                </div>
            </div>


        </section>
    );
}
