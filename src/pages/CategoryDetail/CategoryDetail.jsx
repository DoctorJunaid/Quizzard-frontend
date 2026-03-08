import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CategoryDetail.css';
import { API_BASE_URL } from '../../config';

/* ─── Category config (matching seeded DB keys) ─── */
const CAT_CONFIG = {
    'science': { gradient: 'linear-gradient(160deg, #2a5bde 0%, #0d2a84 100%)', image: '/landing_page-assets/cat_science.png', btnGrad: 'linear-gradient(135deg, #3763bd 0%, #173775 100%)' },
    'history': { gradient: 'linear-gradient(160deg, #50214a 0%, #2f122a 100%)', image: '/landing_page-assets/cat_history.png', btnGrad: 'linear-gradient(135deg, #743475 0%, #451b46 100%)' },
    'technology': { gradient: 'linear-gradient(160deg, #1a2a4a 0%, #0d1827 100%)', image: '/landing_page-assets/cat_technology_1772800409924.png', btnGrad: 'linear-gradient(135deg, #3e4a5d 0%, #1b2432 100%)' },
    'general-knowledge': { gradient: 'linear-gradient(160deg, #d36a11 0%, #aa4b05 100%)', image: '/landing_page-assets/cat_general.png', btnGrad: 'linear-gradient(135deg, #443063 0%, #2b1d42 100%)' },
    'general': { gradient: 'linear-gradient(160deg, #d36a11 0%, #aa4b05 100%)', image: '/landing_page-assets/cat_general.png', btnGrad: 'linear-gradient(135deg, #443063 0%, #2b1d42 100%)' },
    'entertainment': { gradient: 'linear-gradient(160deg, #6c1187 0%, #3e0750 100%)', image: '/landing_page-assets/cat_entertainment.png', btnGrad: 'linear-gradient(135deg, #6c23b5 0%, #3e0c70 100%)' },
    'geography': { gradient: 'linear-gradient(160deg, #0e7c5a 0%, #064534 100%)', image: '/landing_page-assets/cat_geography_1772800391003.png', btnGrad: 'linear-gradient(135deg, #37bdae 0%, #177567 100%)' },
    'sports': { gradient: 'linear-gradient(160deg, #9c7c0a 0%, #5a4600 100%)', image: '/landing_page-assets/cat_sports_1772800427142.png', btnGrad: 'linear-gradient(135deg, #bda237 0%, #685810 100%)' },
    'computer-science': { gradient: 'linear-gradient(160deg, #0f172a 0%, #020617 100%)', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000', btnGrad: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' },
};

const DIFF_STARS = { easy: 2, medium: 3, hard: 5 };

const DIFF_COLORS = {
    easy: { bg: 'linear-gradient(160deg, #145a32 0%, #0a2e1a 100%)', btn: 'linear-gradient(135deg, #1a7a40 0%, #0d4020 100%)' },
    medium: { bg: 'linear-gradient(160deg, #7a5800 0%, #3d2c00 100%)', btn: 'linear-gradient(135deg, #c49a00 0%, #7a5800 100%)' },
    hard: { bg: 'linear-gradient(160deg, #7a1a1a 0%, #3d0d0d 100%)', btn: 'linear-gradient(135deg, #b83232 0%, #6b1515 100%)' },
};

const TOP_PLAYERS = [
    { rank: 1, name: 'Alex', points: 2580, avatar: '/landing_page-assets/avatar1.png' },
    { rank: 2, name: 'Emma', points: 2130, avatar: '/landing_page-assets/avatar2.png' },
    { rank: 3, name: 'James', points: 1980, avatar: '/landing_page-assets/avatar3.png' },
];

function StarRow({ difficulty }) {
    const filled = DIFF_STARS[difficulty] ?? 3;
    return (
        <span className="cd-stars">
            {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} className={`cd-star ${i < filled ? 'on' : 'off'}`} viewBox="0 0 24 24">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
            ))}
        </span>
    );
}

