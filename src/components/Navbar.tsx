import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, MapPin, ChevronRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Curriculum', path: '/curriculum' },
    { name: 'Grants & Programs', path: '/programs' },
    { name: 'Experiences', path: '/experiences' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Ventures', path: '/ventures' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#041026]/95 backdrop-blur-lg border-b border-white/10 shadow-xl py-3'
          : 'bg-gradient-to-b from-[#041026]/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Identity */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <img
              src="/images/eship-logo-gold.png"
              alt="Penn State E-SHIP Gold Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-xl border border-[#D4AF37]/40 shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold tracking-tight text-white group-hover:text-[#D5F44A] transition-colors">
                  E-SHIP
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#D5F44A]/10 text-[#D5F44A] border border-[#D5F44A]/30">
                  SEDI
                </span>
              </div>
              <span className="text-xs text-white/70 tracking-wide font-medium">
                Penn State College of Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Clean, uncrowded) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-mono tracking-wider transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#D5F44A] font-bold'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D5F44A] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/programs"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold uppercase px-4 py-2.5 rounded-xl bg-[#D5F44A] text-[#041026] hover:bg-[#c2e239] transition-all transform active:scale-95 shadow-md shadow-[#D5F44A]/10"
            >
              <span>Apply / Grants</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#041026]/98 backdrop-blur-2xl border-b border-white/15 px-6 py-8 shadow-2xl min-h-[calc(100vh-65px)] overflow-y-auto">
          
          {/* Office Quick Card */}
          <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#D5F44A] shrink-0" />
            <div className="text-xs font-mono text-white/80">
              <span className="text-white font-bold block">EDI Building Room 319</span>
              <span>School of Engineering Design and Innovation</span>
            </div>
          </div>

          {/* Links List */}
          <nav className="flex flex-col space-y-2 mb-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between text-lg font-mono py-3.5 px-4 rounded-xl border transition-colors ${
                    isActive
                      ? 'bg-[#D5F44A]/15 text-[#D5F44A] border-[#D5F44A]/40 font-bold'
                      : 'bg-white/[0.03] text-white/90 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </Link>
              );
            })}
          </nav>

          {/* Direct CTA Buttons */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <a
              href="https://pennstate.qualtrics.com/jfe/form/SV_2gdNylnJOKQFIBE"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 text-sm font-mono font-bold uppercase rounded-xl bg-[#D5F44A] text-[#041026] text-center shadow-lg shadow-[#D5F44A]/10"
            >
              <span>Apply for $500 Seed Grant</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-mono rounded-xl bg-white/10 hover:bg-white/15 text-white text-center border border-white/15"
            >
              <span>Contact Faculty & Advising</span>
            </Link>
          </div>

        </div>
      )}
    </header>
  );
};
