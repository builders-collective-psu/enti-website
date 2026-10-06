import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { CurriculumPage } from './pages/CurriculumPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { FacultyPage } from './pages/FacultyPage';
import { VenturesPage } from './pages/VenturesPage';
import { ContactPage } from './pages/ContactPage';

const AppLayout: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalHeight)) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-[#041026] text-white selection:bg-[#D5F44A] selection:text-[#041026] font-sans antialiased overflow-x-hidden flex flex-col justify-between">
      {/* 3D Kinetic Background Layer (Mechanical CAD exploded assembly) */}
      <ThreeCanvas scrollProgress={scrollProgress} activeSection={location.pathname} />

      {/* Blueprint Grid Overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/curriculum" element={<CurriculumPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/faculty" element={<FacultyPage />} />
            <Route path="/ventures" element={<VenturesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/+$/, '') || '/'}>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
