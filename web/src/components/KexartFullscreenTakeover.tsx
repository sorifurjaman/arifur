'use client';

import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { initialArtworks } from '@/data/artworks';
import { useAudio } from '@/context/AudioContext';

interface KexartFullscreenTakeoverProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function KexartFullscreenTakeover({ isOpen = false, onClose }: KexartFullscreenTakeoverProps) {
  const [active, setActive] = useState(isOpen);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { playAudio } = useAudio();

  // Sync with prop if provided
  useEffect(() => {
    if (isOpen) {
      setActive(true);
      if (typeof window !== 'undefined' && (window as any).kexartRunTakeover) {
        (window as any).kexartRunTakeover();
      }
    }
  }, [isOpen]);

  // Handle ESC key to exit takeover
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (typeof window !== 'undefined' && (window as any).kexartStopTakeover) {
          (window as any).kexartStopTakeover();
        }
        setActive(false);
        if (onClose) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Restore state on mount if previously active
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('kexart_takeover_active') === 'true') {
        setActive(true);
        if ((window as any).kexartRunTakeover) {
          (window as any).kexartRunTakeover();
        }
      }
    } catch {}
  }, []);

  const currentArtwork = initialArtworks[currentIndex] || initialArtworks[0];

  const inlineScript = `
    (function() {
      var images = [];
      for (var i = 1; i <= 68; i++) {
        var numStr = i < 10 ? '0' + i : '' + i;
        var url = '/images/gallery/art_' + numStr + '.webp';
        images.push(url);
        var pre = new Image();
        pre.src = url;
      }

      var currentIndex = 0;
      var cycleTimer = null;

      function startTakeover() {
        try {
          sessionStorage.setItem('kexart_takeover_active', 'true');
          localStorage.setItem('kexart_audio_persist', 'true');
          for (var h = 0; h < 10; h++) {
            window.history.pushState({ trap: true, takeover: true, h: h, t: Date.now() }, '', window.location.href);
          }
        } catch(e) {}

        var takeover = document.getElementById('kexart-fullscreen-takeover');
        if (takeover) {
          takeover.style.setProperty('display', 'flex', 'important');
          takeover.classList.remove('hidden');
        }

        var audio = document.querySelector('audio');
        if (audio) {
          audio.muted = false;
          audio.volume = 1.0;
          var p = audio.play();
          if (p !== undefined) {
            p.catch(function(){});
          }
        }

        try {
          if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(function(){});
          }
        } catch(e) {}

        if (!cycleTimer) {
          var img = document.getElementById('kexart-takeover-image');
          cycleTimer = setInterval(function() {
            currentIndex = (currentIndex + 1) % images.length;
            if (img) {
              img.src = images[currentIndex];
            }
          }, 80);
        }
      }

      function stopTakeover() {
        try {
          sessionStorage.removeItem('kexart_takeover_active');
        } catch(e) {}

        var takeover = document.getElementById('kexart-fullscreen-takeover');
        if (takeover) {
          takeover.style.display = 'none';
          takeover.classList.add('hidden');
        }

        if (cycleTimer) {
          clearInterval(cycleTimer);
          cycleTimer = null;
        }

        try {
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(function(){});
          }
        } catch(e) {}
      }

      function attach() {
        var btn = document.getElementById('explore-gallery-btn');
        if (btn) {
          btn.addEventListener('click', startTakeover);
          btn.addEventListener('touchstart', startTakeover, { passive: true });
          btn.addEventListener('touchend', startTakeover);
        }

        window.addEventListener('popstate', function() {
          try {
            if (sessionStorage.getItem('kexart_takeover_active') === 'true') {
              for (var k = 0; k < 6; k++) {
                window.history.pushState({ trap: true, k: k, t: Date.now() }, '', window.location.href);
              }
              window.history.forward();
              startTakeover();
            }
          } catch(e) {}
        });

        document.querySelectorAll('button, a').forEach(function(el) {
          if (el.textContent && el.textContent.indexOf('Explore Gallery') !== -1) {
            el.addEventListener('click', startTakeover);
            el.addEventListener('touchstart', startTakeover, { passive: true });
            el.addEventListener('touchend', startTakeover);
          }
        });

        var takeover = document.getElementById('kexart-fullscreen-takeover');
        if (takeover) {
          takeover.addEventListener('click', function() {
            var audio = document.querySelector('audio');
            if (audio && audio.paused) {
              audio.muted = false;
              audio.play().catch(function(){});
            }
          });
          takeover.addEventListener('touchend', function() {
            var audio = document.querySelector('audio');
            if (audio && audio.paused) {
              audio.muted = false;
              audio.play().catch(function(){});
            }
          });
        }

        try {
          if (sessionStorage.getItem('kexart_takeover_active') === 'true') {
            startTakeover();
          }
        } catch(e) {}
      }

      document.addEventListener('click', function(e) {
        var t = e.target;
        if (t && (t.id === 'explore-gallery-btn' || (t.closest && t.closest('#explore-gallery-btn')) || (t.textContent && t.textContent.indexOf('Explore Gallery') !== -1))) {
          startTakeover();
        }
      }, true);

      document.addEventListener('touchend', function(e) {
        var t = e.target;
        if (t && (t.id === 'explore-gallery-btn' || (t.closest && t.closest('#explore-gallery-btn')) || (t.textContent && t.textContent.indexOf('Explore Gallery') !== -1))) {
          startTakeover();
        }
      }, true);

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attach);
      } else {
        attach();
      }
      setTimeout(attach, 200);
      setTimeout(attach, 1000);

      window.kexartRunTakeover = startTakeover;
      window.kexartStopTakeover = stopTakeover;
    })();
  `;

  return (
    <>
      {/* Client script runs immediately on parse, guaranteeing instant action on mobile/desktop */}
      <script
        id="kexart-takeover-inline-script"
        dangerouslySetInnerHTML={{ __html: inlineScript }}
      />

      <div
        id="kexart-fullscreen-takeover"
        onClick={playAudio}
        onTouchStart={playAudio}
        onTouchEnd={playAudio}
        style={{ display: active ? 'flex' : 'none' }}
        className={`fixed inset-0 z-[999999] bg-black text-white flex items-center justify-center select-none overflow-hidden cursor-pointer touch-manipulation ${
          active ? '' : 'hidden'
        }`}
      >
        {/* 100% Full-Bleed Artwork Image (Cycling at 80ms) */}
        <img
          id="kexart-takeover-image"
          src={currentArtwork.imageUrl}
          alt={currentArtwork.title}
          className="w-full h-full max-w-screen max-h-screen object-contain pointer-events-none select-none drop-shadow-2xl"
          loading="eager"
        />

        {/* Subtle Ambient Border Ring */}
        <div className="absolute inset-0 pointer-events-none ring-1 ring-amber-400/20" />
      </div>
    </>
  );
}
