import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#020917] py-16 px-4 sm:px-6 lg:px-8 text-white/60 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12">
        
        {/* Brand & Address */}
        <div className="max-w-sm">
          <Link to="/" className="flex items-center gap-3 mb-4 group">
            <img
              src="/images/eship-logo-gold.png"
              alt="E-SHIP Logo"
              className="w-8 h-8 rounded-lg object-contain border border-[#D4AF37]/30 transition-transform group-hover:scale-105"
            />
            <span className="font-mono font-bold text-white tracking-tight text-base group-hover:text-[#D5F44A] transition-colors">
              E-SHIP <span className="text-[10px] text-[#D5F44A]">PENN STATE</span>
            </span>
          </Link>

          <p className="text-xs sm:text-sm leading-relaxed text-white/70 mb-4">
            Engineering Entrepreneurship. School of Engineering Design and Innovation (SEDI), Penn State College of Engineering.
          </p>

          <div className="text-xs text-white/50 space-y-1">
            <div>Engineering Design and Innovation (EDI) Building</div>
            <div>Room 319 &bull; University Park, PA 16802</div>
            <div>Contact: <a href="mailto:eship@engr.psu.edu" className="text-[#D5F44A] hover:underline">eship@engr.psu.edu</a></div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          
          {/* Cluster & Programs */}
          <div>
            <span className="text-white font-bold block mb-3 uppercase tracking-wider text-sm">
              Pages & Academics
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
              <li>
                <Link to="/curriculum" className="hover:text-[#D5F44A] transition-colors">
                  Curriculum & Cluster
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-[#D5F44A] transition-colors">
                  Grants & Certificate
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="hover:text-[#D5F44A] transition-colors">
                  Global Treks
                </Link>
              </li>
              <li>
                <Link to="/faculty" className="hover:text-[#D5F44A] transition-colors">
                  Faculty & Mentors
                </Link>
              </li>
              <li>
                <Link to="/ventures" className="hover:text-[#D5F44A] transition-colors">
                  GameDay Ventures
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Ecosystem */}
          <div>
            <span className="text-white font-bold block mb-3 uppercase tracking-wider text-sm">
              Forms & Grants
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
              <li>
                <a
                  href="https://pennstate.qualtrics.com/jfe/form/SV_2gdNylnJOKQFIBE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors"
                >
                  <span>$500 Seed Grant Form</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://sites.psu.edu/entern/sponsor-submission-form/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors"
                >
                  <span>ENtern Sponsor Form</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://bulletins.psu.edu/undergraduate/colleges/engineering/product-innovation-entrepreneurship-certificate/#programrequirementstext"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors"
                >
                  <span>Certificate Bulletin</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://psu.builders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors"
                >
                  <span>PSU Builders Collective</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Links */}
          <div>
            <span className="text-white font-bold block mb-3 uppercase tracking-wider text-sm">
              Institution
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
              <li>
                <a
                  href="https://www.sedi.psu.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors"
                >
                  <span>Penn State SEDI</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.engr.psu.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors"
                >
                  <span>Penn State College of Engineering</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://startupweek.psu.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors"
                >
                  <span>Penn State Startup Week</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D5F44A] transition-colors">
                  Contact & Listserv
                </Link>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Legal & Attribution */}
      <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <span>
          &copy; {new Date().getFullYear()} Penn State College of Engineering &bull; School of Engineering Design and Innovation
        </span>
        <div className="flex items-center gap-1 text-white/70">
          <span>Designed and built by</span>
          <a
            href="https://sahajtech.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#D5F44A] font-bold underline underline-offset-4 decoration-[#D5F44A]/50 transition-colors"
          >
            sahajtech llc
          </a>
        </div>
      </div>
    </footer>
  );
};
