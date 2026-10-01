import React from 'react';
import { Layers, CheckCircle2, ShieldCheck, Factory, Zap } from 'lucide-react';

export const EngineeringCluster: React.FC = () => {
  return (
    <section id="engineering-cluster" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] tracking-wider uppercase mb-3">
            <Layers className="w-4 h-4" />
            <span>01 // THE CORE FOCUS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tightest">
            ENGINEERING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D5F44A] to-white">
              ENTREPRENEURSHIP.
            </span>
          </h2>
        </div>
        <p className="text-[#8FA1B7] max-w-md text-sm sm:text-base leading-relaxed font-normal">
          E-SHIP is not a generic business program. It is the College of Engineering's official Product Innovation cluster—designed specifically for engineers who want to commercialize real technology.
        </p>
      </div>

      {/* Distinction Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="glass-panel p-8 rounded-xl relative overflow-hidden group hover:border-[#D5F44A]/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-[#164CFF]/20 border border-[#164CFF]/40 text-[#0084FF] flex items-center justify-center font-mono font-bold mb-6">
            <Factory className="w-5 h-5 text-[#D5F44A]" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
            Physical & Deep-Tech Prototyping
          </h3>
          <p className="text-sm text-[#8FA1B7] leading-relaxed mb-6">
            Build with the Penn State Learning Factory and Maker Commons. E-SHIP students develop actual mechanical assemblies, printed circuit boards (PCBs), firmware, and IoT devices—not just pitch slide decks.
          </p>
          <ul className="space-y-2.5 text-xs font-mono text-white/80 border-t border-white/10 pt-4">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>Rapid 3D Print & CNC Machine Access</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>Full Hardware Fabrication Labs</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>Embedded Sensor & IoT Integration</span>
            </li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="glass-panel p-8 rounded-xl relative overflow-hidden group hover:border-[#D5F44A]/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-[#D5F44A]/20 border border-[#D5F44A]/40 text-[#D5F44A] flex items-center justify-center font-mono font-bold mb-6">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
            Real Unit Economics & IP
          </h3>
          <p className="text-sm text-[#8FA1B7] leading-relaxed mb-6">
            Learn Bill of Materials (BOM) cost modeling, manufacturing tolerances, supply chain bottlenecks, patent landscape analysis, and hardware-enabled SaaS subscription mechanics.
          </p>
          <ul className="space-y-2.5 text-xs font-mono text-white/80 border-t border-white/10 pt-4">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>BOM & Tooling Cost Projections</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>Intellectual Property & Licensing</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>Contract Manufacturer (CM) Evaluation</span>
            </li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="glass-panel p-8 rounded-xl relative overflow-hidden group hover:border-[#D5F44A]/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-[#164CFF]/20 border border-[#164CFF]/40 text-[#0084FF] flex items-center justify-center font-mono font-bold mb-6">
            <ShieldCheck className="w-5 h-5 text-[#D5F44A]" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
            The Product Innovation Cluster
          </h3>
          <p className="text-sm text-[#8FA1B7] leading-relaxed mb-6">
            Part of the official Penn State Bulletin for the ENTI Minor. 18–20 credits total, easily integrated into any engineering degree (MechE, EE, CompSci, Industrial, BioE, Aero) without adding semesters.
          </p>
          <ul className="space-y-2.5 text-xs font-mono text-white/80 border-t border-white/10 pt-4">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>9 Credits Engineering Core</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>9 Credits Product Innovation Focus</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>Overlap With Technical Electives</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
