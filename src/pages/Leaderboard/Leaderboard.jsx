import React, { useState } from 'react';
import LeaderboardHero from '../../components/LeaderboardHero/LeaderboardHero';
import './Leaderboard.css';

const MOCK_DATA = [
    { id: 1, name: 'Sarah', level: 24, points: '15,430', avatar: '/landing_page-assets/avatar1.png' },
    { id: 2, name: 'Mike', level: 21, points: '13,900', avatar: '/landing_page-assets/avatar2.png' },
    { id: 3, name: 'Emily', level: 19, points: '12,750', avatar: '/landing_page-assets/avatar3.png' },
    { id: 4, name: 'Liz', level: 15, points: '11,560', avatar: '/landing_page-assets/avatar4.png' },
    { id: 5, name: 'John', level: 17, points: '10,990', avatar: '/landing_page-assets/avatar1.png' },
    { id: 6, name: 'Alex', level: 14, points: '9,840', avatar: '/landing_page-assets/avatar2.png' },
    { id: 7, name: 'Daniel', level: 16, points: '9,330', avatar: '/landing_page-assets/avatar3.png' },
    { id: 8, name: 'Jenny', level: 12, points: '8,670', avatar: '/landing_page-assets/avatar4.png' },
    { id: 9, name: 'Adam', level: 13, points: '7,540', avatar: '/landing_page-assets/avatar1.png' },
];

export default function Leaderboard() {
    const [activeTab, setActiveTab] = useState('All Time');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="leaderboard-page">
            <LeaderboardHero />

            <section className="lb-content">
                <div className="container lb-content-inner">

                    {/* ── LEFT COLUMN: Filters + Table ── */}
                    <div className="lb-main">
                        {/* Controls Header */}
                        <div className="lb-controls">
                            <div className="lb-tabs">
                                {['All Time', 'Monthly', 'Weekly'].map(tab => (
                                    <button
                                        key={tab}
                                        className={`lb-tab ${activeTab === tab ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="lb-search">
                                <svg className="lb-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Leaderboard Table */}
                        <div className="lb-table-wrapper">
                            <div className="lb-table-header">
                                <div className="th-rank">Rank</div>
                                <div className="th-name">Name</div>
                                <div className="th-level">Level</div>
                                <div className="th-points">Points</div>
                            </div>

                            <div className="lb-table-body">
                                {MOCK_DATA.map((user, index) => {
                                    let rankCrown = null;
                                    if (index === 0) rankCrown = '/landing_page-assets/GoldCrown.png';
                                    else if (index === 1) rankCrown = '/landing_page-assets/silverCrown.png';
                                    else if (index === 2) rankCrown = '/landing_page-assets/BronzeCrown.png';

                                    return (
                                        <div className={`lb-row ${index < 3 ? 'top-3' : ''} ${index === 0 ? 'rank-1' : ''}`} key={user.id}>
                                            <div className="lb-col-rank">
                                                {rankCrown ? (
                                                    <div className="rank-badge">
                                                        <img src={rankCrown} alt="crown" className="crown-icon" />
                                                    </div>
                                                ) : (
                                                    <span className="rank-num">{index + 1}</span>
                                                )}
                                            </div>

                                            <div className="lb-col-name">
                                                <img src={user.avatar} alt={user.name} className="user-avatar" />
                                                <div className="name-info">
                                                    <h4 className="user-name">{user.name}</h4>
                                                    <span className="user-subtext">Lvl {user.level}</span>
                                                </div>
                                            </div>

                                            <div className="lb-col-level">
                                                <div className="level-badge">Lvl {user.level}</div>
                                            </div>

                                            <div className="lb-col-points">
                                                <span className="points-val">{user.points}</span>
                                                <img src="/landing_page-assets/NormalTrophy.png" alt="trophy" className="points-icon" />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN: Your Rank Sidebar ── */}
                    <div className="lb-sidebar">
                        <div className="your-rank-card">
                            <div className="yr-stars-bg" />

                            <div className="yr-header">
                                <img src="/landing_page-assets/star.png" alt="" className="yr-small-star left" />
                                <h3>Your Rank</h3>
                                <img src="/landing_page-assets/star.png" alt="" className="yr-small-star right" />
                            </div>

                            <div className="yr-avatar-wrapper">
                                <div className="yr-avatar-ring">
                                    <img src="/landing_page-assets/avatar2.png" alt="You" className="yr-avatar" />
                                </div>
                            </div>

                            <p className="yr-level">Lvl 12</p>
                            <h2 className="yr-rank">25<sup>th</sup></h2>
                            <p className="yr-points"><span className="yr-points-highlight">6,480</span> Points</p>

                            <button className="lb-btn-profile">View Your Profile</button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
