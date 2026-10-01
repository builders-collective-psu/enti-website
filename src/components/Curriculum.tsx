import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, CheckCircle2, Cpu, Wrench, BarChart3, Rocket, Compass, Zap, ExternalLink } from 'lucide-react';

interface Course {
  code: string;
  title: string;
  credits: string;
  stage: string;
  subtitle: string;
  description: string;
  prereq: string;
  keyDeliverable: string;
  skills: string[];
  icon: any;
}

const courseChain: Course[] = [
  {
    code: 'MGMT 215',
    title: 'Entrepreneurial Mindset',
    credits: '3 Credits',
    stage: 'Stage 01 // Foundation',
    subtitle: 'Opportunity Recognition and Creative Problem Solving',
    description: 'Foundational exploration of the entrepreneurial mindset. Students learn to spot real market friction, evaluate problem spaces, conduct user empathy interviews, and test assumptions before building.',
    prereq: 'None. Open to all students.',
    keyDeliverable: 'Customer problem validation study and initial opportunity memo.',
    skills: ['Problem Discovery', 'Empathy Interviews', 'Market Sizing', 'Design Thinking'],
    icon: Compass,
  },
  {
    code: 'ENGR 310',
    title: 'Entrepreneurial Leadership',
    credits: '3 Credits',
    stage: 'Stage 02 // Leadership',
    subtitle: 'High-Performance Team Leadership and Vision',
    description: 'Focuses on leading teams through high technical uncertainty. Covers personal leadership styles, team formation, conflict resolution, equity expectations, and driving project velocity.',
    prereq: 'Sophomore standing or MGMT 215.',
    keyDeliverable: 'Personal founder leadership roadmap and team charter.',
    skills: ['Team Dynamics', 'Conflict Resolution', 'Agile Execution', 'Vision Setting'],
    icon: Zap,
  },
  {
    code: 'ENGR 407',
    title: 'Technology-Based Entrepreneurship',
    credits: '3 Credits',
    stage: 'Stage 03 // Physical Prototyping',
    subtitle: 'Rapid Prototyping and the GameDay Ventures Challenge',
    description: 'Hands-on hardware sprint. Student teams design, 3D print, and fabricate physical products in the Learning Factory. Concludes with live user field testing at the annual Beaver Stadium GameDay tailgate competition.',
    prereq: 'ENGR 310 or instructor approval.',
    keyDeliverable: 'Working functional physical prototype tested live by actual users.',
    skills: ['CAD/CAM Modeling', '3D Printing & CNC', 'Rapid Iteration', 'GameDay User Testing'],
    icon: Wrench,
  },
  {
    code: 'ENGR 411',
    title: 'Business Basics for Entrepreneurs',
    credits: '3 Credits',
    stage: 'Stage 04 // Unit Economics & Global Trek',
    subtitle: 'Financial Modeling, IP, and Embedded Asia Study Abroad',
    description: 'Unit economics, Bill of Materials (BOM) cost projection, cash flow management, and patent analysis. Includes the embedded global study trek to South Korea (Seoul) and Taiwan visiting TSMC, Hanyang University, and tech accelerators.',
    prereq: 'ENGR 310 or junior standing.',
    keyDeliverable: 'Full 3-year BOM unit economics model and IP filing brief.',
    skills: ['BOM Cost Modeling', 'Patent Landscaping', 'Global Supply Chain', 'Cash Flow Analysis'],
    icon: BarChart3,
  },
  {
    code: 'ENGR 415',
    title: 'Technology Launch & Commercialization',
    credits: '3 Credits',
    stage: 'Stage 05 // Scaling & GTM',
    subtitle: 'Go-to-Market Strategy and Manufacturing Scale',
    description: 'Bridges engineering prototypes to real production. Covers vendor qualification, contract manufacturing agreements, regulatory compliance (FCC, CE, UL), and customer acquisition channels.',
    prereq: 'ENGR 407 or ENGR 411.',
    keyDeliverable: 'Commercialization launch dossier and manufacturing vendor agreement.',
    skills: ['Contract Manufacturing', 'Regulatory Compliance', 'Go-To-Market', 'Distribution Channels'],
    icon: Cpu,
  },
  {
    code: 'ENGR 425',
    title: 'New Venture Creation',
    credits: '3 Credits',
    stage: 'Stage 06 // Capstone Venture Launch',
    subtitle: 'Venture Pitch, Angel Defense, and Incubator Transition',
    description: 'The capstone venture laboratory. Teams refine viable technology businesses, pitch to active angel investors and venture capitalists, and prepare for entry into Happy Valley LaunchBox or Summer Founders.',
    prereq: 'ENGR 407, 411, or 415.',
    keyDeliverable: 'Formal investor pitch deck, legal corporate structure, and demo day launch.',
    skills: ['Investor Defense', 'Cap Table Architecture', 'Seed Pitching', 'Accelerator Transition'],
    icon: Rocket,
  },
];

