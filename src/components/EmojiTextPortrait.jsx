import React, { useRef, useState } from 'react';
import profileRestoredImg from '../assets/profile_restored.png';
import { Bot, Sparkles, Terminal, Code2, Cpu, Scan, CheckCircle2 } from 'lucide-react';

const ORBITING_TECH = [
  {
    icon: '🤖',
    label: 'Bot Expert',
    color: '#38bdf8',
    borderColor: 'rgba(56, 189, 248, 0.45)',
    bg: 'rgba(12, 74, 110, 0.45)',
    pos: 'top-2 -right-2 sm:-right-4',
    anim: 'animate-float-1',
  },
  {
    icon: '🐍',
    label: 'Python / Backend',
    color: '#facc15',
    borderColor: 'rgba(250, 204, 21, 0.45)',
    bg: 'rgba(113, 63, 18, 0.45)',
    pos: 'bottom-24 -left-4 sm:-left-6',
    anim: 'animate-float-2',
  },
  {
    icon: '⚛️',
    label: 'React / Web',
    color: '#67e8f9',
    borderColor: 'rgba(103, 232, 249, 0.45)',
    bg: 'rgba(22, 78, 99, 0.45)',
    pos: 'top-16 -left-3 sm:-left-5',
    anim: 'animate-float-3',
  },
  {
    icon: '⚡',
    label: 'Automation & APIs',
    color: '#fb923c',
    borderColor: 'rgba(251, 146, 60, 0.45)',
    bg: 'rgba(124, 45, 18, 0.45)',
    pos: 'bottom-6 right-2 sm:-right-2',
    anim: 'animate-float-1',
  },
];

