'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { defaultAudioTracks, AudioTrackConfig } from '@/data/artworks';

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: AudioTrackConfig;
  volume: number;
  playAudio: () => void;
  pauseAudio: () => void;
  toggleAudio: () => void;
  setVolume: (v: number) => void;
  changeTrack: (track: AudioTrackConfig) => void;
  audioTracks: AudioTrackConfig[];
  addCustomTrack: (track: AudioTrackConfig) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [audioTracks, setAudioTracks] = useState<AudioTrackConfig[]>(defaultAudioTracks);
  const [currentTrack, setCurrentTrack] = useState<AudioTrackConfig>(defaultAudioTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1.0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync saved tracks from localStorage after mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kexart_custom_tracks');
      if (saved) {
        setAudioTracks(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('kexart_audio_persist', 'true');
      }
    } catch {}

    audio.muted = false;
    audio.volume = 1.0;

    try {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log('Play promise error, retrying unmuted on interaction:', err);
          });
      } else {
        setIsPlaying(true);
      }
    } catch (err) {
      console.log('Synchronous play exception:', err);
    }
  };

  // Foolproof Mobile & Desktop Audio Auto-Starter:
  // Listens to ANY interaction (touch, tap, scroll, click, keydown)
  // to instantly unlock and play audio on mobile browsers.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // 1. Attempt immediate play (works on desktop and returning mobile visits)
      audio.muted = false;
      audio.volume = 1.0;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }

    // 2. High-priority universal gesture unlocker for mobile
    const unlockAndPlay = () => {
      const a = audioRef.current;
      if (a && a.paused) {
        a.muted = false;
        a.volume = 1.0;
        const p = a.play();
        if (p !== undefined) {
          p.then(() => {
            setIsPlaying(true);
            try {
              localStorage.setItem('kexart_audio_persist', 'true');
            } catch {}
          }).catch(() => {});
        }
      }
    };

    const gestureEvents = [
      'touchstart',
      'touchend',
      'pointerdown',
      'mousedown',
      'click',
      'keydown',
      'scroll',
      'wheel',
    ];

    gestureEvents.forEach((ev) => {
      window.addEventListener(ev, unlockAndPlay, { passive: true });
      document.addEventListener(ev, unlockAndPlay, { passive: true });
    });

    window.addEventListener('focus', unlockAndPlay);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        unlockAndPlay();
      }
    });

    return () => {
      gestureEvents.forEach((ev) => {
        window.removeEventListener(ev, unlockAndPlay);
        document.removeEventListener(ev, unlockAndPlay);
      });
      window.removeEventListener('focus', unlockAndPlay);
    };
  }, []);

  // Check URL query parameters: e.g. ?music=slug or ?audio=track-id
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const audioParam = params.get('audio') || params.get('music');

      if (audioParam) {
        const found = audioTracks.find(
          (t) => t.id === audioParam || t.slug.toLowerCase() === audioParam.toLowerCase()
        );
        if (found) {
          setCurrentTrack(found);
          if (audioRef.current) {
            audioRef.current.src = found.audioUrl;
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        }
      }
    }
  }, [audioTracks]);

  // Update audio source when currentTrack changes
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.src = currentTrack.audioUrl;
      if (wasPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  }, [currentTrack]);

  const setVolume = (v: number) => {
    setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  };


  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const changeTrack = (track: AudioTrackConfig) => {
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const addCustomTrack = (track: AudioTrackConfig) => {
    const updated = [track, ...audioTracks];
    setAudioTracks(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kexart_custom_tracks', JSON.stringify(updated));
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentTrack,
        volume,
        playAudio,
        pauseAudio,
        toggleAudio,
        setVolume,
        changeTrack,
        audioTracks,
        addCustomTrack,
      }}
    >
      {/* High-Compatibility HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        preload="auto"
        autoPlay
        loop
        playsInline
        onPlay={() => {
          setIsPlaying(true);
          try {
            if (typeof window !== 'undefined') {
              localStorage.setItem('kexart_audio_persist', 'true');
            }
          } catch {}
        }}
        onPause={() => setIsPlaying(false)}
        onCanPlay={() => {
          try {
            const isPersisted = typeof window !== 'undefined' && localStorage.getItem('kexart_audio_persist') === 'true';
            if (isPersisted && audioRef.current && audioRef.current.paused) {
              audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          } catch {}
        }}
        onError={() => {
          if (audioRef.current && currentTrack.id === 'kexart-original' && !audioRef.current.src.includes('kexart.com')) {
            audioRef.current.src = 'https://kexart.com/prankaudio.mp3';
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        }}
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
