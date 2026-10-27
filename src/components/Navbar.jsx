import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Menu, X, Send, Sparkles, ExternalLink, Gamepad2 } from 'lucide-react';
import Logo from './Logo';
import { usePlayground } from '../context/PlaygroundContext';

export default function Navbar({ onContactClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isActive: isPlaygroundActive, togglePlayground } = usePlayground();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#' },
    { name: 'ABOUT', href: '#about' },
    { name: 'BOTS', href: '#bots' },
    { name: 'WEB APPS', href: '#web' },
    { name: 'MOBILE APPS', href: '#apps' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav-header py-3 shadow-2xl'
          : 'bg-[#05070c]/50 backdrop-blur-xl border-b border-white/[0.07] py-3.5 shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <a
          href="#"
          className="glass-pill flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl text-lg font-black tracking-widest text-white group cursor-pointer"
        >
          <Logo size={32} />
          <span className="animate-gradient-text uppercase font-black tracking-wider group-hover:tracking-widest transition-all duration-300">
            {personalInfo.name}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shadow-[0_0_8px_#22d3ee]"></span>
        </a>

        {/* Desktop Navigation Links inside Frosted Glass Capsule */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full glass-pill">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-gray-300 hover:text-cyan-300 hover:bg-white/[0.08] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)] transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action / CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={togglePlayground}
            title="Toggle Physics Playground Mode"
            className={`border-beam-neon flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer ${
              isPlaygroundActive
                ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)] animate-pulse'
                : 'text-cyan-300 hover:text-white'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isPlaygroundActive ? 'EXIT PLAY' : 'PLAYGROUND'}</span>
          </button>

          <a
            href={personalInfo.socials.telegramPersonal}
            target="_blank"
            rel="noopener noreferrer"
            className="border-beam-neon flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-cyan-300 hover:text-white transition-all"
          >
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>@arifur905</span>
          </a>

          <button
            onClick={onContactClick}
            className="border-beam-neon px-4 py-2 rounded-xl text-cyan-300 hover:text-white text-xs font-bold tracking-wider transition-all cursor-pointer"
          >
            <span>HIRE ME</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="border-beam-neon md:hidden p-2 rounded-lg text-gray-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070a10]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wider text-gray-300 hover:text-cyan-400 py-1.5 border-b border-white/[0.04]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  togglePlayground();
                }}
                className="border-beam-neon flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-cyan-300"
              >
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
                <span>{isPlaygroundActive ? 'EXIT PLAYGROUND' : 'ENTER PLAYGROUND MODE'}</span>
              </button>

              <a
                href={personalInfo.socials.telegramPersonal}
                target="_blank"
                rel="noopener noreferrer"
                className="border-beam-neon flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-cyan-300"
              >
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Telegram: @arifur905</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="border-beam-neon w-full py-2.5 rounded-xl text-cyan-300 font-bold text-sm"
              >
                <span>GET IN TOUCH</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