export default function EmojiTextPortrait() {
  const cardRef = useRef(null);
  const bubbleRef = useRef(null);
  const rafTilt = useRef(null);
  const [scanActive, setScanActive] = useState(true);

  // High-performance 60 FPS 3D Glass Tilt via direct transform without React re-renders
  const handleMouseMove = (e) => {
    if (!cardRef.current || !bubbleRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 12;
    const rotY = (x / (rect.width / 2)) * 12;

    if (!rafTilt.current) {
      rafTilt.current = requestAnimationFrame(() => {
        if (bubbleRef.current) {
          bubbleRef.current.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.02)`;
        }
        rafTilt.current = null;
      });
    }
  };

  const handleMouseLeave = () => {
    if (rafTilt.current) {
      cancelAnimationFrame(rafTilt.current);
      rafTilt.current = null;
    }
    if (bubbleRef.current) {
      bubbleRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center justify-center perspective-[1000px] select-none py-4"
    >
      {/* 1. Deep Cosmic Radial Aura Glow behind the Bubble */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-blue-600/25 to-purple-600/25 rounded-full blur-[100px] pointer-events-none" />

      {/* 2. Orbiting Tech Emojis & Badges Floating Around the Bubble */}
      {ORBITING_TECH.map((item, idx) => (
        <div
          key={idx}
          style={{
            borderColor: item.borderColor,
            backgroundColor: item.bg,
            boxShadow: `0 0 22px ${item.borderColor}`,
          }}
          className={`absolute z-30 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl border text-xs font-bold text-white shadow-xl transition-transform duration-300 hover:scale-110 cursor-default ${item.pos} ${item.anim}`}
        >
          <span className="text-base leading-none drop-shadow-md">{item.icon}</span>
          <span className="hidden sm:inline text-[11px] tracking-wide" style={{ color: item.color }}>
            {item.label}
          </span>
        </div>
      ))}

      {/* 3. Main Floating Crystal Energy Bubble */}
      <div
        ref={bubbleRef}
        style={{
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
        className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full p-2.5 flex items-center justify-center animate-name-float group cursor-pointer"
      >
        {/* Animated Neon Conic Border Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 p-[2.5px] shadow-[0_0_35px_rgba(6,182,212,0.45)] group-hover:shadow-[0_0_60px_rgba(6,182,212,0.75)] transition-shadow duration-500">
          <div className="w-full h-full rounded-full bg-[#05070e]" />
        </div>

        {/* Secondary Pulsing Cyan Ring */}
        <div className="absolute inset-2 rounded-full border border-cyan-400/35 animate-pulse pointer-events-none" />

        {/* Bubble Core Viewport */}
        <div className="relative w-full h-full rounded-full overflow-hidden flex items-end justify-center">
          
          {/* ========================================================= */}
          {/* A. DEEP SPACE COSMIC & NEBULA BACKGROUND INSIDE BUBBLE    */}
          {/* ========================================================= */}
          {/* Cosmic Nebula Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/60 via-[#070d1d] to-[#020307]" />
          
          {/* Deep Space Stars & Cyber Micro-Grid Texture */}
          <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

          {/* Glowing Nebula Color Blobs */}
          <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-cyan-500/25 blur-3xl" />
          <div className="absolute top-1/4 -right-8 w-48 h-48 rounded-full bg-blue-600/25 blur-3xl" />
          <div className="absolute -bottom-8 left-1/4 w-40 h-40 rounded-full bg-purple-600/20 blur-3xl" />

          {/* Subtle Twinkling Cosmic Stars */}
          <div className="absolute top-8 left-12 w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-75" />
          <div className="absolute top-20 right-14 w-1 h-1 rounded-full bg-cyan-300 animate-pulse" />
          <div className="absolute top-12 right-24 w-1.5 h-1.5 rounded-full bg-blue-200 animate-pulse delay-500" />
          <div className="absolute bottom-28 left-8 w-1 h-1 rounded-full bg-amber-200 animate-pulse delay-700" />

          {/* Halo / Silhouette Aura behind Head */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-cyan-500/20 blur-2xl pointer-events-none" />

          {/* ========================================================= */}
          {/* B. CRYSTAL-CLEAR SHARP PORTRAIT (Arm & Torso 100% Intact) */}
          {/* ========================================================= */}
          <img
            src={profileRestoredImg}
            alt="ARIFUR JAMAN"
            className="relative z-10 w-[94%] h-[94%] object-contain object-bottom filter drop-shadow-[0_12px_30px_rgba(6,182,212,0.45)] transition-transform duration-700 group-hover:scale-105"
          />

          {/* ========================================================= */}
          {/* C. HOLOGRAPHIC SCAN & FLOATING CODE / EMOJI ACCENTS       */}
          {/* ========================================================= */}
          {scanActive && (
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden mix-blend-screen">
              {/* Vertical Animated Holographic Laser Scanline */}
              <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/25 to-cyan-400/5 border-b border-cyan-400/70 animate-scanline shadow-[0_0_25px_rgba(6,182,212,0.6)]" />

              {/* Floating Semi-Transparent Code Snippets */}
              <div className="absolute top-10 left-8 text-[9px] font-mono text-cyan-300/70 font-bold tracking-wider leading-relaxed">
                <span>const dev = "Arifur";</span>
              </div>
              <div className="absolute top-18 right-8 text-[9px] font-mono text-blue-300/70 font-bold tracking-wider leading-relaxed">
                <span>&lt;bot.launch /&gt;</span>
              </div>
              <div className="absolute bottom-24 left-10 text-[9px] font-mono text-emerald-300/70 font-bold tracking-wider leading-relaxed">
                <span>status: 200 OK</span>
              </div>
              <div className="absolute bottom-16 right-10 text-[9px] font-mono text-amber-300/70 font-bold tracking-wider leading-relaxed">
                <span>{"{ ...APIs }"}</span>
              </div>

              {/* Shimmering Tech Emojis across cosmic aura */}
              <span className="absolute top-24 left-6 text-sm opacity-75 animate-pulse">🤖</span>
              <span className="absolute top-32 right-7 text-sm opacity-75 animate-pulse delay-300">🐍</span>
              <span className="absolute bottom-32 left-8 text-sm opacity-75 animate-pulse delay-500">⚛️</span>
              <span className="absolute bottom-28 right-6 text-sm opacity-75 animate-pulse delay-700">⚡</span>
              <span className="absolute top-36 left-16 text-xs opacity-65 animate-bounce">✨</span>
              <span className="absolute bottom-36 right-16 text-xs opacity-65 animate-bounce delay-200">🚀</span>
            </div>
          )}



          {/* ========================================================= */}
          {/* D. SPHERICAL GLASS BUBBLE SHEEN & BOTTOM BLEND            */}
          {/* ========================================================= */}
          {/* Curved Glass Highlight (Soap Bubble / Crystal Sphere reflection) */}
          <div className="absolute top-2 left-6 right-6 h-28 rounded-full bg-gradient-to-b from-white/25 via-cyan-300/10 to-transparent blur-[1px] pointer-events-none transform -rotate-12 z-25" />

          {/* Bottom Dark Gradient Fade */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#020307]/90 via-[#020307]/50 to-transparent z-15 pointer-events-none" />
        </div>
      </div>

      {/* 4. Bottom Controls & Cyber ID Tag */}
      <div className="relative mt-3 z-40 flex flex-col items-center gap-2">
        
        {/* Toggle Hologram FX Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setScanActive(!scanActive);
          }}
          className={`border-beam-neon flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all cursor-pointer backdrop-blur-md ${
            scanActive
              ? 'active text-cyan-300 font-extrabold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Scan className="w-3 h-3 text-cyan-400" />
          <span>HOLOGRAPHIC SCAN: {scanActive ? 'ACTIVE' : 'OFF'}</span>
        </button>

        {/* Live Name Plate */}
        <div className="glass-pill px-4 py-2 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <h4 className="text-white font-extrabold text-xs sm:text-sm tracking-wide flex items-center gap-1.5">
              <span className="animate-gradient-text">ARIFUR JAMAN</span>
            </h4>
            <p className="text-[10px] text-cyan-400 font-mono tracking-tight">@arifur905 • Active Developer</p>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[9px] font-bold text-emerald-400">
            ONLINE
          </span>
        </div>
      </div>
    </div>
  );
}
