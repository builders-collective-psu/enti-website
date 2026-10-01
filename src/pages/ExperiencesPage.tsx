import React from 'react';
import { ExperiencesAndTreks } from '../components/ExperiencesAndTreks';
import { Globe, Camera, MapPin } from 'lucide-react';

export const ExperiencesPage: React.FC = () => {
  const photoGallery = [
    {
      src: '/images/korea-and-workshop-banner.png',
      caption: 'Penn State E-SHIP in Seoul, South Korea and SEDI Maker Labs',
      location: 'Seoul & University Park'
    },
    {
      src: '/images/sedi-tailgate.jpg',
      caption: 'GameDay Ventures tailgate game arena at Beaver Stadium',
      location: 'Beaver Stadium Lots'
    },
    {
      src: '/images/makerspace-students.jpg',
      caption: 'Hardware fabrication and testing in the Learning Factory',
      location: 'Engineering Design Labs'
    },
    {
      src: '/images/taiwan-trip-grace.jpg',
      caption: 'E-SHIP Taiwan semiconductor and hardware delegation',
      location: 'Taipei, Taiwan'
    },
    {
      src: '/images/exp-seoul-1.jpg',
      caption: 'Seoul tech accelerator visits and university exchange',
      location: 'Seoul, South Korea'
    },
    {
      src: '/images/nyc-trek.jpg',
      caption: 'New York City venture capital and startup founder trek',
      location: 'New York City, NY'
    },
    {
      src: '/images/sf-silicon-valley.jpg',
      caption: 'Upcoming Silicon Valley and Bay Area hardware expedition',
      location: 'San Francisco, CA'
    },
    {
      src: '/images/hardware-collab.jpg',
      caption: 'Hands-on electronic prototyping and embedded testing',
      location: 'EDI Building Rm 319'
    }
  ];

  return (
    <div className="pt-24 sm:pt-32 pb-20 space-y-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/80 via-[#061838] to-[#041026] border border-blue-500/30">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#D5F44A] uppercase tracking-wider mb-3">
            <Globe className="w-4 h-4" />
            <span>Global Study Abroad & Treks</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase mb-4">
            Experiences & Treks
          </h1>
          <p className="text-base sm:text-xl text-white/80 max-w-3xl leading-relaxed">
            Real engineering happens in the field. From embedded international treks in South Korea and Taiwan 
            to startup immersions in New York City and upcoming travel to Silicon Valley.
          </p>
        </div>
      </div>

      {/* Interactive Treks Section */}
      <ExperiencesAndTreks />

      {/* Authentic Photo Archive Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 text-sm font-mono text-[#D5F44A] tracking-wider uppercase mb-2">
          <Camera className="w-4 h-4" />
          <span>Student Photo Archive</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-8">
          Captured in the Field
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photoGallery.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl overflow-hidden bg-[#061838] border border-white/10 hover:border-[#D5F44A]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-white/90 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D5F44A]" />
                  <span>{item.location}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs sm:text-sm text-white/80 font-medium">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
