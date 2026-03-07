import React, { useState, useMemo } from 'react';
import './Leaderboard.css';

/* ─── Mock Data ─────────────────────────────────────────────── */
const ALL_DATA = {
    Weekly: [
        { id: 1, name: 'Cosmic_Ace', username: 'cosmic_ace', score: 1250000, avatar: '/landing_page-assets/avatar1.png' },
        { id: 2, name: 'Trivia_Master', username: 'trivia_master', score: 1120000, avatar: '/landing_page-assets/avatar2.png' },
        { id: 3, name: 'Nebula_Drifter', username: 'nebula_drifter', score: 990000, avatar: '/landing_page-assets/avatar3.png' },
        { id: 4, name: 'QuizWhiz_99', username: 'quizwhiz_99', score: 850000, avatar: '/landing_page-assets/avatar4.png' },
        { id: 5, name: 'Stardust_Quizzer', username: 'stardust', score: 810000, avatar: '/landing_page-assets/avatar1.png' },
        { id: 6, name: 'Brainiac_77', username: 'brainiac_77', score: 780000, avatar: '/landing_page-assets/avatar2.png' },
        { id: 7, name: 'Brainiac3', username: 'brainiac3', score: 770000, avatar: '/landing_page-assets/avatar3.png' },
        { id: 8, name: 'QuizWhiz_B', username: 'quizwhiz_b', score: 760000, avatar: '/landing_page-assets/avatar4.png' },
        { id: 9, name: 'Rackismke', username: 'rackismke', score: 750000, avatar: '/landing_page-assets/avatar1.png' },
        { id: 10, name: 'Jemwline', username: 'jemwline', score: 740000, avatar: '/landing_page-assets/avatar2.png' },
        { id: 11, name: 'Trivia_Tist', username: 'trivia_tist', score: 700000, avatar: '/landing_page-assets/avatar3.png' },
        { id: 12, name: 'Jsmvson', username: 'jsmvson', score: 690000, avatar: '/landing_page-assets/avatar4.png' },
        { id: 13, name: 'StarGazer_X', username: 'stargazer', score: 680000, avatar: '/landing_page-assets/avatar1.png' },
        { id: 14, name: 'NovaMind', username: 'novamind', score: 650000, avatar: '/landing_page-assets/avatar2.png' },
        { id: 15, name: 'EclipseQ', username: 'eclipseq', score: 640000, avatar: '/landing_page-assets/avatar3.png' },
    ],
    Monthly: [
        { id: 1, name: 'VortexQuiz', username: 'vortex', score: 3100000, avatar: '/landing_page-assets/avatar3.png' },
        { id: 2, name: 'Cosmic_Ace', username: 'cosmic_ace', score: 2800000, avatar: '/landing_page-assets/avatar1.png' },
        { id: 3, name: 'GalacticBrain', username: 'galactic', score: 2650000, avatar: '/landing_page-assets/avatar4.png' },
        { id: 4, name: 'Trivia_Master', username: 'trivia_master', score: 2500000, avatar: '/landing_page-assets/avatar2.png' },
        { id: 5, name: 'Nebula_Drifter', username: 'nebula_drifter', score: 2300000, avatar: '/landing_page-assets/avatar3.png' },
        { id: 6, name: 'QuizWhiz_99', username: 'quizwhiz_99', score: 2100000, avatar: '/landing_page-assets/avatar4.png' },
        { id: 7, name: 'StarPulse', username: 'starpulse', score: 2050000, avatar: '/landing_page-assets/avatar1.png' },
        { id: 8, name: 'Stardust_Quizzer', username: 'stardust', score: 1900000, avatar: '/landing_page-assets/avatar2.png' },
        { id: 9, name: 'Brainiac_77', username: 'brainiac_77', score: 1850000, avatar: '/landing_page-assets/avatar3.png' },
        { id: 10, name: 'Rackismke', username: 'rackismke', score: 1700000, avatar: '/landing_page-assets/avatar4.png' },
    ],
    'All-Time': [
        { id: 1, name: 'OmegaMind', username: 'omegamind', score: 9800000, avatar: '/landing_page-assets/avatar4.png' },
        { id: 2, name: 'VortexQuiz', username: 'vortex', score: 8500000, avatar: '/landing_page-assets/avatar3.png' },
        { id: 3, name: 'Cosmic_Ace', username: 'cosmic_ace', score: 7200000, avatar: '/landing_page-assets/avatar1.png' },
        { id: 4, name: 'GalacticBrain', username: 'galactic', score: 6800000, avatar: '/landing_page-assets/avatar4.png' },
        { id: 5, name: 'Trivia_Master', username: 'trivia_master', score: 6100000, avatar: '/landing_page-assets/avatar2.png' },
        { id: 6, name: 'Nebula_Drifter', username: 'nebula_drifter', score: 5900000, avatar: '/landing_page-assets/avatar3.png' },
        { id: 7, name: 'NovaMind', username: 'novamind', score: 5700000, avatar: '/landing_page-assets/avatar2.png' },
        { id: 8, name: 'StarPulse', username: 'starpulse', score: 5400000, avatar: '/landing_page-assets/avatar1.png' },
        { id: 9, name: 'QuizWhiz_99', username: 'quizwhiz_99', score: 5100000, avatar: '/landing_page-assets/avatar4.png' },
        { id: 10, name: 'Stardust_Quizzer', username: 'stardust', score: 4800000, avatar: '/landing_page-assets/avatar1.png' },
        { id: 11, name: 'Brainiac_77', username: 'brainiac_77', score: 4600000, avatar: '/landing_page-assets/avatar3.png' },
        { id: 12, name: 'Rackismke', username: 'rackismke', score: 4300000, avatar: '/landing_page-assets/avatar4.png' },
    ],
};

