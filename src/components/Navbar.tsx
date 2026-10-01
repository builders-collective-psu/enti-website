import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded bg-[#164CFF] text-[#D5F44A] flex items-center justify-center font-mono font-bold text-lg group-hover:scale-105 transition-transform">
            E
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-tight text-white flex items-center gap-2">
              E—SHIP <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-[#D5F44A]">PENN STATE</span>
            </span>
            <span className="text-[10px] font-mono text-[#8FA1B7] tracking-wider uppercase">
              Engineering Entrepreneurship
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-[#8FA1B7]">
          <a href="#engineering-cluster" className="hover:text-white transition-colors">Program</a>
          <a href="#curriculum" className="hover:text-white transition-colors">The Forge (Courses)</a>
          <a href="#faculty" className="hover:text-white transition-colors">Faculty & Mentors</a>
          <a href="#ventures" className="hover:text-white transition-colors">Ventures & Builders</a>
          <a href="#taiwan" className="hover:text-white transition-colors">Taiwan Expedition</a>
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2 text-[11px] font-mono text-white/50 border border-white/10 px-2.5 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D5F44A] animate-pulse" />
            <span>EDI BLDG // 304</span>
          </div>
          <a
            href="#contact"
            className="flex items-center gap-1.5 bg-[#D5F44A] hover:bg-[#E3FF54] text-[#041026] text-xs font-mono font-bold tracking-wider uppercase px-4 py-2 rounded transition-colors"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white/70 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#041026] border-b border-white/10 px-6 py-6 flex flex-col gap-4 font-mono text-sm tracking-wider uppercase">
          <a 
            href="#engineering-cluster" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-[#8FA1B7] hover:text-white border-b border-white/5"
          >
            01 // Program Focus
          </a>
          <a 
            href="#curriculum" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-[#8FA1B7] hover:text-white border-b border-white/5"
          >
            02 // The Forge (Curriculum)
          </a>
          <a 
            href="#faculty" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-[#8FA1B7] hover:text-white border-b border-white/5"
          >
            03 // Faculty & Mentors
          </a>
          <a 
            href="#ventures" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-[#8FA1B7] hover:text-white border-b border-white/5"
          >
            04 // GameDay & Builders
          </a>
          <a 
            href="#taiwan" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-[#8FA1B7] hover:text-white border-b border-white/5"
          >
            05 // Taiwan Tech Expedition
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-[#D5F44A] text-[#041026] font-bold py-3 rounded"
          >
            Connect with E-SHIP <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};
