import React from 'react';

export default function Logo({ size = 36, className = '', withGlow = true }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 select-none group/logo ${className}`}
    >
      {/* Ambient Outer Cyber Glow */}
      {withGlow && (
        <div
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 blur-md opacity-40 group-hover/logo:opacity-80 transition-opacity duration-300 pointer-events-none"
        />
      )}

      {/* High-Performance Vector SVG Logo */}
      <svg
        viewBox="0 0 120 120"
        width="100%"
        height="100%"
        className="relative z-10 w-full h-full transform transition-transform duration-300 group-hover/logo:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Background Glass Radial Gradient */}
          <radialGradient id="compBgGrad" cx="50%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#111c35" />
            <stop offset="55%" stopColor="#060913" />
            <stop offset="100%" stopColor="#020307" />
          </radialGradient>

          {/* Glowing Cyber Border Gradient */}
          <linearGradient id="compBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#3b82f6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.85" />
          </linearGradient>

          {/* Left Wing Gradient: Electric Cyan to Sky Blue */}
          <linearGradient id="compLeftWing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="40%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          {/* Right Wing Gradient: Cobalt Blue to Indigo */}
          <linearGradient id="compRightWing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>

          {/* Center Chevron Gradient */}
          <linearGradient id="compChevronGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          {/* Neon Glow Filter */}
          <filter id="compNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Squircle Base with Cyber Neon Border */}
        <rect
          x="7"
          y="7"
          width="106"
          height="106"
          rx="26"
          fill="url(#compBgGrad)"
          stroke="url(#compBorderGrad)"
          strokeWidth="2.2"
        />

        {/* Background Tech Radar Accents */}
        <circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          stroke="rgba(56, 189, 248, 0.12)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <path
          d="M 17 60 L 27 60 M 93 60 L 103 60 M 60 17 L 60 25 M 60 95 L 60 103"
          stroke="rgba(56, 189, 248, 0.22)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Main Cyber 'A' Inscription */}
        <g filter="url(#compNeonGlow)">
          {/* Left Facet Wing */}
          <path
            d="M 60 20 L 24 88 L 39 88 L 51 63 L 60 44 Z"
            fill="url(#compLeftWing)"
          />

          {/* Right Facet Wing */}
          <path
            d="M 60 20 L 60 44 L 69 63 L 81 88 L 96 88 Z"
            fill="url(#compRightWing)"
          />

          {/* Glowing Cyber Delta Crossbar */}
          <path
            d="M 36 68 L 60 52 L 84 68 L 60 60 Z"
            fill="url(#compChevronGrad)"
          />

          {/* Center Floating Energy Core */}
          <polygon points="60,33 66,44 60,41 54,44" fill="#ffffff" />

          {/* Top Apex Cyber Light Point */}
          <circle cx="60" cy="20" r="2.8" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}
