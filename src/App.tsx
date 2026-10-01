import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Hero } from './components/Hero';
import { EngineeringCluster } from './components/EngineeringCluster';
import { Curriculum } from './components/Curriculum';
import { FacultySection } from './components/FacultySection';
import { VenturesAndBuilders } from './components/VenturesAndBuilders';
import { TaiwanExpedition } from './components/TaiwanExpedition';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalHeight)) : 0;
      setScrollProgress(progress);
      (window as any).__scrollProgress = progress;

      // Determine active section
      const sections = ['engineering-cluster', 'curriculum', 'faculty', 'ventures', 'taiwan', 'contact'];
      let current = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#041026] text-white selection:bg-[#D5F44A] selection:text-[#041026] font-sans">
      {/* 3D Kinetic Background Layer (Alche.studio scroll-linked choreography) */}
      <ThreeCanvas scrollProgress={scrollProgress} activeSection={activeSection} />

      {/* Blueprint Grid Overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />

      {/* Foreground Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <EngineeringCluster />
          <Curriculum />
          <FacultySection />
          <VenturesAndBuilders />
          <TaiwanExpedition />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
