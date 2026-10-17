import React from 'react';
import { mobileApps } from '../data/portfolioData';
import { Smartphone, Download, PlaySquare, DownloadCloud, Code2, Sparkles, Laugh, Tv, Wrench, ExternalLink } from 'lucide-react';

export default function MobileApps() {
  const iconMap = {
    PlaySquare,
    DownloadCloud,
    Code2,
    Sparkles,
    Laugh,
    Tv,
    Wrench,
  };

  return (
    <section id="apps" className="relative py-28 px-6 bg-gradient-to-b from-transparent via-[#030508]/45 to-transparent backdrop-blur-[1px]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android Applications</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Mobile <span className="animate-gradient-text">Apps & APKs</span>
            </h2>
            <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-xl">
              Engineered lightweight and performance-tuned Android APKs for streaming, multi-platform media downloading, coding on the go, and AI generation.
            </p>
          </div>

          <div className="glass-pill inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-gray-200">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
            <span>Hosted on Telegram Secure Vault</span>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mobileApps.map((app) => {
            const AppIcon = iconMap[app.icon] || Smartphone;
            return (
              <div
                key={app.id}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Background Accent Glow */}
                <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${app.color} rounded-full blur-2xl opacity-30 group-hover:opacity-70 transition-opacity pointer-events-none`}></div>

                <div>
                  {/* Top Bar: Icon, Title & Highlight Badge */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-cyan-300 group-hover:scale-105 transition-transform shadow-lg">
                      <AppIcon className="w-6 h-6" />
                    </div>

                    <span className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-gray-300 text-[11px] font-semibold tracking-wider">
                      {app.highlight}
                    </span>
                  </div>

                  {/* App Name & Subtitle */}
                  <h3 className="font-extrabold text-white text-lg group-hover:text-cyan-300 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400/90 mb-3">
                    {app.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {app.description}
                  </p>
                </div>

                {/* Download Button */}
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-beam-neon w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-cyan-300 hover:text-white font-semibold text-xs tracking-wider transition-all duration-200"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GET APK ON TELEGRAM</span>
                  <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
