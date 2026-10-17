import React from 'react';
import { webProjects } from '../data/portfolioData';
import { Globe, ExternalLink, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';

export default function WebProjects() {
  return (
    <section id="web" className="relative py-28 px-6 bg-gradient-to-b from-transparent via-[#070b13]/45 to-transparent backdrop-blur-[1px]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>Deployed Deployments</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Web <span className="animate-gradient-text">Applications</span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
            Live web tools, developer stores, media players, and browser utilities hosted across Vercel, Netlify, Firebase, and cloud instances.
          </p>
        </div>

        {/* Web Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {webProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top ambient color glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.gradient} rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none`}></div>

              <div>
                {/* Header: Icon & Live Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Live</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tags & Action Link */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-400 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-beam-neon w-full inline-flex items-center justify-between py-2 px-3.5 rounded-xl text-xs font-semibold text-cyan-300 hover:text-white transition-all"
                >
                  <span>Launch Website</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
