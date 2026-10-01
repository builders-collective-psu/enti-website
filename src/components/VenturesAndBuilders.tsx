import React from 'react';
import { Trophy, Flame, ExternalLink, ArrowUpRight, Terminal, CheckCircle2 } from 'lucide-react';

export const VenturesAndBuilders: React.FC = () => {
  return (
    <section id="ventures" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] tracking-wider uppercase mb-3">
            <Flame className="w-4 h-4" />
            <span>06 / Hands-On Prototyping</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase">
            Tested in the Wild <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#D4AF37]">
              Built to Ship
            </span>
          </h2>
        </div>
        <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed font-normal">
          From Beaver Stadium tailgate playtests to national hackathons and venture-backed accelerators, 
          E-SHIP engineering happens outside the lecture hall.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* GameDay Ventures Feature Card */}
        <div className="bg-[#061838]/80 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between">
          <div className="relative aspect-video overflow-hidden">
            <img
              src="/images/sedi-tailgate.jpg"
              alt="SEDI Tailgate GameDay Ventures"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061838] via-transparent to-transparent" />
            <div className="absolute top-4 left-4 bg-[#041026]/90 border border-white/15 px-3 py-1 rounded-full text-[11px] font-mono text-[#D5F44A] flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              <span>ENGR 407 Flagship // Beaver Stadium</span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-white mb-3">
              GameDay Ventures: Beaver Stadium Tailgate Arena
            </h3>
            <p className="text-sm text-white/75 leading-relaxed mb-6">
              The semester assignment: conceptualize, engineer, fabricate, and test an original physical tailgate game. 
              Student teams bring functional prototypes to Beaver Stadium lots, competing directly in front of fans and judges.
            </p>

            {/* Whirl Pong Case Study Callout */}
            <div className="bg-[#041026] p-5 rounded-xl border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[#D5F44A]">CASE STUDY: WHIRL PONG</span>
                <span className="font-mono text-[10px] text-white/40">ONWARD STATE & COLLEGIAN</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed mb-3">
                Penn State mechanical engineering student Dillon Fink invented Whirl Pong during his E-SHIP coursework, 
                reinventing the classic tailgate game with spinning target mechanics. The project spun out into an independent commercial venture.
              </p>
              <a
                href="https://onwardstate.com/2024/09/06/theres-nothing-like-it-out-there-penn-state-sophomore-reinvents-cup-pong/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D5F44A] hover:underline"
              >
                <span>Read the Onward State Feature</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-white/50">
              <span>PROTOTYPE</span>
              <span>→</span>
              <span>FABRICATE</span>
              <span>→</span>
              <span>BEAVER STADIUM FIELD TEST</span>
            </div>
          </div>
        </div>

        {/* Builders Collective Feature Card */}
        <div className="bg-[#061838]/80 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between">
          <div className="relative aspect-video overflow-hidden">
            <img
              src="/images/makerspace-students.jpg"
              alt="Penn State Builders in the Learning Factory"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061838] via-transparent to-transparent" />
            <div className="absolute top-4 left-4 bg-[#041026]/90 border border-white/15 px-3 py-1 rounded-full text-[11px] font-mono text-white flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>Student Community // Hardware & Software</span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-white mb-3">
              Penn State Builders Collective
            </h3>
            <p className="text-sm text-white/75 leading-relaxed mb-6">
              A high-velocity student organization uniting engineers, designers, and software builders. 
              Teams collaborate on national hackathons, hardware builds, and early startup launches with mentorship 
              from E-SHIP faculty Ted Graef and Brad Groznik.
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-xs">
                <span className="text-[#D5F44A] font-bold block mb-1">CalHacks & HackMIT Delegations</span>
                <span className="text-white/70">Sponsored student builder teams competing at top collegiate engineering challenges.</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-xs">
                <span className="text-white font-bold block mb-1">Happy Valley LaunchBox Pipeline</span>
                <span className="text-white/70">Seamless bridge into the FastTrack Accelerator and Summer Founders micro-grant program.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-white/50">psu.builders</span>
              <a
                href="https://psu.builders"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
              >
                <span>Visit PSU Builders</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
