import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Send, MessageSquare, Facebook, Github, Check, Copy, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const handleCopyTelegram = () => {
    navigator.clipboard.writeText('@arifur905');
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendTelegramMessage = (e) => {
    e.preventDefault();
    const encoded = encodeURIComponent(customMsg || "Hi Arifur, I saw your portfolio and would like to discuss a project!");
    window.open(`https://t.me/arifur905?text=${encoded}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-28 px-6 bg-gradient-to-b from-transparent via-[#060911]/50 to-[#020306]/80 backdrop-blur-[1px]">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Channels</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Let's Build Something <span className="animate-gradient-text">Exceptional</span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
            Have an idea for an automated Telegram bot, a high-converting web platform, or custom script? Connect directly on Telegram or your favorite platform.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Telegram Quick Contact Card */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-8 flex flex-col justify-between border border-cyan-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black mb-6 shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                <Send className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-black text-white mb-2">
                Telegram Direct
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                The fastest way to reach me. Instant replies for custom bot orders, collaboration, and technical inquiries.
              </p>

              {/* Username Pill with Copy */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-3 mb-6">
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Telegram Handle</p>
                  <p className="text-base font-mono font-bold text-cyan-300">@arifur905</p>
                </div>
                <button
                  onClick={handleCopyTelegram}
                  className="border-beam-neon px-3.5 py-2 rounded-xl text-xs font-semibold text-cyan-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-cyan-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <a
              href={personalInfo.socials.telegramPersonal}
              target="_blank"
              rel="noopener noreferrer"
              className="border-beam-neon w-full py-3.5 px-6 rounded-2xl text-cyan-300 hover:text-white font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4 text-cyan-400" />
              <span>CHAT ON TELEGRAM</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
            </a>
          </div>

          {/* Right Column: Interactive Quick Message Box & All Socials */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Quick Telegram Message Sender */}
            <div className="glass-card rounded-3xl p-8 border border-white/10">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span>Send a Quick Message to <span className="animate-gradient-text font-black">Arifur</span></span>
              </h4>
              <p className="text-xs text-gray-400 mb-4">
                Type your message below to immediately launch Telegram with your text preloaded.
              </p>

              <form onSubmit={handleSendTelegramMessage} className="flex flex-col gap-3">
                <textarea
                  rows="3"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Hello Arifur, I am interested in building a bot / web application..."
                  className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="border-beam-neon self-end px-6 py-2.5 rounded-xl text-cyan-300 hover:text-white font-semibold text-xs tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Send via Telegram</span>
                </button>
              </form>
            </div>

            {/* Social Grid Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              
              <a
                href={personalInfo.socials.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="border-beam-neon p-4 rounded-2xl flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
                  <Send className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white group-hover:text-cyan-300">Channel</span>
                <span className="text-[11px] text-gray-400 mt-0.5">@ArifurHack</span>
              </a>

              <a
                href={personalInfo.socials.telegramGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="border-beam-neon p-4 rounded-2xl flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white group-hover:text-cyan-300">Group</span>
                <span className="text-[11px] text-gray-400 mt-0.5">Hackworld</span>
              </a>

              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-beam-neon p-4 rounded-2xl flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-gray-300 mb-2 group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white group-hover:text-cyan-300">GitHub</span>
                <span className="text-[11px] text-gray-400 mt-0.5">Repositories</span>
              </a>

              <a
                href={personalInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="border-beam-neon p-4 rounded-2xl flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                  <Facebook className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white group-hover:text-cyan-300">Facebook</span>
                <span className="text-[11px] text-gray-400 mt-0.5">Profile</span>
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
