import React, { useState } from 'react';
import { telegramBots } from '../data/portfolioData';
import { Bot, Send, ExternalLink, ShieldCheck, Download, Database, Sparkles, Copy, Check } from 'lucide-react';

export default function TelegramBots() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const categories = ['All', 'Security', 'Downloader', 'Storage', 'Artificial Intelligence', 'Utility', 'Automation'];

  const filteredBots = selectedCategory === 'All'
    ? telegramBots
    : telegramBots.filter(b => b.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleCopy = (handle, id) => {
    navigator.clipboard.writeText(handle);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="bots" className="relative py-28 px-6 bg-gradient-to-b from-transparent via-[#040609]/45 to-transparent backdrop-blur-[1px]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <Bot className="w-3.5 h-3.5" />
              <span>Automated Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Telegram <span className="animate-gradient-text">Bots</span>
            </h2>
            <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-xl">
              12+ specialized Telegram bots built for automation, channel security, direct media downloading, cloud storage, and AI interactions.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`border-beam-neon px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'active text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.6)] font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bot Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBots.map((bot) => (
            <div
              key={bot.id}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between relative group"
            >
              {/* Card Top: Handle & Category Badge */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                        {bot.name}
                      </h3>
                      <button
                        onClick={() => handleCopy(bot.handle, bot.id)}
                        className="text-xs text-gray-400 hover:text-cyan-400 flex items-center gap-1 font-mono transition-colors"
                        title="Copy handle"
                      >
                        <span>{bot.handle}</span>
                        {copiedId === bot.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 opacity-60" />
                        )}
                      </button>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-[11px] font-semibold tracking-wider uppercase">
                    {bot.badge}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {bot.description}
                </p>
              </div>

              {/* Card Bottom: Tags & Action Button */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {bot.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-gray-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href={bot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-beam-neon w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-cyan-300 hover:text-white font-semibold text-xs tracking-wider transition-all duration-200"
                >
                  <Send className="w-3.5 h-3.5 text-cyan-400" />
                  <span>START BOT</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