export const Curriculum: React.FC = () => {
  const [expandedCode, setExpandedCode] = useState<string | null>('ENGR 310');

  const toggleCourse = (code: string) => {
    setExpandedCode((prev) => (prev === code ? null : code));
  };

  return (
    <section id="curriculum" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] tracking-wider uppercase mb-3">
            <BookOpen className="w-4 h-4" />
            <span>02 / The Curriculum Chain</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase">
            Curriculum Sequence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#D4AF37]">
              From Concept to Scale
            </span>
          </h2>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <span className="font-mono text-xs text-white/60 uppercase">ENTI Product Innovation Pathway</span>
          <span className="font-mono font-bold text-xs text-[#D5F44A] px-3 py-1 bg-[#D5F44A]/10 border border-[#D5F44A]/30 rounded">
            6 Courses // 18-20 Credits Total
          </span>
        </div>
      </div>

      {/* Progress Chain Indicator */}
      <div className="hidden lg:flex items-center justify-between gap-2 mb-10 px-4 py-3 rounded-lg bg-white/[0.03] border border-white/5 font-mono text-xs text-white/60">
        <span className="text-[#D5F44A] font-bold">1. MGMT 215</span>
        <span>→</span>
        <span className="text-white font-bold">2. ENGR 310</span>
        <span>→</span>
        <span className="text-white font-bold">3. ENGR 407</span>
        <span>→</span>
        <span className="text-white font-bold">4. ENGR 411</span>
        <span>→</span>
        <span className="text-white font-bold">5. ENGR 415</span>
        <span>→</span>
        <span className="text-[#D4AF37] font-bold">6. ENGR 425</span>
      </div>

      {/* Course Chain with in-place Accordion Drawer */}
      <div className="space-y-4">
        {courseChain.map((course, index) => {
          const Icon = course.icon;
          const isExpanded = expandedCode === course.code;

          return (
            <div
              key={course.code}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? 'bg-[#061838] border-[#D5F44A] shadow-[0_0_30px_rgba(213,244,74,0.12)]'
                  : 'bg-[#041026]/80 hover:bg-[#061838]/80 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Clickable Course Header Card */}
              <div
                onClick={() => toggleCourse(course.code)}
                className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4 select-none"
              >
                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold shrink-0 transition-colors ${
                      isExpanded
                        ? 'bg-[#D5F44A] text-[#041026]'
                        : 'bg-white/10 text-white group-hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-sm sm:text-base font-extrabold text-white">
                        {course.code}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-white/70">
                        {course.credits}
                      </span>
                      <span className="text-xs font-mono text-[#D5F44A]">
                        {course.stage}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white/90 truncate">
                      {course.title}
                    </h3>
                    <p className="text-xs text-white/50 font-mono hidden sm:block truncate">
                      {course.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono text-white/50 hidden md:block">
                    {isExpanded ? 'Hide Details' : 'View Course Blueprint'}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                      isExpanded
                        ? 'bg-[#D5F44A] text-[#041026] border-[#D5F44A]'
                        : 'bg-white/5 text-white/70 border-white/10'
                    }`}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* In-Place Detail Drawer */}
              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-2 border-t border-white/10 bg-[#030d20]">
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#D5F44A] block mb-1">
                      Course Blueprint & Engineering Focus
                    </span>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {course.subtitle}
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed max-w-4xl">
                      {course.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 p-4 rounded-lg bg-white/[0.02] border border-white/5 font-mono text-xs">
                    <div>
                      <span className="text-white/40 uppercase block mb-1">Prerequisite</span>
                      <span className="text-white/90">{course.prereq}</span>
                    </div>
                    <div>
                      <span className="text-[#D5F44A] uppercase block mb-1">Key Deliverable</span>
                      <span className="text-white/90">{course.keyDeliverable}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-white/50 block mb-2">
                      Core Technical Competencies Mastered
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/90"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#D5F44A]" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
