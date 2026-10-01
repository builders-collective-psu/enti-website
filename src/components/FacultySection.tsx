import React from 'react';
import { Users, Mail, ExternalLink, Award, Briefcase } from 'lucide-react';

interface FacultyMember {
  name: string;
  role: string;
  image?: string;
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
    bio: 'Co-founder and former President of All Traffic Solutions. Serial hardware & IoT entrepreneur with multiple patents in connected municipal infrastructure. Leads the Product Innovation cluster.',
    focus: ['IoT & Hardware Startups', 'Product Feasibility', 'Patent Strategy'],
    email: 'tedgraef@psu.edu',
    directoryUrl: 'https://news.engr.psu.edu/2020/graef-ted-engineering-e-ship-appointment.aspx'
  },
  {
    name: 'Brad Groznik',
    role: 'Assistant Teaching Professor',
    image: '/images/brad-groznik.jpg',
    bio: 'Owner of Groznik PR and co-founder of Pop Up Ave. Specializes in venture communications, go-to-market media positioning, and community-driven product adoption.',
    focus: ['Go-To-Market Strategy', 'Venture PR', 'Brand Positioning'],
    email: 'btg125@psu.edu',
    directoryUrl: 'https://www.sedi.psu.edu/department/directory-detail-g.aspx?q=btg125'
  },
  {
    name: 'Frank Koe',
    role: 'Teaching Professor',
    image: '/images/frank-koe.jpg',
    bio: 'Authority on creative problem solving, risk tolerance, and rapid iteration from failure in new venture design. Recipient of the ASID Joe Polski Award.',
    focus: ['Design Thinking', 'Risk Architecture', 'Product Innovation'],
    email: 'ftk2@psu.edu',
    directoryUrl: 'https://www.sedi.psu.edu/department/directory-detail-g.aspx?q=FTK2'
  },
  {
    name: 'Daniel Goldberg',
    role: 'Lecturer in Engineering Entrepreneurship',
    bio: 'Experienced venture strategist and educator focusing on customer discovery, business model mechanics, and early-stage capital formation for student tech startups.',
    focus: ['Business Model Design', 'Customer Discovery', 'Venture Operations'],
    email: 'sedi@engr.psu.edu',
    directoryUrl: 'https://www.sedi.psu.edu/department/faculty-list.aspx'
  },
  {
    name: 'Gregory Woodman',
    role: 'Lecturer in Engineering Entrepreneurship',
    bio: 'Serial entrepreneur and founder of Woodman & Associates. Mentors student teams on brand narrative, customer retention, and turning student concepts into independent companies.',
    focus: ['Venture Marketing', 'Brand Narrative', 'Student Enterprise'],
    email: 'sedi@engr.psu.edu',
    directoryUrl: 'https://www.sedi.psu.edu/department/faculty-list.aspx'
  },
  {
    name: 'Angela Rothrock',
    role: 'Faculty Leader & Global Programs',
    bio: 'Leads international technology expeditions, including the E-SHIP Taiwan study program connecting students with global semiconductor and hardware manufacturing ecosystems.',
    focus: ['Global Supply Chains', 'Cross-Border Tech', 'Student Immersions'],
    email: 'sedi@engr.psu.edu',
    directoryUrl: 'https://www.sedi.psu.edu/department/faculty-list.aspx'
  },
  {
    name: 'Steve Betza',
    role: 'Professor of Practice',
    bio: 'Former Corporate VP of Engineering at Lockheed Martin. Brings decades of enterprise hardware architecture, technology roadmap execution, and industrial systems strategy.',
    focus: ['Industrial Systems', 'Deep-Tech Scale', 'Corporate Innovation'],
    email: 'sedi@engr.psu.edu',
    directoryUrl: 'https://www.sedi.psu.edu/department/faculty-list.aspx'
  }
];

export const FacultySection: React.FC = () => {
  return (
    <section id="faculty" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] tracking-wider uppercase mb-3">
            <Users className="w-4 h-4" />
            <span>03 // FACULTY & MENTORS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tightest">
            FOUNDERS, OPERATORS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#8FA1B7]">
              & ENGINEERS.
            </span>
          </h2>
        </div>
        <p className="text-[#8FA1B7] max-w-md text-sm sm:text-base leading-relaxed font-normal">
          Courses taught by professors who have actually founded companies, patented hardware devices, raised capital, and taken physical products to international markets.
        </p>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facultyList.map((f, i) => (
          <div
            key={i}
            className="glass-panel p-6 rounded-xl border border-white/10 flex flex-col justify-between hover:border-[#D5F44A]/40 transition-colors group"
          >
            <div>
              {/* Profile Image / Monogram Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#081730] border border-white/10 flex-shrink-0 relative">
                  {f.image ? (
                    <img
                      src={f.image}
                      alt={f.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-lg text-[#D5F44A] bg-[#10243b] -z-10">
                    {f.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#D5F44A] transition-colors">
                    {f.name}
                  </h3>
                  <span className="text-xs font-mono text-[#8FA1B7] block line-clamp-1">
                    {f.role}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-[#8FA1B7] leading-relaxed mb-4">
                {f.bio}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {f.focus.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/70 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact / Links Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <a
                href={`mailto:${f.email}`}
                className="flex items-center gap-1.5 text-white/70 hover:text-[#D5F44A] transition-colors"
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
                  title="View Official Profile"
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
