import React, { useState } from 'react';
import { BookOpen, ExternalLink, ArrowRight, Code, Wrench, BarChart3, Rocket } from 'lucide-react';

interface Course {
  code: string;
  title: string;
  credits: string;
  type: string;
  description: string;
  icon: any;
  skills: string[];
}

const courses: Course[] = [
  {
    code: 'ENGR 407',
    title: 'Technology-Based Entrepreneurship',
    credits: '3 CR',
    type: 'ENGINEERING CORE',
    description: 'The flagship hands-on prototyping sprint. Cross-functional engineering teams ideate, design, 3D print, and fabricate physical products, concluding with live field tests at the GameDay Ventures tailgate challenge.',
    icon: Wrench,
    skills: ['Physical Prototyping', 'CAD/CAM', 'User Testing', 'Product Feasibility']
  },
  {
    code: 'ENGR 411',
    title: 'Business Basics for Entrepreneurs',
    credits: '3 CR',
    type: 'BUSINESS & FINANCE',
    description: 'BOM modeling, unit economics, cash flow forecasting, intellectual property landscapes, and financing strategies for hardware, software, and deep-tech startups.',
    icon: BarChart3,
    skills: ['BOM Modeling', 'IP & Patents', 'SaaS & Hardware Pricing', 'Cash Flow']
  },
  {
    code: 'ENGR 310',
    title: 'Entrepreneurial Leadership',
    credits: '3 CR',
    type: 'FOUNDATION CORE',
    description: 'Developing leadership under extreme technical uncertainty. Team dynamics, rapid pivoting, project prioritization, and driving high-velocity engineering decisions.',
    icon: Code,
    skills: ['Technical Leadership', 'Conflict Resolution', 'Agile Sprints', 'High-Risk Strategy']
  },
  {
    code: 'ENGR 425',
    title: 'New Venture Creation',
    credits: '3 CR',
    type: 'VENTURE CAPSTONE',
    description: 'Synthesizing technical validation and commercial viability. Direct engagement with real angel investors, customer acquisition experiments, and legal entity setup.',
    icon: Rocket,
    skills: ['Investor Defense', 'Go-To-Market', 'Regulatory/Compliance', 'Customer Discovery']
  }
];

export const Curriculum: React.FC = () => {
  const [activeCourse, setActiveCourse] = useState(courses[0]);

  return (
    <section id="curriculum" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] tracking-wider uppercase mb-3">
            <BookOpen className="w-4 h-4" />
            <span>02 // THE FORGE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tightest">
            THE CURRICULUM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#8FA1B7]">
              BLUEPRINT.
            </span>
          </h2>
        </div>
        <div className="text-right flex flex-col items-start md:items-end gap-2">
          <span className="font-mono text-xs text-[#8FA1B7]">OFFICIAL BULLETIN TRACK:</span>
          <span className="font-mono font-bold text-sm text-[#D5F44A] px-3 py-1 bg-[#D5F44A]/10 border border-[#D5F44A]/30 rounded">
            PRODUCT INNOVATION // 18-20 CREDITS
          </span>
        </div>
      </div>

      {/* Interactive Course Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Course Selection Cards */}
        <div className="lg:col-span-7 space-y-4">
          {courses.map((c) => {
            const Icon = c.icon;
            const isSelected = activeCourse.code === c.code;

            return (
              <div
                key={c.code}
                onClick={() => setActiveCourse(c)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#0D2040] border-[#D5F44A] shadow-[0_0_25px_rgba(213,244,74,0.15)] translate-x-2'
                    : 'glass-panel border-white/10 hover:border-white/25 hover:bg-[#081730]/80'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center font-mono text-xs font-bold ${
                      isSelected ? 'bg-[#D5F44A] text-[#041026]' : 'bg-white/10 text-white'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono font-bold text-lg text-white">{c.code}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-white/5 text-[#8FA1B7]">
                      {c.type}
                    </span>
                    <span className="font-mono text-xs text-[#D5F44A] font-bold">{c.credits}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
                <p className="text-sm text-[#8FA1B7] line-clamp-2">{c.description}</p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Deep-Dive Inspector Panel */}
        <div className="lg:col-span-5 glass-panel p-8 rounded-xl border border-[#D5F44A]/40 sticky top-28 bg-[#041026]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <span className="font-mono text-xs text-[#D5F44A] tracking-wider uppercase">
              // INSPECTION_TERMINAL
            </span>
            <span className="font-mono text-xs text-white/50">{activeCourse.code}</span>
          </div>

          <div className="mb-6">
            <span className="text-xs font-mono text-[#8FA1B7] tracking-wider uppercase block mb-1">COURSE TITLE</span>
            <h4 className="text-2xl font-bold text-white tracking-tight">{activeCourse.title}</h4>
          </div>

          <div className="mb-6">
            <span className="text-xs font-mono text-[#8FA1B7] tracking-wider uppercase block mb-2">SYLLABUS FOCUS</span>
            <p className="text-sm text-[#8FA1B7] leading-relaxed">
              {activeCourse.description}
            </p>
          </div>

          <div className="mb-8">
            <span className="text-xs font-mono text-[#8FA1B7] tracking-wider uppercase block mb-3">KEY APPLIED SKILLS</span>
            <div className="flex flex-wrap gap-2">
              {activeCourse.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono bg-white/5 text-white/90 rounded border border-white/10"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="font-mono text-xs text-white/60">ADVISER: TED GRAEF</span>
            <a
              href="https://bulletins.psu.edu/undergraduate/colleges/intercollege/entrepreneurship-innovation-minor/#programrequirementstext"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-[#D5F44A] hover:underline"
            >
              <span>PSU Bulletin Spec</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Electives Banner */}
      <div className="mt-12 glass-panel p-6 rounded-xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono text-[#D5F44A] tracking-wider uppercase block mb-1">
            TECHNICAL ELECTIVES (CHOOSE ONE · 3 CREDITS)
          </span>
          <p className="text-sm text-white/80">
            <strong>EDSGN 367</strong> Design Thinking &bull; <strong>EDSGN 467</strong> Prototyping to Launch &bull; <strong>ENGR 408</strong> Leadership Principles &bull; <strong>ENGR 415</strong> Launching Innovation
          </p>
        </div>
        <a
          href="https://www.lionpath.psu.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-xs uppercase px-4 py-2.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold transition-colors whitespace-nowrap self-start md:self-center"
        >
          <span>Declare in LionPATH</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
