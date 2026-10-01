import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Check, Copy, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [topic, setTopic] = useState('Minor Advising');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const getRecipient = () => {
    if (topic === 'Courses & GameDay') return 'btg125@psu.edu';
    return 'tedgraef@psu.edu';
  };

  const recipient = getRecipient();
  const subject = `E-SHIP Inquiry: ${topic} [${name || 'Student'}]`;
  const mailtoBody = `Hello ${recipient === 'btg125@psu.edu' ? 'Brad' : 'Ted'},\n\n${message}\n\nName: ${name}\nEmail: ${email}\nTopic: ${topic}`;
  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`To: ${recipient}\nSubject: ${subject}\n\n${mailtoBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Office & Direct Contacts */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D5F44A] tracking-wider uppercase mb-3">
            <Mail className="w-4 h-4" />
            <span>06 // CONNECT</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tightest mb-6">
            BUILD WITH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#8FA1B7]">
              E-SHIP.
            </span>
          </h2>

          <p className="text-sm text-[#8FA1B7] leading-relaxed mb-8">
            Whether you are declaring the Product Innovation minor, prototyping a hardware concept for ENGR 407, or looking to collaborate with Builders Collective, our faculty doors in the EDI Building are open.
          </p>

          <div className="space-y-4 mb-8 font-mono text-xs">
            <div className="p-4 rounded-xl glass-panel border border-white/10 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#D5F44A] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">School of Engineering Design & Innovation (SEDI)</strong>
                <span className="text-[#8FA1B7]">304 Engineering Design & Innovation Building<br />University Park, PA 16802</span>
              </div>
            </div>

            <div className="p-4 rounded-xl glass-panel border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D5F44A]" />
                <span className="text-white">Ted Graef (Director)</span>
              </div>
              <a href="mailto:tedgraef@psu.edu" className="text-[#D5F44A] hover:underline">
                tedgraef@psu.edu
              </a>
            </div>

            <div className="p-4 rounded-xl glass-panel border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D5F44A]" />
                <span className="text-white">Brad Groznik (Faculty)</span>
              </div>
              <a href="mailto:btg125@psu.edu" className="text-[#D5F44A] hover:underline">
                btg125@psu.edu
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Dispatch Terminal */}
        <div className="lg:col-span-7 glass-panel p-8 rounded-2xl border border-white/10 bg-[#081730]/90">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
            <span className="text-[#D5F44A] tracking-wider uppercase">// DIRECT_DISPATCH_FORM</span>
            <span className="text-white/40">TO: {recipient}</span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); window.location.href = mailtoUrl; }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#8FA1B7] uppercase mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dillon Fink"
                  className="w-full bg-[#041026] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#D5F44A] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#8FA1B7] uppercase mb-1">Penn State Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="xyz123@psu.edu"
                  className="w-full bg-[#041026] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#D5F44A] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8FA1B7] uppercase mb-1">Topic / Program Area</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#041026] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-[#D5F44A] focus:outline-none transition-colors"
              >
                <option value="Minor Advising">Product Innovation Minor Advising (Ted Graef)</option>
                <option value="Courses & GameDay">Courses & GameDay Ventures (Brad Groznik)</option>
                <option value="Builders Collective">Builders Collective & Hackathons (Het / Ishaan)</option>
                <option value="Taiwan Expedition">Taiwan Global Technology Expedition</option>
                <option value="Venture Mentorship">Student Venture Mentorship & Prototyping</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8FA1B7] uppercase mb-1">Your Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your project, major, or advising questions..."
                className="w-full bg-[#041026] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:border-[#D5F44A] focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-[#D5F44A] hover:bg-[#E3FF54] text-[#041026] text-xs font-mono font-bold tracking-wider uppercase px-6 py-3 rounded transition-colors"
              >
                <span>Open Mail Draft</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded glass-panel border border-white/10 hover:border-white/25 text-xs font-mono uppercase text-white/80 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-[#D5F44A]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Message'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
