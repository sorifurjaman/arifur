'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Zap, Maximize2, Minimize2, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { initialArtworks, Artwork } from '@/data/artworks';
import { useAudio } from '@/context/AudioContext';

interface RapidImageStreamerProps {
  onSelectArtwork?: (artwork: Artwork) => void;
  className?: string;
}

export default function RapidImageStreamer({ onSelectArtwork, className = '' }: RapidImageStreamerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMs, setSpeedMs] = useState(650); // Default 650ms
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playAudio, isPlaying: isAudioPlaying } = useAudio();

  // Rapid Auto-Cycling Timer
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % initialArtworks.length);
    }, speedMs);

    return () => clearInterval(timer);
  }, [isPlaying, speedMs]);

  const currentArtwork = initialArtworks[currentIndex];

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && !isAudioPlaying) {
      playAudio();
    }
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-3xl overflow-hidden border border-black/10 shadow-2xl ${
        isFullscreen ? 'w-screen h-screen rounded-none fixed inset-0 z-50' : 'w-full'
      } ${className}`}
    >
      {/* Active Rapid Image */}
      <div className={`relative w-full ${isFullscreen ? 'h-full' : 'min-h-[360px] sm:min-h-[460px] aspect-[16/10] sm:aspect-[16/9] max-h-[580px]'} bg-black overflow-hidden flex items-center justify-center`}>
        <img
          key={currentArtwork.imageUrl}
          src={currentArtwork.imageUrl}
          alt={currentArtwork.title}
          className="w-full h-full object-cover sm:object-contain transition-opacity duration-150 animate-in fade-in"
          loading="eager"
        />

        {/* Ambient Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />

        {/* Top Floating Header & Stats */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-lg">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-gray-400'}`} />
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-amber-300">
              Auto-Stream
            </span>
            <span className="text-[10px] text-white/70 font-mono">
              {currentIndex + 1} / {initialArtworks.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlay}
              className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
              title={isPlaying ? 'Pause Auto-Stream' : 'Play Auto-Stream'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button
              onClick={handleToggleFullscreen}
              className="p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Stream'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Bottom Artwork Info & Controls */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-[9px] uppercase tracking-widest text-amber-300 font-semibold mb-2">
              <span>{currentArtwork.category}</span>
              <span>•</span>
              <span>{currentArtwork.year}</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight drop-shadow-md">
              {currentArtwork.title}
            </h3>
            <p className="text-xs text-white/75 mt-1 line-clamp-1 drop-shadow">
              {currentArtwork.medium} • {currentArtwork.dimensions}
            </p>
          </div>

          {/* Speed Controls & Details CTA */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/20 p-1 rounded-full">
              <span className="text-[9px] uppercase tracking-wider text-white/60 px-2 font-semibold">Speed:</span>
              <button
                onClick={() => setSpeedMs(350)}
                className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded-full transition-colors ${
                  speedMs === 350 ? 'bg-amber-400 text-black' : 'text-white/80 hover:text-white'
                }`}
              >
                Turbo
              </button>
              <button
                onClick={() => setSpeedMs(650)}
                className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded-full transition-colors ${
                  speedMs === 650 ? 'bg-amber-400 text-black' : 'text-white/80 hover:text-white'
                }`}
              >
                Fast
              </button>
              <button
                onClick={() => setSpeedMs(1100)}
                className={`px-2.5 py-1 text-[10px] uppercase font-bold rounded-full transition-colors ${
                  speedMs === 1100 ? 'bg-amber-400 text-black' : 'text-white/80 hover:text-white'
                }`}
              >
                Flow
              </button>
            </div>

            {onSelectArtwork && (
              <button
                onClick={() => onSelectArtwork(currentArtwork)}
                className="px-4 py-2 bg-white text-black text-xs uppercase tracking-wider font-bold rounded-full hover:bg-amber-300 transition-colors flex items-center gap-1.5 shadow-lg"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
