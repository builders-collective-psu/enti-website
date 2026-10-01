import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MapPin } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Cluster', href: '#cluster' },
    { name: 'Curriculum', href: '#curriculum' },
    { name: 'Certificate & Grants', href: '#grants' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'Faculty', href: '#faculty' },
    { name: 'Videos', href: '#videos' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#041026]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <a href="#" className="flex items-center gap-3.5 group">
            <img
              src="/images/eship-logo-gold.png"
              alt="Penn State E-SHIP Gold Logo"
              className="w-10 h-10 object-contain rounded-lg border border-[#D4AF37]/30 shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-bold tracking-tight text-white group-hover:text-[#D5F44A] transition-colors">
                  E-SHIP
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/70 border border-white/10">
                  SEDI
                </span>
              </div>
              <span className="text-xs text-white/60 tracking-wider">
                Penn State College of Engineering
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-widest font-mono text-white/70 hover:text-[#D5F44A] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Location & CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
              <MapPin className="w-3 h-3 text-[#D5F44A]" />
              <span>EDI Bldg Rm 319</span>
            </div>
            <a
              href="#grants"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase px-4 py-2 rounded bg-[#D5F44A] text-[#041026] hover:bg-[#c2e239] transition-all transform active:scale-95 shadow-md shadow-[#D5F44A]/10"
            >
              <span>Grants & Apply</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#041026]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] pb-2 border-b border-white/10">
            <MapPin className="w-3.5 h-3.5" />
            <span>Engineering Design and Innovation Building (EDI) Rm 319</span>
          </div>
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono uppercase tracking-wider text-white/80 hover:text-[#D5F44A] py-1"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <a
              href="#grants"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center text-xs font-mono font-bold uppercase py-2.5 bg-[#D5F44A] text-[#041026] rounded"
            >
              Apply to Grant ($500)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
