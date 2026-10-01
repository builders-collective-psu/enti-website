import React from 'react';
import { EngineeringCluster } from '../components/EngineeringCluster';
import { Curriculum } from '../components/Curriculum';
import { BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CurriculumPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-32 pb-20 space-y-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/80 via-[#061838] to-[#041026] border border-blue-500/30">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#D5F44A] uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4" />
            <span>Academic Pathway // 18-20 Credits</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase mb-4">
            Curriculum & Cluster
          </h1>
          <p className="text-base sm:text-xl text-white/80 max-w-3xl leading-relaxed">
            The Product Innovation Cluster under the Entrepreneurship and Innovation (ENTI) Minor. 
            Designed specifically for engineering students to master product development, fabrication, and market entry.
          </p>
        </div>
      </div>

      {/* Cluster Overview */}
      <EngineeringCluster />

      {/* 6-Course Sequence */}
      <Curriculum />

      {/* Next Step Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-[#061838] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Ready to fund your prototype?
            </h3>
            <p className="text-sm sm:text-base text-white/70">
              Apply for up to $500 in equity-free capital through the Product Innovation Grant.
            </p>
          </div>
          <Link
            to="/programs"
            className="px-6 py-3.5 rounded-xl bg-[#D5F44A] text-[#041026] font-mono text-sm font-bold uppercase tracking-wider hover:bg-[#c2e239] transition-all whitespace-nowrap"
          >
            Explore Grants & Programs
          </Link>
        </div>
      </div>
    </div>
  );
};
