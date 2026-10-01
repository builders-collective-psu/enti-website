import React from 'react';
import { FacultySection } from '../components/FacultySection';
import { Users, MapPin, Mail, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FacultyPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-32 pb-20 space-y-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/80 via-[#061838] to-[#041026] border border-blue-500/30">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#D5F44A] uppercase tracking-wider mb-3">
            <Users className="w-4 h-4" />
            <span>School of Engineering Design & Innovation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase mb-4">
            Faculty & Mentors
          </h1>
          <p className="text-base sm:text-xl text-white/80 max-w-3xl leading-relaxed">
            Courses taught by engineering leaders and entrepreneurs who have built companies, patented hardware, 
            and scaled products. Visit our office in the Engineering Design and Innovation (EDI) Building Room 319.
          </p>
        </div>
      </div>

      {/* Main Faculty Section */}
      <FacultySection />

      {/* Office & Advising Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#061838] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] uppercase">
              <MapPin className="w-4 h-4" />
              <span>In-Person Advising</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Visit Us in EDI Building Room 319
            </h3>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl">
              Have an idea for a hardware startup, want to declare the Product Innovation minor, 
              or need guidance on your ENGR 407 tailgate build? Drop by Room 319 or book an advising session.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3.5 rounded-xl bg-[#D5F44A] text-[#041026] font-mono text-sm font-bold uppercase tracking-wider hover:bg-[#c2e239] transition-all whitespace-nowrap shrink-0"
          >
            Contact Faculty
          </Link>
        </div>
      </div>
    </div>
  );
};
