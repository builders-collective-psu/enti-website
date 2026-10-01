import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { VideoShowcase } from '../components/VideoShowcase';
import { NewsletterAndListserv } from '../components/NewsletterAndListserv';
import { ArrowRight, BookOpen, Award, Globe, Users, Trophy, ChevronRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const quickTracks = [
    {
      title: '6-Course Curriculum',
      desc: 'The official sequence from MGMT 215 through ENGR 425 with interactive syllabi.',
      path: '/curriculum',
      icon: BookOpen,
      tag: '18-20 Credits'
    },
    {
      title: 'Grants & Certificate',
      desc: 'Apply for the $500 Seed Grant, ENtern paid internships, and 9-credit certificate.',
      path: '/programs',
      icon: Award,
      tag: 'Seed Funding'
    },
    {
      title: 'Global Treks',
      desc: 'Study abroad in South Korea, Taiwan hardware delegations, NYC, and Silicon Valley.',
      path: '/experiences',
      icon: Globe,
      tag: 'Asia & USA'
    },
    {
      title: 'Faculty & Office Hours',
      desc: 'Meet Ted Graef, Brad Groznik, and our engineering faculty in EDI Room 319.',
      path: '/faculty',
      icon: Users,
      tag: 'EDI Rm 319'
    },
    {
      title: 'GameDay Ventures',
      desc: 'Student tailgate game builds at Beaver Stadium and Penn State Builders Collective.',
      path: '/ventures',
      icon: Trophy,
      tag: 'Hands-On'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <Hero />

      {/* Quick Navigation Track Cards (Clean Multi-Page Gateway) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs sm:text-sm font-mono text-[#D5F44A] uppercase tracking-wider block mb-1">
              Explore the Program
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              E-SHIP Program Pathways
            </h2>
          </div>
          <span className="text-sm font-mono text-white/50">
            Dedicated tracks & resources
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickTracks.map((track) => {
            const Icon = track.icon;
            return (
              <Link
                key={track.path}
                to={track.path}
                className="group p-6 sm:p-7 rounded-2xl bg-[#061838]/80 hover:bg-[#08224e] border border-white/10 hover:border-[#D5F44A]/50 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D5F44A] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-white/10 text-white/70">
                      {track.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#D5F44A] transition-colors mb-2">
                    {track.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                    {track.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-mono font-bold text-[#D5F44A] pt-4 border-t border-white/10">
                  <span>Enter Track</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Inline Video Showcase */}
      <VideoShowcase />

      {/* Listserv & Announcements */}
      <NewsletterAndListserv />
    </div>
  );
};
