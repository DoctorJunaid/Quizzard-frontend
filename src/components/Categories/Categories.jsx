import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AILoader from '../AILoader/AILoader';
import './Categories.css';

/* ── Asset + gradient mapping per seeded key ── */
const CAT_META = {
    'science': { image: '/landing_page-assets/cat_science.png', gradient: 'cat-science' },
    'history': { image: '/landing_page-assets/cat_history.png', gradient: 'cat-history' },
    'technology': { image: '/landing_page-assets/cat_technology_1772800409924.png', gradient: 'cat-technology' },
    'computer-science': { image: '/landing_page-assets/cat_technology_1772800409924.png', gradient: 'cat-technology' },
    'general-knowledge': { image: '/landing_page-assets/cat_general.png', gradient: 'cat-general-knowledge' },
    'general': { image: '/landing_page-assets/cat_general.png', gradient: 'cat-general' },
    'entertainment': { image: '/landing_page-assets/cat_entertainment.png', gradient: 'cat-entertainment' },
    'geography': { image: '/landing_page-assets/cat_geography_1772800391003.png', gradient: 'cat-geography' },
    'sports': { image: '/landing_page-assets/cat_sports_1772800427142.png', gradient: 'cat-sports' },
};

const FALLBACK_IMAGE = '/landing_page-assets/cat_general.png';

const FALLBACK_CATEGORIES = [
    { _id: 'fallback_1', key: 'general', image: '/landing_page-assets/cat_general.png', label: 'General Knowledge' },
    { _id: 'fallback_2', key: 'science', image: '/landing_page-assets/cat_science.png', label: 'Science & Nature' },
    { _id: 'fallback_3', key: 'history', image: '/landing_page-assets/cat_history.png', label: 'History' },
    { _id: 'fallback_4', key: 'technology', image: '/landing_page-assets/cat_technology_1772800409924.png', label: 'Technology' },
];

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [aiTopic, setAiTopic] = useState('');
    const [aiDifficulty, setAiDifficulty] = useState('medium');
    const [generatingAi, setGeneratingAi] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/categories')
            .then(r => r.json())
            .then(data => {
                const fetched = data.categories || [];
                setCategories(fetched.length > 0 ? fetched.slice(0, 4) : FALLBACK_CATEGORIES);
            })
            .catch(() => setCategories(FALLBACK_CATEGORIES));
    }, []);

    const handleGenerateAIQuiz = async () => {
        if (!aiTopic.trim()) return;
        setGeneratingAi(true);
        try {
            const generalCat = categories.find(c => c.key === 'general') || categories[0] || { _id: null };
            const catId = generalCat._id || generalCat.id;

            const res = await fetch('http://localhost:5000/api/ai/generate', {
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
                if (data.error?.includes('QUOTA_EXCEEDED') || data.message?.includes('QUOTA_EXCEEDED')) {
                    toast.error('AI limit reached. Please wait 1 minute and try again.', { duration: 5000 });
                } else {
                    toast.error(data.message || 'Failed to generate quiz. Are you signed in?');
                }
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong generating the AI quiz.');
        } finally {
            setGeneratingAi(false);
        }
    };

    return (
        <section className="categories" id="categories">
            {generatingAi && <AILoader />}
            <div className="container">
                <h2 className="categories-heading">Popular Quiz Categories</h2>
                <p className="categories-sub">Choose a category to get started or create your own with AI!</p>

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
                                    {generatingAi ? 'Summoning AI...' : 'Generate AI Quiz'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="ai-tb-image">
                        <img src="/landing_page-assets/bulb.png" alt="AI Quiz Maker" className="float-slow ai-light-bulb" />
                    </div>
                </div>

                <div className="categories-grid">
                    {categories.map((cat) => {
                        const meta = CAT_META[cat.key] ?? {};
                        const img = cat.image || meta.image || FALLBACK_IMAGE;
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
                                    <Link to={`/categories/${cat.key}`} className="cat-btn" viewTransition>Play Now</Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View all link */}
                <div style={{ textAlign: 'center', marginTop: '28px' }}>
                    <Link to="/categories" className="view-all-btn" viewTransition>View All Categories →</Link>
                </div>
            </div>
        </section>
    );
}
