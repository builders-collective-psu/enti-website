import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#020917] py-16 px-6 md:px-12 text-[#8FA1B7] font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-7 h-7 rounded bg-[#164CFF] text-[#D5F44A] flex items-center justify-center font-bold text-sm">
              E
            </div>
            <span className="font-display font-bold text-white tracking-tight text-base">
              E—SHIP <span className="text-[10px] text-[#D5F44A]">PENN STATE</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-[#8FA1B7] mb-6">
            Engineering Entrepreneurship &bull; School of Engineering Design and Innovation (SEDI). College of Engineering, The Pennsylvania State University.
          </p>
          <div className="text-[11px] text-white/40">
            304 Engineering Design & Innovation Building<br />
            University Park, PA 16802
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <span className="text-white font-bold block mb-3 uppercase tracking-wider">Academics</span>
            <ul className="space-y-2 text-white/70">
              <li><a href="#engineering-cluster" className="hover:text-[#D5F44A] transition-colors">Program Focus</a></li>
              <li><a href="#curriculum" className="hover:text-[#D5F44A] transition-colors">Core Curriculum</a></li>
              <li><a href="https://bulletins.psu.edu/undergraduate/colleges/intercollege/entrepreneurship-innovation-minor/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors">Bulletin Spec <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://www.lionpath.psu.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors">LionPATH <ExternalLink className="w-2.5 h-2.5" /></a></li>
            </ul>
          </div>

          <div>
            <span className="text-white font-bold block mb-3 uppercase tracking-wider">Ecosystem</span>
            <ul className="space-y-2 text-white/70">
              <li><a href="#ventures" className="hover:text-[#D5F44A] transition-colors">GameDay Ventures</a></li>
              <li><a href="https://psu.builders" target="_blank" rel="noopener noreferrer" className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors">Builders Collective <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="#taiwan" className="hover:text-[#D5F44A] transition-colors">Taiwan Expedition</a></li>
              <li><a href="https://lf.psu.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors">Learning Factory <ExternalLink className="w-2.5 h-2.5" /></a></li>
            </ul>
          </div>

          <div>
            <span className="text-white font-bold block mb-3 uppercase tracking-wider">Institution</span>
            <ul className="space-y-2 text-white/70">
              <li><a href="https://www.sedi.psu.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors">Penn State SEDI <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://www.engr.psu.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D5F44A] flex items-center gap-1 transition-colors">College of Engr <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://www.psu.edu/accessibilitystatement" target="_blank" rel="noopener noreferrer" className="hover:text-[#D5F44A] transition-colors">Accessibility</a></li>
              <li><a href="https://www.psu.edu/web-privacy-statement" target="_blank" rel="noopener noreferrer" className="hover:text-[#D5F44A] transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 mt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
        <span>&copy; {new Date().getFullYear()} E-SHIP &bull; PENN STATE COLLEGE OF ENGINEERING</span>
        <span>DESIGNED FOR ENGINEERS WHO BUILD.</span>
      </div>
    </footer>
  );
};
