import React, { useState, useEffect } from 'react';
import { Mail, ArrowUpRight, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { sound } from '../services/soundEngine';

export const Footer: React.FC = () => {
  const [localTime, setLocalTime] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTactileClick();
    sound.playVictoryFanfare();
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <footer id="contact" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Left: Contact Info & Vision */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT INQUIRIES & COLLABORATION</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Let's Engineer the Future.
          </h2>

          <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
            Whether you want to discuss one of my four ventures, explore hackathon team formations, or collaborate on creative arts—my inbox is open.
          </p>

          <div className="pt-4 space-y-3 font-mono text-xs text-neutral-300">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500">LOCAL TIME:</span>
              <span className="text-cyan-400 font-semibold">{localTime || 'LIVE'} IST</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-neutral-500">FOCUS:</span>
              <span className="text-neutral-200">Startups &bull; SIH 2026 &bull; Solo Engineering</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playTactileClick()}
              onMouseEnter={() => sound.playHoverTone()}
              className="p-3 rounded-full glass-panel hover:bg-white/10 text-neutral-300 hover:text-white transition-colors border border-white/10"
              aria-label="GitHub Profile"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playTactileClick()}
              onMouseEnter={() => sound.playHoverTone()}
              className="p-3 rounded-full glass-panel hover:bg-white/10 text-neutral-300 hover:text-white transition-colors border border-white/10"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
              </svg>
            </a>
            <a
              href="mailto:contact@sahaj.dev"
              onClick={() => sound.playTactileClick()}
              onMouseEnter={() => sound.playHoverTone()}
              className="p-3 rounded-full glass-panel hover:bg-white/10 text-neutral-300 hover:text-white transition-colors border border-white/10"
              aria-label="Send Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right: Interactive Contact Form */}
        <div className="lg:col-span-6">
          <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            {messageSent ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="font-display font-bold text-xl text-white">
                  Message Dispatched!
                </h3>
                <p className="text-xs text-neutral-400 font-mono">
                  Thank you for reaching out. I'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 font-sans placeholder:text-neutral-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 font-sans placeholder:text-neutral-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase">
                    Message / Venture Inquiry
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 font-sans placeholder:text-neutral-600 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Direct Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
        <div>
          &copy; {new Date().getFullYear()} Sahaj. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => {
              sound.playTactileClick();
              window.dispatchEvent(new CustomEvent('open-after-hours'));
            }}
            onMouseEnter={() => sound.playHoverTone()}
            className="hover:text-amber-300 transition-colors flex items-center gap-1.5 select-none"
            title="Open After Hours Command Interface (Cmd+K)"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 animate-pulse" />
            <span>AFTER HOURS [ ⌘K ]</span>
          </button>
          <span className="hidden sm:inline">&bull;</span>
          <span>Google Antigravity &bull; React &bull; Tailwind</span>
          <a
            href="#top"
            onClick={() => sound.playTactileClick()}
            className="text-neutral-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            Back to Top <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};
