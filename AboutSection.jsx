import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { Bot, Globe, Smartphone, Users, CheckCircle2, Send, Github, Facebook, MessageSquare, Sparkles } from 'lucide-react';
import EmojiTextPortrait from './EmojiTextPortrait';

export default function AboutSection({ onContactClick }) {
  const statIcons = [Bot, Globe, Smartphone, Users];

  const skills = [
    { name: "Telegram Bot API & Automation", level: "Expert" },
    { name: "Python / Node.js Backends", level: "Advanced" },
    { name: "Web App Development (React, JS)", level: "Advanced" },
    { name: "Android Utility Apps & APKs", level: "Experienced" },
    { name: "API Integration & Web Scraping", level: "Expert" },
    { name: "Database & Cloud Storage Bots", level: "Advanced" },
  ];

  return (
    <section id="about" className="relative py-28 px-6 bg-gradient-to-b from-transparent via-[#080c14]/40 to-transparent backdrop-blur-[1px]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Overview</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Meet <span className="animate-gradient-text inline-block hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]">Arifur</span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
            Crafting powerful bot solutions, scalable web portals, and Android utility applications with an obsession for speed and clean automation.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Emoji & Code Keyword Portrait */}
          <div className="lg:col-span-5 flex justify-center" data-physics="item">
            <EmojiTextPortrait />
          </div>

          {/* Right Column: Bio, Skills & Stats */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                Turning Ideas into Automated Digital Engines & High-Traffic Tools
              </h3>
              <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                {personalInfo.about}
              </p>
            </div>

            {/* Core Capabilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  data-physics="item"
                  className="border-beam-neon flex items-center gap-3 p-3 rounded-xl transition-all shadow-md group cursor-default"
                >
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm font-semibold text-gray-200 group-hover:text-cyan-300 transition-colors">{skill.name}</p>
                    <span className="text-[11px] text-gray-400 font-medium">{skill.level}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.08]">
              {personalInfo.stats.map((stat, i) => {
                const IconComponent = statIcons[i % statIcons.length];
                return (
                  <div
                    key={i}
                    data-physics="item"
                    className="border-beam-neon p-4 rounded-2xl text-center flex flex-col items-center justify-center transition-all shadow-md group"
                  >
                    <IconComponent className="w-5 h-5 text-cyan-400 mb-2 opacity-85 group-hover:scale-110 transition-transform" />
                    <span className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {stat.value}
                    </span>
                    <span className="text-xs text-gray-400 mt-1 font-medium">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Social Connection Quick Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={personalInfo.socials.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="border-beam-neon flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-cyan-300 hover:text-white transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>Telegram Channel</span>
              </a>

              <a
                href={personalInfo.socials.telegramGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="border-beam-neon flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-blue-300 hover:text-white transition-all shadow-md"
              >
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Hackworld Group</span>
              </a>

              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-beam-neon flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-all shadow-md"
              >
                <Github className="w-3.5 h-3.5 text-gray-400" />
                <span>GitHub</span>
              </a>

              <a
                href={personalInfo.socials.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="border-beam-neon flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-indigo-300 hover:text-white transition-all shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                <span>Discord</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
