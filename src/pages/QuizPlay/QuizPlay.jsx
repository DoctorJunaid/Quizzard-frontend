import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './QuizPlay.css';

const DIFF_COLORS = {
    easy: { bg: 'linear-gradient(160deg,#145a32,#0a2e1a)', btn: 'linear-gradient(135deg,#1a7a40,#0d4020)' },
    medium: { bg: 'linear-gradient(160deg,#7a5800,#3d2c00)', btn: 'linear-gradient(135deg,#c49a00,#7a5800)' },
    hard: { bg: 'linear-gradient(160deg,#7a1a1a,#3d0d0d)', btn: 'linear-gradient(135deg,#b83232,#6b1515)' },
};
const CAT_BTNS = {
    science: 'linear-gradient(135deg,#3763bd,#173775)',
    history: 'linear-gradient(135deg,#743475,#451b46)',
    technology: 'linear-gradient(135deg,#3e4a5d,#1b2432)',
    general: 'linear-gradient(135deg,#443063,#2b1d42)',
    entertainment: 'linear-gradient(135deg,#6c23b5,#3e0c70)',
    geography: 'linear-gradient(135deg,#37bdae,#177567)',
    sports: 'linear-gradient(135deg,#bda237,#685810)',
};

const LABELS = ['A', 'B', 'C', 'D'];

