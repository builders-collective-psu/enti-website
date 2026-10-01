import React from 'react';
import { Trophy, Flame, ExternalLink, ArrowUpRight, Hammer, Terminal, Cpu } from 'lucide-react';

export const VenturesAndBuilders: React.FC = () => {
  return (
    <section id="ventures" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] tracking-wider uppercase mb-3">
            <Flame className="w-4 h-4" />
            <span>04 // IN THE FIELD</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tightest">
            TESTED IN THE WILD. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#8FA1B7]">
              BUILT TO SHIP.
            </span>
          </h2>
        </div>
        <p className="text-[#8FA1B7] max-w-md text-sm sm:text-base leading-relaxed font-normal">
          From Beaver Stadium tailgate playtests to national hackathons and venture-backed accelerators, E-SHIP engineering lives outside the lecture hall.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* GameDay Ventures Feature Card */}
        <div className="glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-8xl font-display pointer-events-none">
            01
          </div>

          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#D5F44A] mb-4">
              <Trophy className="w-4 h-4" />
              <span>ENGR 407 FLAGSHIP // BEAVER STADIUM</span>
            </div>

            <h3 className="text-3xl font-extrabold text-white tracking-tight mb-4">
              GameDay Ventures: The Tailgate Arena
            </h3>

            <p className="text-sm text-[#8FA1B7] leading-relaxed mb-6">
              The semester assignment: conceptualize, engineer, fabricate, and package an original physical tailgate game. 
              Teams take working prototypes to Beaver Stadium lots, competing in front of real fans and industry judges. Real users, instant feedback, real mechanical stress.
            </p>

            {/* Whirl Pong Case Study Callout */}
            <div className="bg-[#081730] p-5 rounded-xl border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-[#D5F44A]">CASE STUDY // WHIRL PONG</span>
                <span className="font-mono text-[10px] text-white/50">ONWARD STATE & COLLEGIAN</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed mb-3">
                Penn State mechanical engineering sophomore Dillon Fink invented Whirl Pong during his E-SHIP coursework—reinventing the classic tailgate game with rotational mechanics. The project spun out into an independent commercial venture.
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
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-white/10 text-xs font-mono text-white/50">
            <span>PROTOTYPE</span>
            <span>&rarr;</span>
            <span>FABRICATE</span>
            <span>&rarr;</span>
            <span>FIELD TEST</span>
          </div>
        </div>

        {/* Builders Collective Feature Card */}
        <div className="glass-panel p-8 rounded-2xl border border-[#164CFF]/50 relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-[#081730] to-[#041026]">
          <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-8xl font-display pointer-events-none">
            02
          </div>

          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#0084FF] mb-4">
              <Terminal className="w-4 h-4" />
              <span>STUDENT COMMUNITY // HARDWARE & SOFTWARE</span>
            </div>

            <h3 className="text-3xl font-extrabold text-white tracking-tight mb-4">
              Penn State Builders Collective
            </h3>

            <p className="text-sm text-[#8FA1B7] leading-relaxed mb-6">
              A high-velocity student community forming teams for national hackathons, hardware sprints, and venture launches. Supported directly by E-SHIP faculty Ted Graef and Brad Groznik.
            </p>

            {/* Achievements Subgrid */}
            <div className="space-y-3 mb-6">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="font-bold text-white">c0mpiled-6 / Penn State</span>
                  <span className="text-[#D5F44A]">FEB 2026 // EDI BLDG</span>
                </div>
                <p className="text-xs text-[#8FA1B7]">
                  High-intensity sprint hackathon in the EDI Building focusing on AI for research & productivity with Transpose Platform.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="font-bold text-white">Terrametric @ Bitcamp 2026</span>
                  <span className="text-[#D5F44A]">3 TRACK WINS</span>
                </div>
                <p className="text-xs text-[#8FA1B7]">
                  Student team led by Abhinav Dasari, Vidyut Sriram, and Varnika Yadav took home multiple awards representing Builders Collective.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="font-mono text-xs text-white/50">OPEN TO ALL PENN STATE MAKERS</span>
            <a
              href="https://psu.builders"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#164CFF] hover:bg-[#0084FF] text-white font-mono text-xs font-bold uppercase transition-colors"
            >
              <span>Visit psu.builders</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
