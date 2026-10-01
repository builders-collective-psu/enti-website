import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { NewsletterAndListserv } from '../components/NewsletterAndListserv';
import { Mail, MapPin, Building2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-32 pb-20 space-y-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/80 via-[#061838] to-[#041026] border border-blue-500/30">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#D5F44A] uppercase tracking-wider mb-3">
            <Mail className="w-4 h-4" />
            <span>Connect & Advising</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase mb-4">
            Contact & Listserv
          </h1>
          <p className="text-base sm:text-xl text-white/80 max-w-3xl leading-relaxed">
            Connect directly with the E-SHIP program team at eship@engr.psu.edu, visit our office in the 
            Engineering Design and Innovation (EDI) Building Room 319, or subscribe to the official Penn State ENTI listserv.
          </p>
        </div>
      </div>

      {/* Main Direct Dispatch Form */}
      <ContactSection />

      {/* Listserv Subscription */}
      <NewsletterAndListserv />
    </div>
  );
};