export default function QuizPlay() {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [attemptId, setAttemptId] = useState(null);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const init = async () => {
            try {
                const qRes = await fetch(`http://localhost:5000/api/quizzes/${quizId}`);
                if (!qRes.ok) throw new Error('Quiz not found');
                const qData = await qRes.json();
                setQuiz(qData.quiz);
                const chk = await fetch(`http://localhost:5000/api/quizzes/${quizId}/check-attempt`);
                const chkD = await chk.json();
                if (!chkD.canAttempt) setError('You have already completed this quiz.');
            } catch (e) { setError(e.message); }
            finally { setLoading(false); }
        };
        init();
    }, [quizId]);

    const handleStart = async () => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:5000/api/attempts/start', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quizId }),
            });
            if (!res.ok) throw new Error('Failed to start');
            const data = await res.json();
            setAttemptId(data.attempt._id);
            const qRes = await fetch(`http://localhost:5000/api/questions/${quizId}`);
            if (!qRes.ok) throw new Error('Failed to fetch questions');
            const qData = await qRes.json();
            setQuestions(qData.questions);
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    };

    const pick = optId => {
        const qId = questions[currentIdx]._id;
        setAnswers(prev => {
            const ex = prev.find(a => a.questionId === qId);
            return ex
                ? prev.map(a => a.questionId === qId ? { ...a, selectedOptionId: optId } : a)
                : [...prev, { questionId: qId, selectedOptionId: optId }];
        });
    };

    const goNext = () => {
        if (currentIdx < questions.length - 1) setCurrentIdx(i => i + 1);
        else submitQuiz();
    };

    const submitQuiz = async () => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/api/attempts/${attemptId}/submit`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers, timeTaken: 60 }),
            });
            const data = await res.json();
            setResults(data);
            setIsFinished(true);
        } catch (e) { setError(e.message); }
        finally { setLoading(false); }
    };

    /* ── Loading ── */
    if (loading) return (
        <div className="qp-page">
            <div className="qp-loader">
                <div className="qp-dot" /><div className="qp-dot" /><div className="qp-dot" />
            </div>
        </div>
    );

    /* ── Error ── */
    if (error) return (
        <div className="qp-page">
            <div className="qp-modal qp-error-modal">
                <img src="/landing_page-assets/clipboard.png" alt="" className="qp-modal-icon" />
                <h2>Oops!</h2>
                <p>{error}</p>
                <Link to="/categories" className="qp-cta-btn" style={{ background: 'linear-gradient(135deg,#443063,#2b1d42)' }}>
                    ← Back to Categories
                </Link>
            </div>
        </div>
    );

    /* ── Category gradient for buttons ── */
    const catKey = quiz?.categoryId?.key ?? '';
    const btnGrad = CAT_BTNS[catKey] ?? 'linear-gradient(135deg,#443063,#2b1d42)';

    /* ── Intro ── */
    if (!attemptId) {
        const dc = DIFF_COLORS[quiz?.difficulty] ?? DIFF_COLORS.medium;
        return (
            <div className="qp-page">
                <div className="qp-intro-wrap">
                    <Link to="/categories" className="qp-back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </Link>

                    {/* Hero card — same as cat-card */}
                    <div className="qp-intro-card fade-in" style={{ background: dc.bg }}>
                        <div className="qp-intro-shine" />
                        <div className="qp-intro-left">
                            <div className="qp-intro-img-wrap">
                                <img src="/landing_page-assets/clipboard.png" alt="quiz" className="qp-intro-img" />
                            </div>
                        </div>
                        <div className="qp-intro-right">
                            <h1 className="qp-intro-title">{quiz.title}</h1>
                            <p className="qp-intro-desc">{quiz.description}</p>
                            <div className="qp-intro-meta">
                                <span>{quiz.totalQuestions} Questions</span>
                                <span className={`qp-diff-badge qp-diff-${quiz.difficulty}`}>
                                    {quiz.difficulty?.charAt(0).toUpperCase() + quiz.difficulty?.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* White footer panel — same as cat-footer */}
                    <div className="qp-intro-footer">
                        <p className="qp-intro-footer-text">Ready to test your knowledge?</p>
                        <button className="qp-cta-btn" style={{ background: btnGrad }} onClick={handleStart}>
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ── Results ── */
    if (isFinished && results) {
        const pct = results.percentage ?? 0;
        const passed = pct >= 60;
        return (
            <div className="qp-page">
                <div className="qp-intro-wrap fade-in">
                    {/* Same card style as intro */}
                    <div className="qp-intro-card" style={{ background: passed ? 'linear-gradient(160deg,#145a32,#0a2e1a)' : 'linear-gradient(160deg,#7a1a1a,#3d0d0d)' }}>
                        <div className="qp-intro-shine" />
                        <div className="qp-intro-left">
                            <div className="qp-intro-img-wrap">
                                <img src="/landing_page-assets/trophy_compressed.png" alt="result" className="qp-intro-img" />
                            </div>
                        </div>
                        <div className="qp-intro-right">
                            <h1 className="qp-intro-title">Quiz Complete!</h1>
                            <p className="qp-intro-desc">{passed ? 'Great job! You passed!' : 'Keep practising to improve!'}</p>
                            <div className="qp-intro-meta">
                                <span>{results.score} / {results.maxScore} pts</span>
                            </div>
                        </div>
                    </div>

                    <div className="qp-intro-footer qp-results-footer">
                        <div className="qp-score-display">
                            <span className="qp-score-num">{pct}%</span>
                            <span className="qp-score-label">{passed ? 'Passed' : 'Failed'}</span>
                        </div>
                        <div className="qp-results-actions">
                            <Link to="/categories" className="qp-ghost-btn">More Quizzes</Link>
                            <Link to="/log-in" className="qp-cta-btn" style={{ background: btnGrad }}>Save Score</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /* ── Playing ── */
    if (questions.length === 0) return <div className="qp-page"><div className="qp-loader"><p>No questions.</p></div></div>;

    const q = questions[currentIdx];
    const pct = ((currentIdx + 1) / questions.length) * 100;
    const picked = answers.find(a => a.questionId === q._id)?.selectedOptionId;
    const dc = DIFF_COLORS[quiz?.difficulty] ?? DIFF_COLORS.medium;

    return (
        <div className="qp-page qp-playing fade-in">
            <div className="container qp-play-container">

                {/* Progress */}
                <div className="qp-progress-row">
                    <div className="qp-progress-track">
                        <div className="qp-progress-bar" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="qp-progress-lbl">{currentIdx + 1} / {questions.length}</span>
                </div>

                {/* Question card — gradient header + white body */}
                <div className="qp-qcard">
                    {/* Gradient header strip (like cat-img-wrap) */}
                    <div className="qp-qcard-header" style={{ background: dc.bg }}>
                        <div className="qp-qcard-shine" />
                        <span className="qp-q-num">Question {currentIdx + 1}</span>
                        <h2 className="qp-q-text">{q.text}</h2>
                    </div>

                    {/* White options body (like cat-footer) */}
                    <div className="qp-qcard-body">
                        <div className="qp-options">
                            {q.options.map((opt, i) => (
                                <button
                                    key={opt._id}
                                    className={`qp-option ${picked === opt._id ? 'selected' : ''}`}
                                    onClick={() => pick(opt._id)}
                                >
                                    <span className="qp-opt-letter">{LABELS[i]}</span>
                                    <span className="qp-opt-text">{opt.text}</span>
                                </button>
                            ))}
                        </div>

                        <div className="qp-qcard-footer">
                            <span className="qp-skip" onClick={goNext}>Skip</span>
                            <button
                                className="qp-cta-btn"
                                style={{ background: btnGrad, opacity: picked ? 1 : 0.45, cursor: picked ? 'pointer' : 'not-allowed' }}
                                disabled={!picked}
                                onClick={goNext}
                            >
                                {currentIdx === questions.length - 1 ? 'Submit' : 'Next →'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