const ALL_CATEGORIES = [
    { id: 1, key: 'general', image: '/landing_page-assets/cat_general.png', label: 'General Knowledge' },
    { id: 2, key: 'science', image: '/landing_page-assets/cat_science.png', label: 'Science & Nature' },
    { id: 'history', key: 'history', image: '/landing_page-assets/cat_history.png', label: 'History' },
    { id: 'entertainment', key: 'entertainment', image: '/landing_page-assets/cat_entertainment.png', label: 'Entertainment' },
    { id: 'geography', key: 'geography', image: '/landing_page-assets/cat_geography_1772800391003.png', label: 'Geography' },
    { id: 'technology', key: 'technology', image: '/landing_page-assets/cat_technology_1772800409924.png', label: 'Technology' },
    { id: 'literature', key: 'literature', image: '/landing_page-assets/cat_general.png', label: 'Literature' },
    { id: 'movies', key: 'movies', image: '/landing_page-assets/cat_entertainment.png', label: 'Movies & TV' },
    { id: 'music', key: 'music', image: '/landing_page-assets/cat_history.png', label: 'Music' },
    { id: 'sports', key: 'sports', image: '/landing_page-assets/cat_sports_1772800427142.png', label: 'Sports' },
    { id: 'art', key: 'art', image: '/landing_page-assets/cat_general.png', label: 'Art & Culture' },
    { id: 'gaming', key: 'gaming', image: '/landing_page-assets/cat_technology_1772800409924.png', label: 'Gaming' },
];

