import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Award, Compass, Sparkles, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HUGE, HIGH-IMPACT PRINCETON REVIEW FEATURE CARD */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/90 via-[#071d43]/90 to-[#041026]/95 border-2 border-blue-400/40 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            
            {/* The Badge Image (Significantly Enlarged) */}
            <div className="shrink-0 p-2 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
              <img
                src="/images/princeton-review-ranking.png"
                alt="Princeton Review Top 50 Undergrad Entrepreneurship Program"
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain rounded-xl drop-shadow-2xl"
              />
            </div>

            {/* Clear, Readable Headline Copy */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs sm:text-sm font-mono font-bold uppercase tracking-wider mb-2">
                <Award className="w-4 h-4" />
                <span>Nationally Ranked Program</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug mb-2">
                Top 50 Undergraduate Entrepreneurship Programs
              </h2>

              <p className="text-base sm:text-xl font-bold text-[#D5F44A] mb-2 font-mono">
                Ranked #23 in the Nation &bull; #5 in the Northeast
              </p>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal">
                Recognized by <span className="font-semibold text-white">The Princeton Review</span> and <span className="font-semibold text-white">Entrepreneur Magazine</span>. 
                Penn State's Engineering Entrepreneurship program equips engineers with hands-on venture development, prototyping, and leadership skills.
              </p>
            </div>

          </div>
        </div>

        {/* Main Hero Header */}
        <div className="max-w-4xl">
          
          <div className="flex items-center gap-3.5 mb-4">
            <span className="text-xs sm:text-sm uppercase tracking-widest font-mono font-bold text-[#D5F44A] bg-[#D5F44A]/10 px-3 py-1 rounded-md border border-[#D5F44A]/20">
              Product Innovation Cluster
            </span>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-white/60">
              <MapPin className="w-3.5 h-3.5 text-[#D5F44A]" />
              <span>EDI Building Room 319</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.08] mb-6">
            Build Real Hardware.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D5F44A] via-white to-[#D4AF37]">
              Launch Tech Ventures.
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-white/85 font-normal leading-relaxed max-w-3xl mb-10">
            E-SHIP is the College of Engineering's official Product Innovation cluster at Penn State. 
            We teach engineers to design physical hardware, calculate unit economics, build circuit prototypes, 
            and bring technology products to commercial market.
          </p>

          {/* Action CTAs (Mobile Friendly, Large Tap Targets) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
            <Link
              to="/curriculum"
              className="px-8 py-4 rounded-xl bg-[#D5F44A] text-[#041026] font-mono text-sm sm:text-base font-extrabold uppercase tracking-wider hover:bg-[#c2e239] transition-all transform active:scale-95 shadow-xl shadow-[#D5F44A]/15 text-center flex items-center justify-center gap-2"
            >
              <span>Explore 6-Course Sequence</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/programs"
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-sm sm:text-base font-bold uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2"
            >
              <span>$500 Seed Grant & Certificate</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#061838]/80 border border-white/10">
            <div className="text-2xl sm:text-3xl font-mono font-black text-[#D5F44A] mb-1">#23</div>
            <div className="text-xs sm:text-sm font-mono text-white/70 uppercase">Princeton Review US Rank</div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-[#061838]/80 border border-white/10">
            <div className="text-2xl sm:text-3xl font-mono font-black text-white mb-1">$500</div>
            <div className="text-xs sm:text-sm font-mono text-white/70 uppercase">Seed Grant per Team</div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-[#061838]/80 border border-white/10">
            <div className="text-2xl sm:text-3xl font-mono font-black text-[#D4AF37] mb-1">150 Hrs</div>
            <div className="text-xs sm:text-sm font-mono text-white/70 uppercase">Paid ENtern Internship</div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-[#061838]/80 border border-white/10">
            <div className="text-2xl sm:text-3xl font-mono font-black text-white mb-1">Rm 319</div>
            <div className="text-xs sm:text-sm font-mono text-white/70 uppercase">EDI Building Office</div>
          </div>
        </div>

      </div>
    </section>
  );
};
