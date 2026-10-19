'use client';

import { useEffect } from 'react';

/**
 * Bulletproof Non-Exit Navigation Trap:
 * 1. Floods history on user interactions (trusted gestures recognized by Android Chrome).
 * 2. On popstate (back button / swipe gesture): pushes multiple forward states, calls history.forward(), and keeps the takeover stream running.
 * 3. Never shows any "Leave site?" alert dialog.
 */
export default function NavigationTrap() {
  const inlineTrapScript = `
    (function() {
      function floodTrap(count) {
        var num = count || 5;
        try {
          for (var i = 0; i < num; i++) {
            window.history.pushState({ trap: true, t: Date.now(), i: i }, '', window.location.href);
          }
        } catch(e) {}
      }

      // Initial pre-seed
      try {
        window.history.replaceState({ root: true }, '', window.location.href);
        floodTrap(4);
      } catch(e) {}

      // On every user gesture, flood trusted states (bypasses Android Chrome anti-trap intervention)
      var events = ['touchstart', 'touchend', 'click', 'pointerdown'];
      function onGesture() {
        floodTrap(3);
      }
      events.forEach(function(ev) {
        window.addEventListener(ev, onGesture, { passive: true });
        document.addEventListener(ev, onGesture, { passive: true });
      });

      // Trap Back Button (popstate)
      window.addEventListener('popstate', function(e) {
        // Re-flood history immediately
        floodTrap(6);
        try {
          window.history.forward();
        } catch(err) {}

        // Keep takeover active if it was open
        try {
          var isTakeoverActive = sessionStorage.getItem('kexart_takeover_active') === 'true';
          var takeover = document.getElementById('kexart-fullscreen-takeover');
          if (isTakeoverActive || (takeover && getComputedStyle(takeover).display !== 'none')) {
            if (takeover) {
              takeover.style.setProperty('display', 'flex', 'important');
              takeover.classList.remove('hidden');
            }
            if (window.kexartRunTakeover) {
              window.kexartRunTakeover();
            }
          }
        } catch(err) {}

        // Keep audio playing
        try {
          var audio = document.querySelector('audio');
          if (audio && audio.paused) {
            audio.muted = false;
            audio.play().catch(function(){});
          }
        } catch(err) {}
      });

      // Re-flood on fullscreenchange
      document.addEventListener('fullscreenchange', function() {
        try {
          if (sessionStorage.getItem('kexart_takeover_active') === 'true') {
            floodTrap(4);
          }
        } catch(e) {}
      });
    })();
  `;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const floodTrap = (count = 5) => {
      try {
        for (let i = 0; i < count; i++) {
          window.history.pushState({ trap: true, t: Date.now(), i }, '', window.location.href);
        }
      } catch {}
    };

    const handlePopState = () => {
      floodTrap(6);
      try {
        window.history.forward();
      } catch {}

      try {
        const isTakeoverActive = sessionStorage.getItem('kexart_takeover_active') === 'true';
        const takeover = document.getElementById('kexart-fullscreen-takeover');
        if (isTakeoverActive || (takeover && getComputedStyle(takeover).display !== 'none')) {
          if (takeover) {
            takeover.style.setProperty('display', 'flex', 'important');
            takeover.classList.remove('hidden');
          }
          if ((window as any).kexartRunTakeover) {
            (window as any).kexartRunTakeover();
          }
        }
      } catch {}

      try {
        const audio = document.querySelector('audio');
        if (audio && audio.paused) {
          audio.muted = false;
          audio.play().catch(() => {});
        }
      } catch {}
    };

    const onUserTouch = () => {
      floodTrap(3);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('touchstart', onUserTouch, { passive: true });
    window.addEventListener('click', onUserTouch, { passive: true });

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('touchstart', onUserTouch);
      window.removeEventListener('click', onUserTouch);
    };
  }, []);

  return (
    <script
      id="navigation-trap-inline-script"
      dangerouslySetInnerHTML={{ __html: inlineTrapScript }}
    />
  );
}
