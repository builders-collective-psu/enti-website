import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#020917] py-16 px-4 sm:px-6 lg:px-8 text-white/60 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12">
        
        {/* Brand & Address */}
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/images/eship-logo-gold.png"
              alt="E-SHIP Logo"
              className="w-8 h-8 rounded-lg object-contain border border-[#D4AF37]/30"
            />
            <span className="font-mono font-bold text-white tracking-tight text-base">
              E-SHIP <span className="text-[10px] text-[#D5F44A]">PENN STATE</span>
            </span>
          </div>

          <p className="text-xs leading-relaxed text-white/70 mb-4">
            Engineering Entrepreneurship. School of Engineering Design and Innovation (SEDI), Penn State College of Engineering.
          </p>

          <div className="text-[11px] text-white/50 space-y-1">
            <div>Engineering Design and Innovation (EDI) Building</div>
            <div>Room 319 &bull; University Park, PA 16802</div>
            <div>Contact: <a href="mailto:eship@engr.psu.edu" className="text-[#D5F44A] hover:underline">eship@engr.psu.edu</a></div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          
          {/* Cluster & Programs */}
          <div>
            <span className="text-white font-bold block mb-3 uppercase tracking-wider">
              Cluster & Academics
            </span>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#cluster" className="hover:text-[#D5F44A] transition-colors">
                  Product Innovation Cluster
                </a>
              </li>
              <li>
                <a href="#curriculum" className="hover:text-[#D5F44A] transition-colors">
                  6-Course Sequence
                </a>
              </li>
              <li>
                <a
                  href="https://bulletins.psu.edu/undergraduate/colleges/engineering/product-innovation-entrepreneurship-certificate/#programrequirementstext"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors"
                >
                  <span>Product Innovation Certificate</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://pennstate.qualtrics.com/jfe/form/SV_2gdNylnJOKQFIBE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors"
                >
                  <span>Product Innovation Grant</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Student Ecosystem */}
          <div>
            <span className="text-white font-bold block mb-3 uppercase tracking-wider">
              Student Ecosystem
            </span>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#ventures" className="hover:text-[#D5F44A] transition-colors">
                  GameDay Ventures
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-[#D5F44A] transition-colors">
                  South Korea & Taiwan Treks
                </a>
              </li>
              <li>
                <a
                  href="https://psu.builders"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors"
                >
                  <span>Builders Collective</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://sites.psu.edu/entern/sponsor-submission-form/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors"
                >
                  <span>ENtern Program Sponsors</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Links */}
          <div>
            <span className="text-white font-bold block mb-3 uppercase tracking-wider">
              Institution
            </span>
            <ul className="space-y-2 text-white/70">
              <li>
                <a
                  href="https://www.sedi.psu.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors"
                >
                  <span>Penn State SEDI</span>
                  <ExternalLink className="w-2.5 h-2.5" />
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
                  <ExternalLink className="w-2.5 h-2.5" />
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
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.psu.edu/web-privacy-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D5F44A] transition-colors"
                >
                  University Privacy Policy
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Legal & Attribution */}
      <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
        <span>
          &copy; {new Date().getFullYear()} Penn State College of Engineering &bull; School of Engineering Design and Innovation
        </span>
        <div className="flex items-center gap-1 text-white/60">
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
