import React from 'react';
import { ProgramsAndGrants } from '../components/ProgramsAndGrants';
import { Award, ArrowRight, DollarSign, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProgramsPage: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-32 pb-20 space-y-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/80 via-[#061838] to-[#041026] border border-blue-500/30">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-[#D5F44A] uppercase tracking-wider mb-3">
            <Award className="w-4 h-4" />
            <span>Funding & Credentials</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase mb-4">
            Grants, Certificate & ENtern
          </h1>
          <p className="text-base sm:text-xl text-white/80 max-w-3xl leading-relaxed">
            Direct financial support and professional development for Penn State engineering builders. 
            Access non-dilutive seed grants, official transcript credentials, and paid startup internships.
          </p>
        </div>
      </div>

      {/* Main Grants and Programs Component */}
      <ProgramsAndGrants />

      {/* Direct Inquiries Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-[#061838] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Have questions about grant eligibility or sponsor matching?
            </h3>
            <p className="text-sm sm:text-base text-white/70">
              Reach out directly to the E-SHIP team at eship@engr.psu.edu or visit EDI Building Room 319.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
          >
            Contact E-SHIP Team
          </Link>
        </div>
      </div>
    </div>
  );
};
