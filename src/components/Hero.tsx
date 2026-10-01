import React, { useState } from 'react';
import { ArrowDown, Play, Sparkles, ShieldCheck, Layers, Cpu, X } from 'lucide-react';

export const Hero: React.FC = () => {
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const videos = [
    {
      id: '896007882',
      title: 'Program Overview: Engineering Entrepreneurship',
      tag: 'The E-SHIP Pitch',
      source: 'Penn State Engineering',
    },
    {
      id: '855090940',
      title: 'EDI Building Virtual Tour',
      tag: 'Facilities & Labs',
      source: 'Penn State Engineering',
    },
    {
      id: '997986054',
      title: 'GameDay Ventures: Beaver Stadium Tailgate Games',
      tag: 'Student Fabrication',
      source: 'Kintsugi Web Studio',
    },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges: Princeton Review Ranking & Cluster Tag */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Princeton Review Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-950/80 to-[#041026]/90 border border-blue-500/30 px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md">
            <img
              src="/images/princeton-review-ranking.png"
              alt="Princeton Review Top 50 Undergrad Entrepreneurship Program"
              className="w-7 h-7 object-contain rounded"
            />
            <div className="flex items-center gap-1.5 text-xs font-mono text-white/90">
              <span className="text-[#D4AF37] font-bold">Top 50 Nationwide</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">#23 in US / #5 in Northeast</span>
            </div>
          </div>

          {/* Cluster Tag */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-mono text-white/80">
            <span className="w-2 h-2 rounded-full bg-[#D5F44A] animate-pulse" />
            <span>Product Innovation Cluster</span>
          </div>

          <div className="text-xs font-mono text-white/50">
            School of Engineering Design and Innovation (SEDI)
          </div>
        </div>

        {/* Hero Title & Brutalist Copy */}
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/images/eship-logo-gold.png"
              alt="E-SHIP Gold Logo"
              className="w-14 h-14 object-contain rounded-xl border border-[#D4AF37]/40 shadow-xl"
            />
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-[#D5F44A]">
                College of Engineering
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white/90">
                Engineering Entrepreneurship
              </h2>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.05] mb-6">
            Build Hardware.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D5F44A] via-white to-[#D4AF37]">
              Launch Ventures.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed max-w-2xl mb-8">
            Engineering Entrepreneurship (E-SHIP) is the technical product innovation cluster at Penn State. 
            We teach engineers to design real physical products, master CAD, build electronics, calculate bill of materials (BOM), 
            and take technology ventures from prototype to market.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <a
              href="#curriculum"
              className="px-6 py-3.5 rounded bg-[#D5F44A] text-[#041026] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#c2e239] transition-all transform active:scale-95 shadow-lg shadow-[#D5F44A]/10"
            >
              Explore Course Sequence
            </a>
            <a
              href="#grants"
              className="px-6 py-3.5 rounded bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all"
            >
              Product Innovation Grant ($500)
            </a>
            <button
              onClick={() => setActiveVideoModal('896007882')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded bg-blue-600/30 hover:bg-blue-600/40 border border-blue-400/30 text-white font-mono text-xs uppercase tracking-wider transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Pitch Video</span>
            </button>
          </div>
        </div>

        {/* Video Feature Tray */}
        <div id="videos" className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D5F44A]" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/60">
                Official Video Spotlights
              </span>
            </div>
            <span className="text-xs font-mono text-white/40">
              Click to stream full video
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setActiveVideoModal(vid.id)}
                className="group relative bg-[#061838]/80 hover:bg-[#08224e]/90 border border-white/10 hover:border-[#D5F44A]/40 rounded-xl p-4 cursor-pointer transition-all duration-300 shadow-md backdrop-blur-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#D5F44A]/10 text-[#D5F44A] border border-[#D5F44A]/20">
                    {vid.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#D5F44A] group-hover:text-[#041026] text-white transition-colors">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>
                <h4 className="font-mono text-sm font-semibold text-white group-hover:text-[#D5F44A] transition-colors mb-1 line-clamp-2">
                  {vid.title}
                </h4>
                <p className="text-xs text-white/50 font-mono">
                  {vid.source}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics Strip */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-2xl font-mono font-bold text-white mb-0.5">#23</div>
            <div className="text-xs font-mono text-white/50 uppercase">Princeton Review US Rank</div>
          </div>
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-2xl font-mono font-bold text-[#D5F44A] mb-0.5">$500</div>
            <div className="text-xs font-mono text-white/50 uppercase">Seed Grant per Team</div>
          </div>
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-2xl font-mono font-bold text-white mb-0.5">150 Hrs</div>
            <div className="text-xs font-mono text-white/50 uppercase">Paid ENtern Internship</div>
          </div>
          <div className="p-4 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="text-2xl font-mono font-bold text-[#D4AF37] mb-0.5">Rm 319</div>
            <div className="text-xs font-mono text-white/50 uppercase">EDI Building Office</div>
          </div>
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#041026] border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="text-xs font-mono text-white/70">
                Penn State E-SHIP Video Player
              </span>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://player.vimeo.com/video/${activeVideoModal}?autoplay=1&title=0&byline=0&portrait=0`}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Vimeo Video Player"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
