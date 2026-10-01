import React from 'react';
import { Award, DollarSign, Briefcase, Calendar, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ProgramsAndGrants: React.FC = () => {
  return (
    <section id="grants" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] tracking-wider uppercase mb-3">
            <Award className="w-4 h-4" />
            <span>03 / Credentials & Seed Capital</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase">
            Certificate, Grants <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D5F44A] via-white to-[#D4AF37]">
              & The ENtern Program
            </span>
          </h2>
        </div>
        <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed font-normal">
          Beyond coursework, E-SHIP provides direct equity-free seed grants, standalone certificate credentials, 
          paid startup internships, and campus-wide events.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* Card 1: Product Innovation Entrepreneurship Certificate */}
        <div className="bg-[#061838]/80 border border-white/10 hover:border-[#D5F44A]/40 p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-blue-500/20 text-[#D5F44A] border border-blue-500/30">
                Standalone Credential
              </span>
              <span className="text-xs font-mono text-white/50">9 Credits Total</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Product Innovation Entrepreneurship Certificate
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              A focused three-course program designed to demonstrate your ability to innovate within engineering firms 
              or launch independent ventures. Available to all undergraduate students at Penn State.
            </p>

            <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs mb-6">
              <div className="text-white/90">
                <span className="text-[#D5F44A] font-bold">Required Course (3 cr):</span> ENGR 411 (Business Fundamentals for Entrepreneurs)
              </div>
              <div className="text-white/90">
                <span className="text-[#D4AF37] font-bold">Select Two Courses (6 cr):</span> ENGR 310, ENGR 407, or ENGR 415
              </div>
            </div>

            <ul className="space-y-2 text-xs font-mono text-white/80 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
                <span>Recorded officially on your Penn State academic transcript</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
                <span>Compatible with all College of Engineering departmental majors</span>
              </li>
            </ul>
          </div>

          <a
            href="https://bulletins.psu.edu/undergraduate/colleges/engineering/product-innovation-entrepreneurship-certificate/#programrequirementstext"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-colors"
          >
            <span>View Certificate Bulletin Requirements</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Card 2: The Product Innovation Grant Program */}
        <div className="bg-[#061838]/80 border border-white/10 hover:border-[#D5F44A]/40 p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between transition-all duration-300">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-[#D5F44A]/10 text-[#D5F44A] border border-[#D5F44A]/30">
                Seed Funding
              </span>
              <span className="text-xs font-mono text-white/50">Up to $500 Per Team</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              The Product Innovation Grant Program
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Do you have a project or technical concept that could become a real company? 
              This program provides up to $500 per team in equity-free capital to cover essential early startup costs.
            </p>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs mb-6">
              <div>
                <span className="text-white/40 block mb-0.5">Approved Uses</span>
                <span className="text-white/80">3D prints, sensors, circuit boards, tools</span>
              </div>
              <div>
                <span className="text-white/40 block mb-0.5">Next Stage Goal</span>
                <span className="text-white/80">LaunchBox FastTrack & Summer Founders</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs font-mono text-white/80 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
                <span>Eligibility: Enrolled in or completed ENGR 310</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
                <span>Non-dilutive micro-grant with rapid review turnaround</span>
              </li>
            </ul>
          </div>

          <a
            href="https://pennstate.qualtrics.com/jfe/form/SV_2gdNylnJOKQFIBE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#D5F44A] hover:bg-[#c2e239] text-[#041026] text-xs font-mono font-bold uppercase transition-colors shadow-md shadow-[#D5F44A]/10"
          >
            <span>Apply via Qualtrics Grant Form</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Grid Row 2: ENtern Program & Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Card 3: The ENtern Entrepreneurship Intern Program */}
        <div className="bg-[#061838]/60 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] uppercase mb-3">
              <Briefcase className="w-4 h-4" />
              <span>Paid Startup Experience</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              The ENtern Entrepreneurship Intern Program
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Real startups. Real experience. Real impact. E-SHIP matches students with early-stage ventures 
              from Happy Valley LaunchBox FastTrack, Summer Founders, and Ben Franklin Technology Partners.
            </p>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs space-y-2 mb-6">
              <div className="text-white/80">
                <span className="text-[#D5F44A] font-bold">150 Hour Commitment:</span> Complete structured project deliverables with founder mentorship.
              </div>
              <div className="text-white/80">
                <span className="text-white font-bold">Financial Stipend:</span> Students receive an award upon submission of mid-term and final learning reflections.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-colors"
            >
              <span>Student Application Info</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://sites.psu.edu/entern/sponsor-submission-form/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/70 hover:text-white transition-colors"
            >
              <span>Business Sponsor Submission Form</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Card 4: Events, Startup Week & EIR */}
        <div className="bg-[#061838]/60 border border-white/10 p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase mb-3">
              <Calendar className="w-4 h-4" />
              <span>Events & Community</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Penn State Startup Week & Annual Events
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Engage with world-class founders, venture investors, and technology leaders right here in Happy Valley.
            </p>

            <div className="space-y-3 font-mono text-xs text-white/80 mb-6">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-[#D5F44A] font-bold block mb-0.5">Penn State Startup Week</span>
                <span>University-wide celebration featuring keynote founders, pitch competitions, and student prototype expos.</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-[#D4AF37] font-bold block mb-0.5">GameDay Tailgate Competition</span>
                <span>ENGR 407 tailgate game tournament at Beaver Stadium with live judging and community participation.</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-white font-bold block mb-0.5">Entrepreneurs-in-Residence (EIR)</span>
                <span>Direct mentorship from alumni founders like Cassandra Sotos (AmpRX) and Darell Alston (Bungee Obleceni).</span>
              </div>
            </div>
          </div>

          <a
            href="https://startupweek.psu.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-colors"
          >
            <span>Learn More About Penn State Startup Week</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </section>
  );
};