const TABS = ['Weekly', 'Monthly', 'All-Time'];

function fmtXP(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M XP';
    if (n >= 1000) return (n / 1000).toFixed(0) + ',000 XP';
    return n + ' XP';
}

const PODIUM_TROPHY = {
    1: '/landing_page-assets/GoldTrophyLeaderBoard.png',
    2: '/landing_page-assets/SilverTrophy.png',
    3: '/landing_page-assets/BronzeTrophy.png',
};

export default function Leaderboard() {
    const [activeTab, setActiveTab] = useState('Weekly');
    const [search, setSearch] = useState('');

    const data = ALL_DATA[activeTab] || [];

    const [first, second, third] = data;
    const rest = data.slice(3);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return rest.filter(u =>
            u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q)
        );
    }, [search, rest]);

    const leftFiltered = filtered.filter((_, i) => i % 2 === 0);
    const rightFiltered = filtered.filter((_, i) => i % 2 === 1);
    const leftCol = rest.filter((_, i) => i % 2 === 0);
    const rightCol = rest.filter((_, i) => i % 2 === 1);

    return (
        <div className="leaderboard-page">
            <section className="lb-content">
                <div className="container">

                    {/* ── TIME FILTER + SEARCH BAR ── */}
                    <div className="lb-top-bar">
                        <div className="lb-tabs-pill">
                            {TABS.map(t => (
                                <button
                                    key={t}
                                    className={`lb-pill ${activeTab === t ? 'active' : ''}`}
                                    onClick={() => setActiveTab(t)}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        <div className="lb-search">
                            <svg className="lb-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search player..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* ── PODIUM (TOP 3) ── */}
                    <div className="lb-podium">

                        {/* RANK 2 — LEFT */}
                        {second && (
                            <div className="podium-card rank-2">
                                <img src={PODIUM_TROPHY[2]} alt="Silver Trophy" className="podium-trophy" />
                                <div className="podium-avatar-ring silver">
                                    <img src={second.avatar} alt={second.name} className="podium-avatar" />
                                </div>
                                <div className="podium-rank-badge silver">RANK #2</div>
                                <h3 className="podium-name silver">{second.name}</h3>
                                <div className="podium-stats">
                                    <span>Score: <strong>{fmtXP(second.score)}</strong></span>
                                </div>
                            </div>
                        )}

                        {/* RANK 1 — CENTER */}
                        {first && (
                            <div className="podium-card rank-1">
                                <img src={PODIUM_TROPHY[1]} alt="Gold Trophy" className="podium-trophy podium-trophy-gold" />
                                <div className="podium-avatar-ring gold">
                                    <img src={first.avatar} alt={first.name} className="podium-avatar" />
                                </div>
                                <div className="podium-rank-badge gold">RANK #1</div>
                                <h3 className="podium-name gold">{first.name}</h3>
                                <div className="podium-stats">
                                    <span>Score: <strong>{fmtXP(first.score)}</strong></span>
                                </div>
                            </div>
                        )}

                        {/* RANK 3 — RIGHT */}
                        {third && (
                            <div className="podium-card rank-3">
                                <img src={PODIUM_TROPHY[3]} alt="Bronze Trophy" className="podium-trophy" />
                                <div className="podium-avatar-ring bronze">
                                    <img src={third.avatar} alt={third.name} className="podium-avatar" />
                                </div>
                                <div className="podium-rank-badge bronze">RANK #3</div>
                                <h3 className="podium-name bronze">{third.name}</h3>
                                <div className="podium-stats">
                                    <span>Score: <strong>{fmtXP(third.score)}</strong></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── YOUR RANK CARD — MIDDLE ── */}
                    <div className="your-rank-strip" style={{ marginBottom: '44px' }}>
                        <div className="yr-strip-inner">
                            <img src="/landing_page-assets/star_compressed.webp" alt="" className="yr-star yr-star-l" />
                            <h3 className="yr-label">Your Rank</h3>
                            <img src="/landing_page-assets/star_compressed.webp" alt="" className="yr-star yr-star-r" />
                        </div>
                        <div className="yr-content">
                            <div className="yr-avatar-ring">
                                <img src="/landing_page-assets/avatar2.png" alt="You" className="yr-avatar" />
                            </div>
                            <div className="yr-details">
                                <span className="yr-name">You</span>
                                <span className="yr-sub">6,480 XP</span>
                            </div>
                            <div className="yr-rank-number">
                                <span className="yr-big-rank">25<sup>th</sup></span>
                                <span className="yr-rank-lbl">Global Rank</span>
                            </div>
                            <button className="yr-btn">View Profile</button>
                        </div>
                    </div>

                    {/* ── DUAL TABLE ── */}
                    <div className="lb-dual-tables">

                        {/* LEFT TABLE */}
                        <div className="lb-table-panel">
                            <div className="lb-table-head">
                                <span className="th-rank">Rank</span>
                                <span className="th-player">Player</span>
                                <span className="th-score">Score</span>
                                <span className="th-trophy"> </span>
                            </div>
                            <div className="lb-table-body">
                                {(search ? leftFiltered : leftCol).map(user => {
                                    const globalRank = data.indexOf(user) + 1;
                                    return (
                                        <div className="lb-row" key={user.id}>
                                            <span className="lb-rank-num">{globalRank}</span>
                                            <div className="lb-player">
                                                <img src={user.avatar} alt={user.name} className="lb-avatar" />
                                                <div className="lb-player-info">
                                                    <span className="lb-pname">{user.name}</span>
                                                    <span className="lb-uname">@{user.username}</span>
                                                </div>
                                            </div>
                                            <span className="lb-score">{fmtXP(user.score)}</span>
                                            <img
                                                src="/landing_page-assets/NormalTrophy.png"
                                                alt="trophy"
                                                className="lb-trophy-icon"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* RIGHT TABLE */}
                        <div className="lb-table-panel">
                            <div className="lb-table-head">
                                <span className="th-rank">Rank</span>
                                <span className="th-player">Player</span>
                                <span className="th-score">Score</span>
                                <span className="th-trophy"> </span>
                            </div>
                            <div className="lb-table-body">
                                {(search ? rightFiltered : rightCol).map(user => {
                                    const globalRank = data.indexOf(user) + 1;
                                    return (
                                        <div className="lb-row" key={user.id}>
                                            <span className="lb-rank-num">{globalRank}</span>
                                            <div className="lb-player">
                                                <img src={user.avatar} alt={user.name} className="lb-avatar" />
                                                <div className="lb-player-info">
                                                    <span className="lb-pname">{user.name}</span>
                                                    <span className="lb-uname">@{user.username}</span>
                                                </div>
                                            </div>
                                            <span className="lb-score">{fmtXP(user.score)}</span>
                                            <img
                                                src="/landing_page-assets/NormalTrophy.png"
                                                alt="trophy"
                                                className="lb-trophy-icon"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </div>
    );
}
