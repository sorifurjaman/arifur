'use client';

import React from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export default function AudioPlayer() {
  const { isPlaying, currentTrack, volume, toggleAudio, setVolume } = useAudio();

  return (
    <div className={`fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 sm:gap-3 bg-white/95 backdrop-blur-xl border px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-2xl transition-all duration-300 ${
      !isPlaying ? 'border-amber-400/80 shadow-amber-300/30 ring-2 ring-amber-400/20 animate-pulse' : 'border-black/10 hover:border-black/30'
    }`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleAudio();
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          toggleAudio();
        }}
        type="button"
        className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer text-xs uppercase tracking-widest font-medium text-black focus:outline-none touch-manipulation"
        title={isPlaying ? 'Pause Ambient Sound' : 'Play Ambient Sound (Tap to Play)'}
      >
        <div className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-md transition-transform ${
          isPlaying ? 'bg-black text-white scale-105' : 'bg-amber-400 text-black scale-100'
        }`}>
          {isPlaying ? (
            <Disc className="w-4 h-4 animate-spin text-amber-300" style={{ animationDuration: '3s' }} />
          ) : (
            <Volume2 className="w-4 h-4 text-black animate-bounce" />
          )}
        </div>
        <div className="flex flex-col text-left max-w-[110px] sm:max-w-[170px]">
          <span className={`text-[9px] font-bold tracking-wider uppercase truncate ${isPlaying ? 'text-gray-400' : 'text-amber-600'}`}>
            {isPlaying ? 'Now Playing' : 'Tap to Play'}
          </span>
          <span className="text-[11px] font-bold text-black truncate">
            {currentTrack.title}
          </span>
        </div>
      </button>

      {/* Animated Soundwave Frequency Bars */}
      <div className="flex items-center gap-0.5 h-4 px-1" onClick={toggleAudio} role="button">
        <span
          className={`w-0.5 bg-black rounded-full transition-all duration-300 ${
            isPlaying ? 'h-3.5 animate-bounce' : 'h-1 opacity-20'
          }`}
          style={{ animationDelay: '0ms' }}
        />
        <span
          className={`w-0.5 bg-black rounded-full transition-all duration-300 ${
            isPlaying ? 'h-5 animate-bounce' : 'h-1 opacity-20'
          }`}
          style={{ animationDelay: '150ms' }}
        />
        <span
          className={`w-0.5 bg-black rounded-full transition-all duration-300 ${
            isPlaying ? 'h-2.5 animate-bounce' : 'h-1 opacity-20'
          }`}
          style={{ animationDelay: '300ms' }}
        />
        <span
          className={`w-0.5 bg-black rounded-full transition-all duration-300 ${
            isPlaying ? 'h-4 animate-bounce' : 'h-1 opacity-20'
          }`}
          style={{ animationDelay: '450ms' }}
        />
      </div>

      {isPlaying && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-14 accent-black h-1 bg-gray-200 rounded-lg cursor-pointer"
          title="Volume Control"
        />
      )}
    </div>
  );
}
