import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp, Send, Github, Facebook, MessageSquare, Heart } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020306] border-t border-white/[0.08] py-14 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <a href="#" className="flex items-center gap-2.5 text-lg font-black tracking-widest text-white mb-2 group">
            <Logo size={34} />
            <span className="animate-gradient-text uppercase font-black tracking-wider group-hover:tracking-widest transition-all duration-300">
              {personalInfo.name}
            </span>
          </a>
          <p className="text-xs text-gray-400 max-w-sm">
            {personalInfo.tagline}
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a
            href={personalInfo.socials.telegramPersonal}
            target="_blank"
            rel="noopener noreferrer"
            title="Telegram"
            aria-label="Telegram Profile of Arifur Jaman"
            className="border-beam-neon w-10 h-10 rounded-xl flex items-center justify-center text-cyan-300 hover:text-white transition-all"
          >
            <Send className="w-4 h-4 text-cyan-400" />
          </a>

          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            aria-label="GitHub Profile of Arifur Jaman"
            className="border-beam-neon w-10 h-10 rounded-xl flex items-center justify-center text-gray-300 hover:text-white transition-all"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            aria-label="Facebook Profile of Arifur Jaman"
            className="border-beam-neon w-10 h-10 rounded-xl flex items-center justify-center text-blue-400 hover:text-white transition-all"
          >
            <Facebook className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.socials.discord}
            target="_blank"
            rel="noopener noreferrer"
            title="Discord"
            aria-label="Discord Server of Arifur Jaman"
            className="border-beam-neon w-10 h-10 rounded-xl flex items-center justify-center text-indigo-400 hover:text-white transition-all"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>

        {/* Back to top & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            aria-label="Scroll to top of page"
            className="border-beam-neon w-9 h-9 rounded-xl text-cyan-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

      </div>
    </footer>
  );
}
