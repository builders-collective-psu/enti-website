import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

export const NewsletterAndListserv: React.FC = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Student' | 'Alumni' | 'Friend of the program'>('Student');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="bg-gradient-to-r from-blue-950/70 via-[#061838] to-[#041026] border border-blue-500/20 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D5F44A] tracking-wider uppercase mb-3 px-3 py-1 rounded bg-[#D5F44A]/10 border border-[#D5F44A]/20">
            <Mail className="w-3.5 h-3.5" />
            <span>Penn State Listserv & Updates</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Stay in the E-SHIP Loop
          </h3>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-8">
            Subscribe to the official Penn State ENTI and E-SHIP announcement listserv. 
            Receive semester course registration notices, grant application deadlines, travel trek announcements, and student venture showcases.
          </p>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#D5F44A]/10 border border-[#D5F44A]/30 text-white font-mono text-sm flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#D5F44A] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#D5F44A] block mb-1">
                  Subscription Request Received!
                </span>
                <p className="text-xs text-white/80 leading-relaxed">
                  Thank you for subscribing with <span className="underline">{email}</span> as a <span className="font-semibold">{role}</span>. 
                  You will receive updates from the E-SHIP team (eship@engr.psu.edu) and notifications via the Penn State Listserv system.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selector Radio Group */}
              <div>
                <span className="text-xs font-mono uppercase text-white/50 block mb-2">
                  I am a:
                </span>
                <div className="flex flex-wrap gap-4 font-mono text-xs text-white/90">
                  {(['Student', 'Alumni', 'Friend of the program'] as const).map((r) => (
                    <label key={r} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="user-role"
                        value={r}
                        checked={role === r}
                        onChange={() => setRole(r)}
                        className="accent-[#D5F44A] cursor-pointer"
                      />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Email Input & Submit */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address (e.g. xyz@psu.edu)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white font-mono text-sm placeholder:text-white/40 focus:outline-none focus:border-[#D5F44A]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#D5F44A] text-[#041026] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#c2e239] transition-all transform active:scale-95 shadow-md shadow-[#D5F44A]/10 whitespace-nowrap"
                >
                  Stay in the Loop
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/40">
            <span>Official Penn State Listserv System (lists.psu.edu)</span>
            <a
              href="mailto:eship@engr.psu.edu?subject=E-SHIP%20Listserv%20Subscription"
              className="text-white/60 hover:text-[#D5F44A] flex items-center gap-1 transition-colors"
            >
              <span>Questions? Email eship@engr.psu.edu</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
