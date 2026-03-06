import React from 'react';
import './Categories.css';

const CATEGORIES = [
    {
        key: 'general',
        image: '/landing_page-assets/cat_general.png',
        label: 'General Knowledge',
    },
    {
        key: 'science',
        image: '/landing_page-assets/cat_science.png',
        label: 'Science & Nature',
    },
    {
        key: 'history',
        image: '/landing_page-assets/cat_history.png',
        label: 'History',
    },
    {
        key: 'entertainment',
        image: '/landing_page-assets/cat_entertainment.png',
        label: 'Entertainment',
    },
];

export default function Categories() {
    return (
        <section className="categories" id="categories">
            <div className="container">
                <h2 className="categories-heading">Popular Quiz Categories</h2>
                <p className="categories-sub">Choose a category to get started or create your own with AI!</p>

                {/* ── AI QUIZ GENERATOR BANNER ── */}
                <div className="ai-topic-banner">
                    <div className="ai-tb-content">
                        <h3>Create Your Own Topic</h3>
                        <p>Type any topic you want and our AI will instantly generate a custom quiz for you.</p>
                        <div className="ai-tb-input-group">
                            <input type="text" placeholder="E.g., The History of Ancient Rome..." className="ai-tb-input" />
                            <button className="ai-tb-btn">Generate AI Quiz</button>
                        </div>
                    </div>
                    <div className="ai-tb-image">
                        <img src="/landing_page-assets/bulb.png" alt="AI Quiz Maker" className="float-slow ai-light-bulb" />
                    </div>
                </div>

                <div className="categories-grid">
                    {CATEGORIES.map(({ key, image, label }) => (
                        <div className={`cat-card cat-${key}`} key={key}>
                            <div className="cat-img-wrap">
                                <img src={image} alt={label} className="cat-img" />
                            </div>
                            <div className="cat-footer">
                                <h3 className="cat-label">{label}</h3>
                                <button className="cat-btn">Play Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
