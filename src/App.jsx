import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import About from './pages/About/About';
import CategoriesPage from './pages/Categories/CategoriesPage';
import CategoryDetail from './pages/CategoryDetail/CategoryDetail';
import QuizPlay from './pages/QuizPlay/QuizPlay';
import Footer from './components/Footer/Footer';

/* ── Seeded star field so stars don't re-randomise on render ── */
function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}
const rand = seededRandom(42);
const STARS = Array.from({ length: 180 }, (_, i) => {
  const glow = i % 9 === 0;
  const size = glow ? rand() * 3.5 + 2 : rand() * 2 + 0.6;
  return {
    id: i,
    left: `${rand() * 100}%`,
    top: `${rand() * 100}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${rand() * 8}s`,
    animationDuration: `${rand() * 6 + 3}s`,
    opacity: glow ? 0.95 : rand() * 0.55 + 0.25,
    className: glow ? 'star star-glow' : 'star',
  };
});

export default function App() {
  return (
    <>
      {/* fixed deep-space background */}
      <div className="bg-layer" aria-hidden="true">
        <div className="bg-image" />
        <div className="bg-overlay" />
        {STARS.map(s => (
          <div
            key={s.id}
            className={s.className}
            style={{
              left: s.left, top: s.top,
              width: s.width, height: s.height,
              animationDelay: s.animationDelay,
              animationDuration: s.animationDuration,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {/* page content */}
      <div className="page">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:categoryId" element={<CategoryDetail />} />
          <Route path="/play/:quizId" element={<QuizPlay />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
