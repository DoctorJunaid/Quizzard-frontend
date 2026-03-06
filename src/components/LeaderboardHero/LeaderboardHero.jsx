import React from 'react';
import './LeaderboardHero.css';

export default function LeaderboardHero() {
    return (
        <section className="lb-hero">
            <div className="container lb-hero-inner">

                {/* ── LEFT: Text content ── */}
                <div className="lb-hero-left">
                    <h1 className="lb-hero-heading">Leaderboard</h1>
                    <h2 className="lb-hero-sub">Top QuizMasters!</h2>
                    <p className="lb-hero-text">
                        Climb the ranks and see who's leading the pack! Earn points by playing quizzes and compete for the top spots on the leaderboard.
                    </p>
                </div>

                {/* ── RIGHT: Visual composition ── */}
                <div className="lb-hero-right" aria-hidden="true">

                    {/* Soft glow ring behind assets */}
                    <div className="lb-hero-glow" />

                    {/* Bulb — top-left */}
                    <img
                        src="/landing_page-assets/bulb.png"
                        alt=""
                        className="lb-hero-asset lb-ht-bulb float-slow"
                    />

                    {/* Planet — top-right */}
                    <img
                        src="/landing_page-assets/Globe_compressed.webp"
                        alt=""
                        className="lb-hero-asset lb-ht-planet float-medium"
                    />

                    {/* Clipboard — middle-left */}
                    <img
                        src="/landing_page-assets/clipboard.png"
                        alt=""
                        className="lb-hero-asset lb-ht-clipboard float-fast"
                    />

                    {/* Stars */}
                    <img
                        src="/landing_page-assets/star.png"
                        alt=""
                        className="lb-hero-asset lb-ht-star-1 float-medium"
                    />

                    {/* Target — bottom-right */}
                    <img
                        src="/landing_page-assets/target.png"
                        alt=""
                        className="lb-hero-asset lb-ht-target float-fast"
                    />

                    {/* Main Character Image */}
                    <img
                        src="/landing_page-assets/girlImage_compressed.webp"
                        alt=""
                        className="lb-hero-asset lb-ht-girl"
                    />

                    {/* Cloud — floats beneath */}
                    <img
                        src="/landing_page-assets/purple-clouds.webp"
                        alt=""
                        className="lb-hero-asset lb-ht-cloud"
                    />
                </div>
            </div>
        </section>
    );
}
