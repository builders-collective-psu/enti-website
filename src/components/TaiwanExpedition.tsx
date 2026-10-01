import React from 'react';
import { Globe, MapPin, ExternalLink, Factory, Cpu, Building2 } from 'lucide-react';

export const TaiwanExpedition: React.FC = () => {
  return (
    <section id="taiwan" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] tracking-wider uppercase mb-3">
            <Globe className="w-4 h-4" />
            <span>05 // GLOBAL PERSPECTIVES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tightest">
            STATE COLLEGE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D5F44A] to-white">
              TO TAIPEI.
            </span>
          </h2>
        </div>
        <div className="flex flex-col items-start md:items-end gap-1 font-mono text-xs text-[#8FA1B7]">
          <span className="flex items-center gap-1.5 text-white">
            <MapPin className="w-3.5 h-3.5 text-[#D5F44A]" />
            <span>TAIPEI TECH &bull; HSINCHU SCIENCE PARK</span>
          </span>
          <span>EMBEDDED GLOBAL HARDWARE PROGRAM</span>
        </div>
      </div>

      {/* Main Feature Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
        {/* Photo Card 1: Grace Bonnell at TSMC */}
        <div className="lg:col-span-7 glass-panel rounded-2xl overflow-hidden border border-white/10 relative group min-h-[420px] flex flex-col justify-end p-8">
          <img
            src="/images/taiwan-trip-grace.jpg"
            alt="Penn State student Grace Bonnell at the TSMC Museum of Innovation in Taiwan"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041026] via-[#041026]/60 to-transparent" />

          <div className="relative z-10 max-w-xl">
            <span className="px-2.5 py-1 rounded bg-[#D5F44A] text-[#041026] font-mono text-xs font-bold uppercase inline-block mb-3">
              TSMC MUSEUM OF INNOVATION // HSINCHU
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Inside the Semiconductor Capital of the World
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Industrial engineering sophomore Grace Bonnell and E-SHIP cohort members examining the fabrication infrastructure powering global AI chips, microelectronics, and silicon supply chains.
            </p>
          </div>
        </div>

        {/* Photo Card 2: Student Cohort Partner Visits */}
        <div className="lg:col-span-5 glass-panel rounded-2xl overflow-hidden border border-white/10 relative group min-h-[420px] flex flex-col justify-end p-8">
          <img
            src="/images/taiwan-trip-1.jpg"
            alt="Penn State students on company visits in Taiwan"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041026] via-[#041026]/70 to-transparent" />

          <div className="relative z-10">
            <span className="px-2.5 py-1 rounded bg-[#164CFF] text-white font-mono text-xs font-bold uppercase inline-block mb-3">
              MANUFACTURING & TECH
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Global Ecosystem Immersion
            </h3>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Direct access to engineering teams, contract electronics manufacturers, and international accelerators.
            </p>
            <div className="text-[11px] font-mono text-[#D5F44A]">
              FACULTY LEADS: TED GRAEF, BRAD GROZNIK, ANGELA ROTHROCK
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Partner Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-white/10">
          <Cpu className="w-5 h-5 text-[#D5F44A] mb-3" />
          <h4 className="font-bold text-white text-sm mb-1">TSMC</h4>
          <p className="text-xs text-[#8FA1B7]">Advanced silicon fab & foundry technology in Hsinchu.</p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-white/10">
          <Factory className="w-5 h-5 text-[#D5F44A] mb-3" />
          <h4 className="font-bold text-white text-sm mb-1">OnLogic & TAILYN</h4>
          <p className="text-xs text-[#8FA1B7]">Industrial PC design, ruggedized hardware, and electronic manufacturing.</p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-white/10">
          <Building2 className="w-5 h-5 text-[#D5F44A] mb-3" />
          <h4 className="font-bold text-white text-sm mb-1">Taiwan Tech Arena (TTA)</h4>
          <p className="text-xs text-[#8FA1B7]">Venture incubators, cross-border accelerators, and deep-tech founders.</p>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-white/10">
          <Globe className="w-5 h-5 text-[#D5F44A] mb-3" />
          <h4 className="font-bold text-white text-sm mb-1">National Taipei Tech</h4>
          <p className="text-xs text-[#8FA1B7]">Academic exchanges and joint technology demonstrations with Taiwanese peers.</p>
        </div>
      </div>
    </section>
  );
};