export default function CategoryDetail() {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [diffFilter, setDiffFilter] = useState('All');

    useEffect(() => {
        const load = async () => {
            try {
                const catRes = await fetch(`${API_BASE_URL}/api/categories`);
                const catData = await catRes.json();
                let found = (catData.categories || []).find(c => c._id === categoryId || c.key === categoryId);

                if (!found) {
                    found = ALL_CATEGORIES.find(c => c.key === categoryId || String(c.id) === categoryId);
                }

                if (found) {
                    setCategory(found);
                    if (found._id) {
                        const qRes = await fetch(`${API_BASE_URL}/api/quizzes?category=${found._id}`);
                        const qData = await qRes.json();
                        setQuizzes(qData.quizzes || []);
                    } else {
                        setQuizzes([]);
                    }
                }
            } catch (e) {
                console.error(e);
                const foundFallback = ALL_CATEGORIES.find(c => c.key === categoryId || String(c.id) === categoryId);
                if (foundFallback) setCategory(foundFallback);
                setQuizzes([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [categoryId]);

    if (loading) return (
        <div className="cd-page">
            <div className="cd-loader">
                <div className="cd-dot" /><div className="cd-dot" /><div className="cd-dot" />
            </div>
        </div>
    );
    if (!category) return <div className="cd-page"><div className="cd-loader">Category not found.</div></div>;

    const cfg = CAT_CONFIG[category.key] ?? CAT_CONFIG.general;

    const shown = quizzes.filter(q => {
        const ms = q.title.toLowerCase().includes(search.toLowerCase());
        const md = diffFilter === 'All' || q.difficulty === diffFilter.toLowerCase();
        return ms && md;
    });

    return (
        <div className="cd-page">
            <div className="container">

                {/* ── Back ── */}
                <Link to="/categories" className="cd-back" viewTransition>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    All Categories
                </Link>

                {/* ── Page Hero Banner ─ matches category card style ── */}
                <div className="cd-hero" style={{ background: cfg.gradient }}>
                    <div className="cd-hero-shine" />
                    <div className="cd-hero-text">
                        <h1 className="cd-hero-title">{category.label} Quizzes</h1>
                        <p className="cd-hero-sub">{category.description || `Test your knowledge across all ${category.label} topics.`}</p>
                    </div>
                    <div className="cd-hero-img-wrap">
                        <img src={category.image || cfg.image} alt={category.label} className="cd-hero-img"
                            onError={e => { e.target.onerror = null; e.target.src = '/landing_page-assets/cat_general.png'; }} />
                    </div>
                </div>

                {/* ── Controls ── */}
                <div className="cd-controls">
                    <div className="cd-search-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            placeholder="Search quizzes…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="cd-diff-tabs">
                        {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                            <button
                                key={d}
                                className={`cd-diff-tab ${diffFilter === d ? 'active' : ''} cd-dt-${d.toLowerCase()}`}
                                onClick={() => setDiffFilter(d)}
                            >{d}</button>
                        ))}
                    </div>
                </div>

                {/* ── Two-column body ── */}
                <div className="cd-body">

                    {/* LEFT: quiz list */}
                    <div className="cd-quiz-list">
                        {shown.length === 0 ? (
                            <div className="cd-empty">No quizzes match your filters.</div>
                        ) : shown.map((quiz, i) => {
                            const dc = DIFF_COLORS[quiz.difficulty] ?? DIFF_COLORS.medium;
                            return (
                                <div
                                    className="cd-qcard fade-in"
                                    key={quiz._id}
                                    style={{ animationDelay: `${i * 0.07}s` }}
                                >
                                    {/* shine wipe on hover — same as cat-card */}
                                    <div className="cd-qcard-shine" />

                                    {/* Icon panel — same gradient style as category cards */}
                                    <div className="cd-qcard-icon" style={{ background: quiz.heroImage ? `url(${quiz.heroImage}) center/cover no-repeat` : dc.bg }}>
                                        {!quiz.heroImage && (
                                            <img
                                                src="/landing_page-assets/clipboard.png"
                                                alt=""
                                                className="cd-qcard-icon-img"
                                            />
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="cd-qcard-info">
                                        <h3 className="cd-qcard-title">{quiz.title}</h3>
                                        <p className="cd-qcard-meta">
                                            {quiz.totalQuestions} Questions
                                            {quiz.timeLimitMinutes ? ` · ${quiz.timeLimitMinutes} Min` : ''}
                                        </p>
                                        <p className="cd-qcard-diff-row">
                                            Difficulty:&nbsp;
                                            <span className={`cd-diff-word cd-diff-${quiz.difficulty}`}>
                                                {quiz.difficulty?.charAt(0).toUpperCase() + quiz.difficulty?.slice(1)}
                                            </span>
                                            &nbsp;
                                            <StarRow difficulty={quiz.difficulty} />
                                        </p>
                                    </div>

                                    {/* CTA */}
                                    <Link
                                        to={`/play/${quiz._id}`}
                                        className="cd-start-btn"
                                        style={{ background: cfg.btnGrad }}
                                        viewTransition
                                    >
                                        Start Quiz
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* RIGHT: sidebar */}
                    <aside className="cd-sidebar">
                        {/* Top players card — styled like leaderboard hero */}
                        <div className="cd-scard">
                            <div className="cd-scard-header">
                                <img src="/landing_page-assets/NormalTrophy.png" alt="trophy" className="cd-scard-trophy" />
                                <h3 className="cd-scard-title">Top Players <span>Today</span></h3>
                            </div>
                            <div className="cd-players">
                                {TOP_PLAYERS.map(p => (
                                    <div className="cd-player" key={p.rank}>
                                        <span className="cd-player-rank">{p.rank}</span>
                                        <img src={p.avatar} alt={p.name} className="cd-player-av"
                                            onError={e => { e.target.onerror = null; e.target.src = '/landing_page-assets/avatar1.png'; }} />
                                        <span className="cd-player-name">{p.name}</span>
                                        <span className="cd-player-pts">{p.points.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <Link to="/leaderboard" className="cd-lb-btn" style={{ background: cfg.btnGrad }} viewTransition>
                                View Leaderboard
                            </Link>
                        </div>

                        {/* Sign in promo */}
                        <div className="cd-scard cd-promo" style={{ background: cfg.gradient }}>
                            <div className="cd-promo-shine" />
                            <img src="/landing_page-assets/trophy_compressed.png" alt="trophy" className="cd-promo-img" />
                            <p className="cd-promo-text">Sign in to save scores &amp; climb the leaderboard!</p>
                            <Link to="/log-in" className="cd-promo-btn" style={{ background: cfg.btnGrad }} viewTransition>
                                Sign In
                            </Link>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}
