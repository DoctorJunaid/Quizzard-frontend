import React, { useState } from 'react';
import './CategoriesPage.css';

const ALL_CATEGORIES = [
    { id: 1, key: 'general', image: '/landing_page-assets/cat_general.png', label: 'General Knowledge' },
    { id: 2, key: 'science', image: '/landing_page-assets/cat_science.png', label: 'Science & Nature' },
    { id: 3, key: 'history', image: '/landing_page-assets/cat_history.png', label: 'History' },
    { id: 4, key: 'entertainment', image: '/landing_page-assets/cat_entertainment.png', label: 'Entertainment' },
    { id: 5, key: 'geography', image: '/landing_page-assets/cat_geography_1772800391003.png', label: 'Geography' },
    { id: 6, key: 'technology', image: '/landing_page-assets/cat_technology_1772800409924.png', label: 'Technology' },
    { id: 7, key: 'literature', image: '/landing_page-assets/cat_general.png', label: 'Literature' },
    { id: 8, key: 'movies', image: '/landing_page-assets/cat_entertainment.png', label: 'Movies & TV' },
    { id: 9, key: 'music', image: '/landing_page-assets/cat_history.png', label: 'Music' },
    { id: 10, key: 'sports', image: '/landing_page-assets/cat_sports_1772800427142.png', label: 'Sports' },
    { id: 11, key: 'art', image: '/landing_page-assets/cat_general.png', label: 'Art & Culture' },
    { id: 12, key: 'gaming', image: '/landing_page-assets/cat_technology_1772800409924.png', label: 'Gaming' }
];

export default function CategoriesPage() {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="categories-page">
            <div className="container">
                {/* ── HEADER SECTION ── */}
                <div className="cp-header">
                    <h1 className="cp-heading">Choose Your Quiz Category!</h1>
                    <p className="cp-sub">
                        Explore thousands of fun and challenging quizzes across a variety of topics.
                        Test your knowledge, earn points, and have a blast!
                    </p>
                </div>

                {/* ── CONTROLS: SEARCH & TABS ── */}
                <div className="cp-controls">
                    <div className="cp-search">
                        <svg className="cp-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="cp-tabs">
                        {['All', 'Popular', 'Latest', 'Random'].map(tab => (
                            <button
                                key={tab}
                                className={`cp-tab ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>


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
                        <img src="/landing_page-assets/bulb.png" alt="AI Quiz Maker" className="float-subtle ai-light-bulb" />
                    </div>
                </div>

                {/* ── GRID SECTION ── */}
                <div className="cp-grid">
                    {ALL_CATEGORIES.map(({ id, key, image, label }) => (
                        <div className={`cp-card fade-in cp-${key}`} style={{ animationDelay: `${id * 0.05}s` }} key={id}>
                            <div className="cp-card-inner">
                                <div className="cp-img-wrap">
                                    <img src={image} alt={label} className="cp-img" />
                                </div>
                                <div className="cp-footer">
                                    <h3 className="cp-label">{label}</h3>
                                    <button className="cp-btn">Play Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
