import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, ArrowUpRight, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [topic, setTopic] = useState('Minor Advising');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Send to serverless API endpoint if configured on Vercel
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, topic, message })
      });

      if (res.ok) {
        setStatus('success');
      } else {
        // Fallback to direct client mailto dispatch to eship@engr.psu.edu
        const subject = encodeURIComponent(`E-SHIP Inquiry: ${topic} [${name}]`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`);
        window.location.href = `mailto:eship@engr.psu.edu?subject=${subject}&body=${body}`;
        setStatus('success');
      }
    } catch {
      // Network or static fallback
      const subject = encodeURIComponent(`E-SHIP Inquiry: ${topic} [${name}]`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}`);
      window.location.href = `mailto:eship@engr.psu.edu?subject=${subject}&body=${body}`;
      setStatus('success');
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Office & Direct Contact Info */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] tracking-wider uppercase mb-3">
            <Mail className="w-4 h-4" />
            <span>07 / Connect With SEDI</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mb-6">
            Get in Touch <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#D4AF37]">
              With E-SHIP
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-8">
            Whether you are declaring the Product Innovation cluster, applying for a $500 startup grant, 
            or inquiring about ENtern internships, our faculty doors in the EDI Building are open.
          </p>

          <div className="space-y-4 font-mono text-xs">
            {/* Location Card */}
            <div className="p-4 rounded-xl bg-[#061838]/80 border border-white/10 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#D5F44A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">
                  School of Engineering Design and Innovation (SEDI)
                </strong>
                <span className="text-white/60">
                  Engineering Design and Innovation (EDI) Building<br />
                  Room 319<br />
                  University Park, PA 16802
                </span>
              </div>
            </div>

            {/* Official Central Program Email */}
            <div className="p-4 rounded-xl bg-[#061838]/80 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D5F44A]" />
                <span className="text-white">Program Inquiries</span>
              </div>
              <a
                href="mailto:eship@engr.psu.edu"
                className="text-[#D5F44A] hover:underline font-bold"
              >
                eship@engr.psu.edu
              </a>
            </div>

            {/* Faculty Leadership */}
            <div className="p-4 rounded-xl bg-[#061838]/80 border border-white/10 space-y-2">
              <div className="text-white/40 uppercase text-[10px]">
                Faculty Leadership
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Ted Graef (Director)</span>
                <span className="text-white/50">EDI Rm 319</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Brad Groznik (Faculty)</span>
                <span className="text-white/50">EDI Rm 319</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Dispatch Form */}
        <div className="lg:col-span-7 bg-[#061838]/90 border border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
            <span className="text-[#D5F44A] tracking-wider uppercase font-bold">
              Direct Contact Dispatch
            </span>
            <span className="text-white/40">
              Destination: eship@engr.psu.edu
            </span>
          </div>

          {status === 'success' ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#D5F44A]/10 border border-[#D5F44A]/30 flex items-center justify-center mx-auto text-[#D5F44A]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Message Dispatched
              </h3>
              <p className="text-sm text-white/70 max-w-md mx-auto font-mono">
                Your message has been routed to <span className="text-[#D5F44A]">eship@engr.psu.edu</span>. 
                A member of the E-SHIP team will follow up with you shortly.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setMessage('');
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-[#041026] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#D5F44A] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. xyz@psu.edu"
                    className="w-full bg-[#041026] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#D5F44A] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 uppercase mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-[#041026] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#D5F44A] focus:outline-none transition-colors"
                >
                  <option value="Minor Advising">ENTI Minor Advising (Product Innovation Cluster)</option>
                  <option value="Product Innovation Grant">Product Innovation Grant Application ($500)</option>
                  <option value="Certificate Info">Product Innovation Entrepreneurship Certificate</option>
                  <option value="ENtern Program">The ENtern Paid Internship Program</option>
                  <option value="Course Registration">Course Registration (ENGR 310 / 407 / 411 / 415 / 425)</option>
                  <option value="Travel Treks">Travel Treks (South Korea / Taiwan / NYC / SF)</option>
                  <option value="Other">General Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 uppercase mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your question, project idea, or advising request..."
                  className="w-full bg-[#041026] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#D5F44A] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 rounded-lg bg-[#D5F44A] hover:bg-[#c2e239] text-[#041026] font-mono text-xs font-bold uppercase tracking-wider transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-[#D5F44A]/10 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{status === 'sending' ? 'Dispatching...' : 'Send Message to eship@engr.psu.edu'}</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
