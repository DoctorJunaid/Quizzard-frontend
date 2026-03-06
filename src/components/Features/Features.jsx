import React from 'react';
import './Features.css';

const FEATURES = [
    {
        iconSrc: '/landing_page-assets/clipboard.png',
        title: 'Take Quizzes',
        desc: 'Explore a wide range of fun and challenging quizzes.',
    },
    {
        iconSrc: '/landing_page-assets/trophy_compressed.png',
        title: 'Compete & Win',
        desc: 'Earn points and climb the leaderboard.',
    },
    {
        iconSrc: '/landing_page-assets/bulb.png',
        title: 'Learn & Improve',
        desc: 'Enhance your knowledge with detailed explanations.',
    },
];

export default function Features() {
    return (
        <section className="features">
            <div className="container features-grid">
                {FEATURES.map(({ iconSrc, title, desc }) => (
                    <div className="feature-card" key={title}>
                        <img src={iconSrc} alt={title} className="feature-img" />
                        <div className="feature-text">
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
