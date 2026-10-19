'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Headphones, Calendar, Maximize2, ShieldCheck } from 'lucide-react';
import { Artwork } from '@/data/artworks';

interface ArtworkModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onInquire: (artwork: Artwork) => void;
}

export default function ArtworkModal({ artwork, onClose, onInquire }: ArtworkModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!artwork) return;

    const audio = new Audio(artwork.audioUrl);
    audioRef.current = audio;
    setIsPlaying(false);
    setCurrentTime(0);

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
      audioRef.current = null;
    };
  }, [artwork]);

  if (!artwork) return null;

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Audio playback error:', err));
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-black/10 flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Artwork Image View */}
        <div className="lg:w-3/5 bg-neutral-900 flex items-center justify-center p-6 relative group overflow-hidden">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute bottom-4 left-6 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] uppercase tracking-widest text-white/80">
            {artwork.category}
          </div>
        </div>

        {/* Artwork Details & Audio Guide */}
        <div className="lg:w-2/5 p-8 flex flex-col justify-between bg-[#fafafa]">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-gray-500 font-semibold">
              Original Artwork • {artwork.year}
            </span>
            <h2 className="text-3xl font-serif font-bold text-black mt-2 mb-3">
              {artwork.title}
            </h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">
              {artwork.medium} — {artwork.dimensions}
            </p>

            {/* Audio Guide Player Card */}
            <div className="mb-6 p-4 bg-white rounded-xl border border-black/10 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-black text-white">
                    <Headphones className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                      Artwork Audio Guide
                    </h4>
                    <p className="text-xs font-medium text-black line-clamp-1">
                      {artwork.audioTitle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={togglePlayAudio}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-neutral-800 transition-transform active:scale-95 shadow-md"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <div className="flex justify-between text-[10px] text-gray-400 tracking-wider">
                  <span>{formatTime(currentTime)}</span>
                  <span>{duration ? formatTime(duration) : artwork.audioDuration}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">
                Artist Statement & Vision
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                {artwork.description}
              </p>
            </div>

            {/* Authenticity Badge */}
            <div className="flex items-center gap-2 text-[11px] text-gray-500 py-2 border-t border-black/5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Includes Certificate of Authenticity signed by Mayank Parmar</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onInquire(artwork);
                onClose();
              }}
              className="w-full py-3.5 px-6 rounded-full bg-black text-white text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-all shadow-lg active:scale-95 text-center"
            >
              Inquire / Commission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
