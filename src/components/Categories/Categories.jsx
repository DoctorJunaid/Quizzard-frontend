import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

/* ── Asset + gradient mapping per seeded key ── */
const CAT_META = {
    'science': { image: '/landing_page-assets/cat_science.png', gradient: 'cat-science' },
    'history': { image: '/landing_page-assets/cat_history.png', gradient: 'cat-history' },
    'technology': { image: '/landing_page-assets/cat_technology_1772800409924.png', gradient: 'cat-technology' },
    'general-knowledge': { image: '/landing_page-assets/cat_general.png', gradient: 'cat-general-knowledge' },
    'general': { image: '/landing_page-assets/cat_general.png', gradient: 'cat-general' },
    'entertainment': { image: '/landing_page-assets/cat_entertainment.png', gradient: 'cat-entertainment' },
    'geography': { image: '/landing_page-assets/cat_geography_1772800391003.png', gradient: 'cat-geography' },
    'sports': { image: '/landing_page-assets/cat_sports_1772800427142.png', gradient: 'cat-sports' },
};

const FALLBACK_IMAGE = '/landing_page-assets/cat_general.png';

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/categories')
            .then(r => r.json())
            .then(data => setCategories((data.categories || []).slice(0, 4)))
            .catch(() => setCategories([]));
    }, []);

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
                    {categories.map((cat) => {
                        const meta = CAT_META[cat.key] ?? {};
                        const img = meta.image ?? FALLBACK_IMAGE;
                        const cls = meta.gradient ?? `cat-${cat.key}`;
                        return (
                            <div className={`cat-card ${cls}`} key={cat._id ?? cat.key}>
                                <div className="cat-img-wrap">
                                    <img
                                        src={img}
                                        alt={cat.label}
                                        className="cat-img"
                                        onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE; }}
                                    />
                                </div>
                                <div className="cat-footer">
                                    <h3 className="cat-label">{cat.label}</h3>
                                    <Link to={`/categories/${cat.key}`} className="cat-btn">Play Now</Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View all link */}
                <div style={{ textAlign: 'center', marginTop: '28px' }}>
                    <Link to="/categories" className="view-all-btn">View All Categories →</Link>
                </div>
            </div>
        </section>
    );
}
