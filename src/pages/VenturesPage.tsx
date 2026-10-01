import React from 'react';
import { VenturesAndBuilders } from '../components/VenturesAndBuilders';
import { Trophy, Flame, Play, ExternalLink } from 'lucide-react';

export const VenturesPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-32 pb-20 space-y-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/80 via-[#061838] to-[#041026] border border-blue-500/30">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#D5F44A] uppercase tracking-wider mb-3">
            <Trophy className="w-4 h-4" />
            <span>Field Prototyping & Student Community</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase mb-4">
            GameDay Ventures & Builders
          </h1>
          <p className="text-base sm:text-xl text-white/80 max-w-3xl leading-relaxed">
            Real hardware tested under game-day pressure. Explore the Beaver Stadium tailgate competition, 
            successful student spinouts like Whirl Pong, and the Penn State Builders Collective.
          </p>
        </div>
      </div>

      {/* Main Ventures and Builders Component */}
      <VenturesAndBuilders />

      {/* Featured GameDay Video Embed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#061838] border border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] uppercase mb-2">
            <Play className="w-4 h-4 fill-current" />
            <span>Official Video Feature</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Watch GameDay Ventures Live at Beaver Stadium
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mb-6">
            Produced by Kintsugi Web Studio, see how student teams bring their physical games from the machine shop to the stadium lots.
          </p>

          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              src="https://player.vimeo.com/video/997986054?app_id=122963&title=0&byline=0&portrait=0"
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              title="GameDay Ventures Video"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
