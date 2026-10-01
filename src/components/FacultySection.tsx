import React from 'react';
import { Users, Mail, MapPin, ExternalLink, Award, User } from 'lucide-react';

interface FacultyMember {
  name: string;
  role: string;
  image?: string;
  isSilhouette?: boolean;
  office: string;
  bio: string;
  focus: string[];
  email: string;
  directoryUrl?: string;
}

const facultyList: FacultyMember[] = [
  {
    name: 'Ted Graef',
    role: 'Director of Engineering Entrepreneurship',
    image: '/images/ted-graef.jpg',
    office: 'EDI Building Rm 319',
    bio: 'Co-founder and former President of All Traffic Solutions. Serial hardware and IoT entrepreneur with multiple patents in connected municipal traffic systems. Leads the Product Innovation cluster at SEDI.',
    focus: ['IoT & Hardware Startups', 'Product Feasibility', 'Patent Strategy'],
    email: 'tedgraef@psu.edu',
    directoryUrl: 'https://news.engr.psu.edu/2020/graef-ted-engineering-e-ship-appointment.aspx'
  },
  {
    name: 'Brad Groznik',
    role: 'Assistant Teaching Professor',
    image: '/images/brad-groznik.jpg',
    office: 'EDI Building Rm 319',
    bio: 'Founder of Groznik PR and co-founder of Pop Up Ave. Specializes in venture communications, go-to-market positioning, community-driven product adoption, and student founder mentorship.',
    focus: ['Go-To-Market Strategy', 'Venture PR', 'Brand Positioning'],
    email: 'btg125@psu.edu',
    directoryUrl: 'https://www.sedi.psu.edu/department/directory-detail-g.aspx?q=btg125'
  },
  {
    name: 'Faculty',
    role: 'Lecturer in Product Innovation',
    isSilhouette: true,
    office: 'EDI Building Rm 319',
    bio: 'School of Engineering Design and Innovation faculty member teaching core engineering entrepreneurship coursework, student venture development, and market validation.',
    focus: ['Product Innovation', 'Design Thinking', 'Engineering Leadership'],
    email: 'eship@engr.psu.edu'
  },
  {
    name: 'Faculty',
    role: 'Lecturer in Technology Commercialization',
    isSilhouette: true,
    office: 'EDI Building Rm 319',
    bio: 'School of Engineering Design and Innovation faculty member instructing on commercialization pathways, customer discovery, and scalable tech ventures.',
    focus: ['Customer Discovery', 'Commercialization', 'Venture Strategy'],
    email: 'eship@engr.psu.edu'
  },
  {
    name: 'Faculty',
    role: 'Adjunct Lecturer in Hardware Prototyping',
    isSilhouette: true,
    office: 'EDI Building Rm 319',
    bio: 'Industry practitioner and faculty instructor guiding student teams through rapid physical fabrication, CAD design, and GameDay Ventures tailgate challenge builds.',
    focus: ['Hardware Prototyping', 'Learning Factory Fabrication', 'Venture Sprints'],
    email: 'eship@engr.psu.edu'
  }
];

export const FacultySection: React.FC = () => {
  return (
    <section id="faculty" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] tracking-wider uppercase mb-3">
            <Users className="w-4 h-4" />
            <span>05 / Faculty & Mentors</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase">
            Founders, Operators <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#D4AF37]">
              & Engineering Faculty
            </span>
          </h2>
        </div>
        <div className="flex flex-col items-start md:items-end gap-1">
          <span className="text-white/70 max-w-md text-sm sm:text-base leading-relaxed font-normal">
            Learn directly from leaders who have built real companies, patented technology, and manufactured hardware.
          </span>
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#D5F44A]">
            <MapPin className="w-3.5 h-3.5" />
            <span>EDI Building Room 319 Office Hours</span>
          </div>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facultyList.map((f, i) => (
          <div
            key={i}
            className="bg-[#061838]/70 border border-white/10 hover:border-[#D5F44A]/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group"
          >
            <div>
              {/* Photo or Silhouette Avatar */}
              <div className="flex items-center gap-4 mb-4">
                {f.image ? (
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-16 h-16 rounded-xl object-cover border border-white/20 shadow-md group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-slate-700/60 border border-white/15 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                    <User className="w-8 h-8" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D5F44A] transition-colors">
                    {f.name}
                  </h3>
                  <p className="text-xs font-mono text-white/60">
                    {f.role}
                  </p>
                  <span className="text-[10px] font-mono text-white/40 block mt-0.5">
                    {f.office}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4">
                {f.bio}
              </p>

              {/* Competency Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {f.focus.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Contact Trigger */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <a
                href={`mailto:${f.email}`}
                className="inline-flex items-center gap-1.5 text-white/60 hover:text-[#D5F44A] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{f.email}</span>
              </a>
              {f.directoryUrl && (
                <a
                  href={f.directoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label="Penn State Directory Profile"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
