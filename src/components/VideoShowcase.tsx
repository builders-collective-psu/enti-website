import React, { useState } from 'react';
import { Play, Sparkles, ExternalLink, Video } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  creator: string;
  description: string;
  thumbnail: string;
}

const videoList: VideoItem[] = [
  {
    id: '896007882',
    title: 'Engineering Entrepreneurship Overview',
    subtitle: 'Why Product Innovation Matters for Engineers',
    category: 'The E-SHIP Pitch',
    creator: 'Penn State Engineering',
    description: 'Learn why students from mechanical, electrical, computer science, and industrial engineering join E-SHIP to build physical products and launch real companies.',
    thumbnail: 'https://i.vimeocdn.com/video/1771013397-6662821bdbce6a6aef0b2156150dcc3c51356aae90aba7ae7e2e8e7d522fcc01-d_640x360.jpg'
  },
  {
    id: '855090940',
    title: 'EDI Building Virtual Tour',
    subtitle: 'Inside the Labs, Maker Commons, and Classrooms',
    category: 'Facilities & Labs',
    creator: 'Penn State Engineering',
    description: 'Tour the state-of-the-art Engineering Design and Innovation (EDI) Building at University Park, home to the E-SHIP program in Room 319.',
    thumbnail: 'https://i.vimeocdn.com/video/1713612152-0cad2f5db318aa1a731728165bb4a7d027e65b558c15b3c63c693d17965fe33d-d_640x360.jpg'
  },
  {
    id: '997986054',
    title: 'GameDay Ventures: Beaver Stadium Tailgate Games',
    subtitle: 'Student Prototyping and Tailgate Field Tests',
    category: 'Student Fabrication',
    creator: 'Kintsugi Web Studio',
    description: 'Watch ENGR 407 engineering students design, fabricate, and test original physical tailgate games live with real fans at Beaver Stadium.',
    thumbnail: 'https://i.vimeocdn.com/video/1914131286-929c202c7373aeb06fb0573a6bdec35901141afe1ee64a328a18b9b4fc5c269a-d_640x360.jpg'
  }
];

export const VideoShowcase: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(videoList[0]);

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 text-sm font-mono text-[#D5F44A] tracking-wider uppercase mb-2">
            <Video className="w-4 h-4" />
            <span>Featured Video Spotlights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            See E-SHIP in Action
          </h2>
        </div>
        <p className="text-base sm:text-lg text-white/70 max-w-md">
          Watch official footage of student builds, facilities, and the Beaver Stadium GameDay challenge.
        </p>
      </div>

      {/* Main Active Video Player with Direct Inline iframe */}
      <div className="bg-[#061838] border border-white/15 rounded-3xl overflow-hidden shadow-2xl mb-8">
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://player.vimeo.com/video/${selectedVideo.id}?app_id=122963&title=0&byline=0&portrait=0`}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            title={selectedVideo.title}
          />
        </div>

        {/* Video Metadata & Controls */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 bg-[#041026]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono mb-1">
              <span className="px-2 py-0.5 rounded bg-[#D5F44A]/10 text-[#D5F44A] border border-[#D5F44A]/20 uppercase">
                {selectedVideo.category}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">{selectedVideo.creator}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
              {selectedVideo.title}
            </h3>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl">
              {selectedVideo.description}
            </p>
          </div>

          <a
            href={`https://vimeo.com/${selectedVideo.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-colors shrink-0 whitespace-nowrap"
          >
            <span>Open on Vimeo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Video Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videoList.map((video) => {
          const isSelected = selectedVideo.id === video.id;
          return (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`p-4 sm:p-5 rounded-2xl cursor-pointer border transition-all duration-200 select-none ${
                isSelected
                  ? 'bg-[#08224e] border-[#D5F44A] shadow-[0_0_20px_rgba(213,244,74,0.15)] ring-1 ring-[#D5F44A]'
                  : 'bg-[#061838]/80 hover:bg-[#061838] border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-white/70">
                  {video.category}
                </span>
                <span className="text-xs font-mono text-[#D5F44A] flex items-center gap-1">
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isSelected ? 'Now Playing' : 'Play'}</span>
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                {video.title}
              </h4>
              <p className="text-xs sm:text-sm text-white/60 line-clamp-2">
                {video.description}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
};
