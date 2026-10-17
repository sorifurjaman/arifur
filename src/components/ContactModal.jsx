import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { X, Send, Users, Facebook, Github, MessageSquare, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('@arifur905');
    setCopied(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 border border-white/15 bg-[#090d16]/95 shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="border-beam-neon absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            A
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>Connect with Arifur</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </h3>
            <p className="text-xs text-gray-400">Choose your preferred channel below</p>
          </div>
        </div>

        {/* Telegram Direct Featured Card */}
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-6">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <Send className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-white text-sm">Direct Telegram</span>
            </div>
            <button
              onClick={handleCopy}
              className="border-beam-neon px-2.5 py-1 rounded-lg text-xs text-cyan-300 hover:text-white flex items-center gap-1 font-mono transition-colors cursor-pointer"
            >
              <span>@arifur905</span>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            </button>
          </div>

          <a
            href={personalInfo.socials.telegramPersonal}
            target="_blank"
            rel="noopener noreferrer"
            className="border-beam-neon w-full py-2.5 px-4 rounded-xl text-cyan-300 hover:text-white font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <span>START TELEGRAM CHAT</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* All Channels List */}
        <div className="flex flex-col gap-2.5 mb-6">
          <a
            href={personalInfo.socials.telegramChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="border-beam-neon flex items-center justify-between p-3 rounded-xl transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Send className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-gray-200 group-hover:text-white">Official Telegram Channel</span>
            </div>
            <span className="text-xs text-cyan-400/80 font-mono">@ArifurHack</span>
          </a>

          <a
            href={personalInfo.socials.telegramGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="border-beam-neon flex items-center justify-between p-3 rounded-xl transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-gray-200 group-hover:text-white">Arifur Hackworld Community</span>
            </div>
            <span className="text-xs text-blue-400/80 font-mono">Join Group</span>
          </a>

          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="border-beam-neon flex items-center justify-between p-3 rounded-xl transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Github className="w-4 h-4 text-gray-300" />
              <span className="text-sm font-semibold text-gray-200 group-hover:text-white">GitHub Repositories</span>
            </div>
            <span className="text-xs text-gray-400 font-mono">biplobc384</span>
          </a>

          <a
            href={personalInfo.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="border-beam-neon flex items-center justify-between p-3 rounded-xl transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Facebook className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-gray-200 group-hover:text-white">Facebook Profile</span>
            </div>
            <span className="text-xs text-blue-400 font-mono">fary.pol</span>
          </a>

          <a
            href={personalInfo.socials.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="border-beam-neon flex items-center justify-between p-3 rounded-xl transition-colors group"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-semibold text-gray-200 group-hover:text-white">Discord Server</span>
            </div>
            <span className="text-xs text-indigo-400 font-mono">Join Server</span>
          </a>
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-gray-500">
          Typically responds within minutes on Telegram.
        </p>
      </div>
    </div>
  );
}
