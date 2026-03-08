import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import About from './pages/About/About';
import CategoriesPage from './pages/Categories/CategoriesPage';
import CategoryDetail from './pages/CategoryDetail/CategoryDetail';
import QuizPlay from './pages/QuizPlay/QuizPlay';
import Footer from './components/Footer/Footer';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import InteractiveBackground from './components/InteractiveBackground/InteractiveBackground';
import { Toaster } from 'react-hot-toast';
import Lenis from 'lenis';

export default function App() {
  const { pathname } = useLocation();
  const lenisRef = React.useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Sync scroll on route change - handled IMMEDIATELY for view transition
  React.useLayoutEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <InteractiveBackground />

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
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <Footer />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#1a103c',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              fontFamily: "'Outfit', sans-serif"
            },
          }}
        />
      </div>
    </>
  );
}
