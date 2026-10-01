import React from 'react';
import { Layers, CheckCircle2, ShieldCheck, Factory, Zap, ExternalLink } from 'lucide-react';

export const EngineeringCluster: React.FC = () => {
  return (
    <section id="cluster" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] tracking-wider uppercase mb-3">
            <Layers className="w-4 h-4" />
            <span>01 / The Core Cluster</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase">
            ENTI Product Innovation <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D5F44A] via-white to-[#D4AF37]">
              Cluster Focus
            </span>
          </h2>
        </div>
        <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed font-normal">
          The Entrepreneurship and Innovation Minor (ENTI) offers multiple tracks across Penn State. 
          E-SHIP is the College of Engineering Product Innovation Cluster, designed specifically for students 
          who build and commercialize physical and digital technology.
        </p>
      </div>

      {/* Distinction Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Card 1 */}
        <div className="bg-[#061838]/70 border border-white/10 hover:border-[#D5F44A]/40 p-8 rounded-xl relative overflow-hidden group transition-all duration-300">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/40 text-[#D5F44A] flex items-center justify-center font-mono font-bold mb-6">
            <Factory className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white mb-3">
            Hardware & Rapid Prototyping
          </h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            Work directly inside the Penn State Learning Factory and the EDI Building Maker Commons. 
            Students fabricate real mechanical assemblies, printed circuit boards (PCBs), firmware, and IoT devices.
          </p>
          <ul className="space-y-2.5 text-xs font-mono text-white/80 border-t border-white/10 pt-4">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>Full CNC machining, 3D printing, and laser cutting</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>Embedded microcontrollers, sensors, and firmware</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>Direct access to EDI Building labs and tools</span>
            </li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="bg-[#061838]/70 border border-white/10 hover:border-[#D5F44A]/40 p-8 rounded-xl relative overflow-hidden group transition-all duration-300">
          <div className="w-10 h-10 rounded-lg bg-[#D5F44A]/10 border border-[#D5F44A]/30 text-[#D5F44A] flex items-center justify-center font-mono font-bold mb-6">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white mb-3">
            Unit Economics & BOM Modeling
          </h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            Understand how to scale an engineering product. Learn Bill of Materials (BOM) cost estimation, 
            supply chain risk, contract manufacturer evaluation, and patent protection.
          </p>
          <ul className="space-y-2.5 text-xs font-mono text-white/80 border-t border-white/10 pt-4">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>BOM and tooling cost projection</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>Contract manufacturing and vendor sourcing</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>Intellectual property and provisional patents</span>
            </li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="bg-[#061838]/70 border border-white/10 hover:border-[#D5F44A]/40 p-8 rounded-xl relative overflow-hidden group transition-all duration-300">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/40 text-[#D5F44A] flex items-center justify-center font-mono font-bold mb-6">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white mb-3">
            ENTI Minor Credentials
          </h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">
            Complete the 18 credit minor alongside any Penn State engineering major, 
            including Mechanical, Electrical, Computer Science, Industrial, Biomedical, and Aerospace.
          </p>
          <ul className="space-y-2.5 text-xs font-mono text-white/80 border-t border-white/10 pt-4">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>9 Credits Core Minor Requirements</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>9 Credits Product Innovation Cluster</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>Stacks cleanly into standard 4-year graduation plans</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Official Bulletin Link Banner */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-blue-950/60 to-[#061838]/80 border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D5F44A] uppercase tracking-wider">
            Official Academic Bulletin
          </span>
          <h4 className="text-base font-bold text-white">
            Entrepreneurship and Innovation Minor (ENTI): Product Innovation Cluster
          </h4>
          <p className="text-xs text-white/60 font-mono mt-0.5">
            Administered by the School of Engineering Design and Innovation (SEDI), Penn State College of Engineering.
          </p>
        </div>
        <a
          href="https://bulletins.psu.edu/undergraduate/colleges/intercollege/entrepreneurship-innovation-minor/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-colors whitespace-nowrap"
        >
          <span>View Penn State Bulletin</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
