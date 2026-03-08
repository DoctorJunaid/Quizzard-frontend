import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AILoader from '../../components/AILoader/AILoader';
import './CategoriesPage.css';
import { API_BASE_URL } from '../../config';

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
    { id: 12, key: 'gaming', image: '/landing_page-assets/cat_technology_1772800409924.png', label: 'Gaming' },
];

export default function CategoriesPage() {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [aiTopic, setAiTopic] = useState('');
    const [aiDifficulty, setAiDifficulty] = useState('medium');
    const [generatingAi, setGeneratingAi] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/categories`);
                const data = await res.json();
                setCategories(data.categories || []);
            } catch {
                setCategories(ALL_CATEGORIES);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const display = categories.length > 0 ? categories : ALL_CATEGORIES;

    const filteredCategories = display.filter(cat =>
        cat.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleGenerateAIQuiz = async () => {
        if (!aiTopic.trim()) return;
        setGeneratingAi(true);
        try {
            const generalCat = categories.find(c => c.key === 'general') || categories[0] || ALL_CATEGORIES[0];
            const catId = generalCat._id || generalCat.id;

            const res = await fetch(`${API_BASE_URL}/api/ai/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    topic: aiTopic,
                    categoryId: catId || '507f1f77bcf86cd799439011',
                    difficulty: aiDifficulty
                }),
            });
            const data = await res.json();
            if (res.ok && data.quizId) {
                toast.success('Quiz generated successfully!');
                navigate(`/play/${data.quizId}`, { viewTransition: true });
            } else {
                toast.error(data.message || 'Failed to generate quiz. Are you signed in?');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong generating the AI quiz.');
        } finally {
            setGeneratingAi(false);
        }
    };

    return (
        <div className="categories-page">
            {generatingAi && <AILoader />}

            {/* ── CINEMATIC HERO BANNER ── */}
            <section className="cp-hero">
                <div className="container cp-hero-inner">

                    {/* ── LEFT: Text content ── */}
                    <div className="cp-hero-left">
                        <h1 className="cp-hero-heading">
                            Browse Our Diverse<br />
                            Quiz Categories
                        </h1>
                        <p className="cp-hero-sub-bold">
                            Discover new topics and test your knowledge across a wide range of subjects!
                        </p>
                        <hr className="cp-hero-divider" />
                        <p className="cp-hero-sub">
                            Explore our vast collection of quizzes and find the perfect challenge for you.
                        </p>
                    </div>

                    {/* ── RIGHT: Visual composition ── */}
                    <div className="cp-hero-right" aria-hidden="true">
                        {/* Main Graphic */}
                        <img
                            src="/landing_page-assets/LeaderboardHeroImage.png"
                            alt="Categories graphic"
                            className="cp-hero-img-asset float-medium"
                        />

                        {/* Floating accent elements */}
                        <img src="/landing_page-assets/star.png" alt="" className="cp-hero-float cp-hf-star1 float-slow" />
                        <img src="/landing_page-assets/star.png" alt="" className="cp-hero-float cp-hf-star2 float-fast" />
                        <img src="/landing_page-assets/Globe_compressed.webp" alt="" className="cp-hero-float cp-hf-globe float-slow" />
                        <img src="/landing_page-assets/star_compressed.webp" alt="" className="cp-hero-float cp-hf-sparkle float-medium" />
                    </div>
                </div>
            </section>

            {/* ── PAGE CONTENT ── */}
            <div className="container">

                {/* ── CONTROLS: SEARCH & TABS ── */}
                <div className="cp-controls">
                    <div className="cp-search">
                        <svg className="cp-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
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
                            <input
                                type="text"
                                placeholder="E.g., The History of Ancient Rome..."
                                className="ai-tb-input"
                                value={aiTopic}
                                onChange={(e) => setAiTopic(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleGenerateAIQuiz()}
                            />
                            <div className="ai-controls-row">
                                <div className="ai-difficulty-selector">
                                    <span className="ai-diff-label">Level:</span>
                                    <select
                                        className="ai-diff-select"
                                        value={aiDifficulty}
                                        onChange={(e) => setAiDifficulty(e.target.value)}
                                    >
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                        <option value="master">Master</option>
                                    </select>
                                </div>
                                <button className="ai-tb-btn" onClick={handleGenerateAIQuiz} disabled={generatingAi}>
                                    {generatingAi ? 'Creating Magic...' : 'Generate AI Quiz'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="ai-tb-image">
                        <img src="/landing_page-assets/bulb.png" alt="AI Quiz Maker" className="float-subtle ai-light-bulb" />
                    </div>
                </div>

                {/* ── GRID SECTION ── */}
                <div className="cp-grid">
                    {loading ? (
                        <div className="page-loader" style={{ gridColumn: '1 / -1' }}>Loading topics...</div>
                    ) : filteredCategories.map((cat, i) => (
                        <div
                            className={`cp-card fade-in cp-${cat.key}`}
                            style={{ animationDelay: `${i * 0.05}s` }}
                            key={cat._id || cat.id}
                        >
                            <div className="cp-card-inner">
                                <div className="cp-img-wrap">
                                    <img
                                        src={
                                            cat.image ||
                                            ALL_CATEGORIES.find(c => c.key === cat.key)?.image ||
                                            `/landing_page-assets/cat_${cat.key}.png`
                                        }
                                        onError={e => { e.target.onerror = null; e.target.src = '/landing_page-assets/cat_general.png'; }}
                                        alt={cat.label}
                                        className="cp-img"
                                    />
                                </div>
                                <div className="cp-footer">
                                    <h3 className="cp-label">{cat.label}</h3>
                                    <Link to={`/categories/${cat.key}`} className="cp-btn" viewTransition>Explore Topics</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
