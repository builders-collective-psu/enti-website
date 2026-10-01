import React, { useState } from 'react';
import { Globe, Plane, MapPin, Building2, Cpu, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

interface Trek {
  id: string;
  destination: string;
  region: string;
  type: string;
  status: 'Completed' | 'Upcoming';
  summary: string;
  image: string;
  highlights: string[];
}

const treks: Trek[] = [
  {
    id: 'korea',
    destination: 'Seoul, South Korea',
    region: 'East Asia',
    type: 'ENGR 411 Embedded Study Abroad',
    status: 'Completed',
    summary: 'Students traveled to Seoul to tour Hanyang University (often referred to as the MIT of Korea), visit startup accelerators including Seoul Startup Hub and Mobidoo, engage in K-Pop cultural classes, and explore Bukchon Hanok Village.',
    image: '/images/exp-seoul-1.jpg',
    highlights: [
      'Hanyang University campus and technology exchange',
      'Seoul Startup Hub and Mobidoo accelerator visits',
      'Korean culinary workshops and cultural immersion',
      'Bukchon Hanok Village architectural tour'
    ]
  },
  {
    id: 'taiwan',
    destination: 'Taipei & Hsinchu, Taiwan',
    region: 'East Asia',
    type: 'Global Hardware Supply Chain',
    status: 'Completed',
    summary: 'A direct deep-dive into the epicenter of the global semiconductor and electronics manufacturing ecosystem. Students toured TSMC facilities, Taipei Tech labs, Tailyn Technologies assembly lines, and OnLogic international offices.',
    image: '/images/taiwan-trip-grace.jpg',
    highlights: [
      'TSMC semiconductor fab operations and lithography briefings',
      'Taipei Tech university innovation labs and student exchanges',
      'Tailyn Technologies surface-mount assembly lines',
      'OnLogic global embedded systems manufacturing facility'
    ]
  },
  {
    id: 'nyc',
    destination: 'New York City, New York',
    region: 'United States',
    type: 'Venture Capital & Tech Trek',
    status: 'Completed',
    summary: 'An intensive domestic trek connecting E-SHIP students with prominent venture capital firms, high-growth technology startups, and Penn State engineering alumni founders across Manhattan and Brooklyn.',
    image: '/images/nyc-trek.jpg',
    highlights: [
      'Top-tier venture capital fund partner discussions',
      'High-growth SaaS and hardware startup office sessions',
      'Penn State alumni founder roundtables',
      'Customer discovery in the Northeast commercial market'
    ]
  },
  {
    id: 'sf',
    destination: 'San Francisco & Silicon Valley, California',
    region: 'United States',
    type: 'Deep Tech & Frontier Hardware',
    status: 'Upcoming',
    summary: 'Upcoming trek to the global capital of venture-backed technology. Students will meet with leading Bay Area hardware incubators, artificial intelligence labs, and enterprise technology founders.',
    image: '/images/sf-silicon-valley.jpg',
    highlights: [
      'Bay Area hardware accelerators and maker incubators',
      'Meetings with venture capital investment teams',
      'Penn State alumni tech leaders in Silicon Valley',
      'Visits to generative AI and robotic engineering startups'
    ]
  }
];

export const ExperiencesAndTreks: React.FC = () => {
  const [activeTrek, setActiveTrek] = useState<Trek>(treks[0]);

  return (
    <section id="experiences" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] tracking-wider uppercase mb-3">
            <Globe className="w-4 h-4" />
            <span>04 / Global & Domestic Treks</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase">
            Global Immersion <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#D4AF37]">
              Real World Experiences
            </span>
          </h2>
        </div>
        <p className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed font-normal">
          Engineering is global. E-SHIP embeds students directly into international technology ecosystems 
          in South Korea and Taiwan, alongside domestic venture treks to New York City and upcoming travel to Silicon Valley.
        </p>
      </div>

      {/* Featured Banner: Uploaded Banner Photo */}
      <div className="mb-14 rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative group">
        <img
          src="/images/korea-and-workshop-banner.png"
          alt="Penn State E-SHIP in South Korea and Prototyping Labs"
          className="w-full h-auto object-cover max-h-[360px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041026] via-transparent to-transparent flex items-end p-6">
          <div className="flex flex-wrap items-center justify-between w-full gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#D5F44A] text-[#041026] font-bold">
                Student Archive
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                From Seoul Alleyways to Beaver Stadium Tailgates and Maker Labs
              </h3>
            </div>
            <span className="text-xs font-mono text-white/70 hidden sm:block">
              Embedded ENGR 411 Treks & SEDI Design Workshops
            </span>
          </div>
        </div>
      </div>

      {/* Trek Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {treks.map((trek) => {
          const isSelected = activeTrek.id === trek.id;
          return (
            <button
              key={trek.id}
              onClick={() => setActiveTrek(trek)}
              className={`p-4 rounded-xl text-left font-mono border transition-all duration-300 ${
                isSelected
                  ? 'bg-[#061838] border-[#D5F44A] shadow-[0_0_20px_rgba(213,244,74,0.15)]'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 text-white/70 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wider text-white/50">
                  {trek.region}
                </span>
                <span
                  className={`text-[9px] uppercase px-1.5 py-0.5 rounded ${
                    trek.status === 'Upcoming'
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                      : 'bg-blue-500/20 text-[#D5F44A] border border-blue-500/30'
                  }`}
                >
                  {trek.status}
                </span>
              </div>
              <div className="text-sm font-bold text-white truncate">
                {trek.destination}
              </div>
              <div className="text-[11px] text-white/40 truncate mt-0.5">
                {trek.type}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Trek Detailed Showcase */}
      <div className="bg-[#061838]/80 border border-white/10 rounded-2xl overflow-hidden p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Trek Image */}
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3]">
            <img
              src={activeTrek.image}
              alt={activeTrek.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-[#041026]/90 border border-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>{activeTrek.destination}</span>
            </div>
          </div>

          {/* Trek Information */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-[#D5F44A] uppercase tracking-wider">
                  {activeTrek.type}
                </span>
                <span className="text-white/30">•</span>
                <span className="text-xs font-mono text-white/50 uppercase">
                  {activeTrek.region}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {activeTrek.destination}
              </h3>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                {activeTrek.summary}
              </p>

              <div className="space-y-2 mb-6">
                <span className="text-xs font-mono uppercase text-white/50 block">
                  Key Itinerary & Academic Highlights:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeTrek.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs font-mono text-white/90 flex items-start gap-2"
                    >
                      <span className="text-[#D5F44A] font-bold">0{i + 1}</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-white/50">
                Coordinated through SEDI & the College of Engineering
              </span>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-[#D5F44A] hover:underline"
              >
                <span>Ask about upcoming travel applications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
