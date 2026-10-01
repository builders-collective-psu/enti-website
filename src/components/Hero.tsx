import React from 'react';
import { ArrowDown, Cpu, Wrench, Rocket, Compass } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 pt-28 pb-16 max-w-7xl mx-auto">
      {/* Top Telemetry Kicker */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-wider text-[#D5F44A] mb-6">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#D5F44A]/10 border border-[#D5F44A]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D5F44A] animate-ping" />
          PENN STATE COLLEGE OF ENGINEERING
        </span>
        <span className="text-white/40">//</span>
        <span className="text-white/70">SCHOOL OF ENGINEERING DESIGN & INNOVATION (SEDI)</span>
      </div>

      {/* Main Massive Headline */}
      <div className="max-w-3xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tightest leading-[0.95] mb-8">
          ENGINEER <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#8FA1B7]">
            THE VENTURE.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[#8FA1B7] font-normal leading-relaxed max-w-2xl mb-10">
          E-SHIP is Penn State's dedicated Engineering Entrepreneurship cluster. 
          We bridge hardcore technical execution with venture creation—taking mechanical prototypes, embedded IoT, and software applications out of the lab and into the real world.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#curriculum"
            className="flex items-center gap-2 bg-[#D5F44A] hover:bg-[#E3FF54] text-[#041026] text-sm font-mono font-bold tracking-wider uppercase px-6 py-3.5 rounded transition-all shadow-[0_0_20px_rgba(213,244,74,0.25)] hover:shadow-[0_0_30px_rgba(213,244,74,0.4)]"
          >
            <span>The Engineering Minor</span>
            <span className="text-xs bg-[#041026] text-[#D5F44A] px-1.5 py-0.5 rounded font-bold">18 CR</span>
          </a>

          <a
            href="#faculty"
            className="flex items-center gap-2 glass-panel hover:bg-white/10 text-white text-sm font-mono tracking-wider uppercase px-6 py-3.5 rounded transition-colors"
          >
            <span>Meet Faculty & Founders</span>
          </a>
        </div>
      </div>

      {/* Engineering Value Proposition Pillars */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-8 border-t border-white/10 max-w-4xl">
        <div className="glass-panel p-4 rounded-lg">
          <div className="flex items-center gap-2 text-[#D5F44A] font-mono text-xs mb-1">
            <Cpu className="w-4 h-4" />
            <span>01 // PROTOTYPING</span>
          </div>
          <div className="font-bold text-white text-base">From CAD to Silicon</div>
          <div className="text-xs text-[#8FA1B7] mt-1">Design, 3D print, CNC machine, and solder real devices.</div>
        </div>

        <div className="glass-panel p-4 rounded-lg">
          <div className="flex items-center gap-2 text-[#D5F44A] font-mono text-xs mb-1">
            <Wrench className="w-4 h-4" />
            <span>02 // GAMEDAY</span>
          </div>
          <div className="font-bold text-white text-base">Field-Tested</div>
          <div className="text-xs text-[#8FA1B7] mt-1">Stress test physical prototypes live at Beaver Stadium tailgates.</div>
        </div>

        <div className="glass-panel p-4 rounded-lg">
          <div className="flex items-center gap-2 text-[#D5F44A] font-mono text-xs mb-1">
            <Rocket className="w-4 h-4" />
            <span>03 // BUILDERS</span>
          </div>
          <div className="font-bold text-white text-base">Hardware & Hackathons</div>
          <div className="text-xs text-[#8FA1B7] mt-1">Collaborate with Penn State's Builders Collective on national tracks.</div>
        </div>

        <div className="glass-panel p-4 rounded-lg">
          <div className="flex items-center gap-2 text-[#D5F44A] font-mono text-xs mb-1">
            <Compass className="w-4 h-4" />
            <span>04 // GLOBAL</span>
          </div>
          <div className="font-bold text-white text-base">Taiwan Tech Tour</div>
          <div className="text-xs text-[#8FA1B7] mt-1">Onsite immersions with TSMC, OnLogic, ViewSonic, and Taipei Tech.</div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <div className="mt-12 flex items-center gap-2 text-xs font-mono text-[#8FA1B7] tracking-widest uppercase">
        <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#D5F44A]" />
        <span>SCROLL TO DIVE INTO THE FORGE</span>
      </div>
    </section>
  );
};
