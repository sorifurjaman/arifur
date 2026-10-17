import React, { useEffect, useRef, useState } from 'react';
import heroPortraitImg from '../assets/hero_portrait.png';
import { personalInfo } from '../data/portfolioData';
import { ArrowRight, Sparkles, RotateCcw } from 'lucide-react';

export default function HeroAnimation({ onContactClick }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [animStage, setAnimStage] = useState(0); // 0: dot, 1: animated name, 2: 3D flip & bubble swarm, 3: assembled hero
  const mousePos = useRef({ x: 0, y: 0, rawX: -1000, rawY: -1000, targetX: 0, targetY: 0 });
  const animFrameId = useRef(null);
  const particlesRef = useRef([]);
  const stageRef = useRef(0);
  const portraitOpacityRef = useRef(0);

  useEffect(() => {
    stageRef.current = animStage;
  }, [animStage]);

  // Timeline Controller
  useEffect(() => {
    let t1, t2, t3;

    const runTimeline = () => {
      setAnimStage(0);
      stageRef.current = 0;
      portraitOpacityRef.current = 0;

      if (particlesRef.current.length > 0) {
        particlesRef.current.forEach(p => p.resetToOuter());
      }

      // Stage 1: Animated name "ARIFUR JAMAN" letters wave in at 0.8s
      t1 = setTimeout(() => {
        setAnimStage(1);
        stageRef.current = 1;
      }, 800);

      // Stage 2: 3D Flip & Bubbles rush in from all 360° borders at 2.2s to assemble portrait
      t2 = setTimeout(() => {
        setAnimStage(2);
        stageRef.current = 2;
        portraitOpacityRef.current = 0;
      }, 2200);

      // Stage 3: Fully assembled hero at 4.2s (giving 2 full seconds for bubbles to assemble!)
      t3 = setTimeout(() => {
        setAnimStage(3);
        stageRef.current = 3;
      }, 4200);
    };

    runTimeline();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleReplay = () => {
    setAnimStage(0);
    stageRef.current = 0;
    portraitOpacityRef.current = 0;
    if (particlesRef.current.length > 0) {
      particlesRef.current.forEach(p => p.resetToOuter());
    }
    setTimeout(() => {
      setAnimStage(1);
      stageRef.current = 1;
    }, 800);
    setTimeout(() => {
      setAnimStage(2);
      stageRef.current = 2;
      portraitOpacityRef.current = 0;
    }, 2200);
    setTimeout(() => {
      setAnimStage(3);
      stageRef.current = 3;
    }, 4200);
  };

  // Canvas Particle Swarm & Crystal-Clear Portrait Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current.rawX = e.clientX - rect.left;
      mousePos.current.rawY = e.clientY - rect.top;
      mousePos.current.targetX = (e.clientX - width / 2) * 0.05;
      mousePos.current.targetY = (e.clientY - height / 2) * 0.05;
    };

    const handleMouseLeave = () => {
      mousePos.current.rawX = -1000;
      mousePos.current.rawY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Deep space ambient twinkling stars
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
    }));

    // Bouncing Glowing Light Orb for Intro Stage
    let orb = {
      x: width / 2,
      y: height / 2,
      radius: 9,
      glow: 28,
      pulse: 0
    };

    // Load High-Resolution Hero Portrait
    let portraitImg = new Image();
    portraitImg.src = heroPortraitImg;
    portraitImg.crossOrigin = 'Anonymous';
    let imageLoaded = false;

    portraitImg.onload = () => {
      imageLoaded = true;

      // Create offscreen canvas for pixel sampling
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');

      // High-resolution sampling for crystal-clear recognizable facial features & silhouette
      const sampleW = 140;
      const sampleH = 170;
      offCanvas.width = sampleW;
      offCanvas.height = sampleH;
      offCtx.drawImage(portraitImg, 0, 0, sampleW, sampleH);

      try {
        const imgData = offCtx.getImageData(0, 0, sampleW, sampleH).data;
        const temp = [];

        for (let y = 0; y < sampleH; y += 2) {
          for (let x = 0; x < sampleW; x += 2) {
            const index = (y * sampleW + x) * 4;
            const r = imgData[index];
            const g = imgData[index + 1];
            const b = imgData[index + 2];
            const a = imgData[index + 3];

            if (a > 20) {
              const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
              const normX = (x - sampleW * 0.5) / sampleW;
              const normY = (y - sampleH * 0.5) / sampleH;

              let color;
              let baseSize;

              if (brightness > 0.60) {
                // High facial highlights, smile, collar: sparkling white-cyan
                color = 'rgba(245, 252, 255, 0.95)';
                baseSize = 2.4;
              } else if (brightness > 0.35) {
                // Midtones: radiant electric cyan
                color = 'rgba(110, 220, 255, 0.88)';
                baseSize = 1.9;
              } else if (brightness > 0.18) {
                // Mid-dark: clothing, chest contours
                color = 'rgba(56, 185, 250, 0.78)';
                baseSize = 1.5;
              } else {
                // Darkest silhouette: hair, sunglasses, suit jacket
                color = 'rgba(35, 140, 240, 0.72)';
                baseSize = 1.25;
              }

              const particle = {
                normX,
                normY,
                brightness,
                baseSize,
                color,
                phase: Math.random() * Math.PI * 2,
                ease: 0.05 + Math.random() * 0.035,
                friction: 0.86 + Math.random() * 0.05,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,

                resetToOuter() {
                  const spawnAngle = Math.random() * Math.PI * 2;
                  const spawnDist = Math.max(width, height) * (0.65 + Math.random() * 0.6);
                  this.x = width / 2 + Math.cos(spawnAngle) * spawnDist;
                  this.y = height / 2 + Math.sin(spawnAngle) * spawnDist;
                  const initialSpeed = 12 + Math.random() * 18;
                  this.vx = -Math.cos(spawnAngle) * initialSpeed + (Math.random() - 0.5) * 5;
                  this.vy = -Math.sin(spawnAngle) * initialSpeed + (Math.random() - 0.5) * 5;
                }
              };

              particle.resetToOuter();
              temp.push(particle);
            }
          }
        }

        particlesRef.current = temp;
      } catch (err) {
        console.error("Error generating portrait particles:", err);
      }
    };

    if (portraitImg.complete && portraitImg.naturalWidth !== 0) {
      portraitImg.onload();
    }

    let tick = 0;

    const render = () => {
      tick++;
      // Smooth mouse parallax
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.08;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Deep space radial background
      const bgGrad = ctx.createRadialGradient(
        width / 2 + mousePos.current.x * 2,
        height / 2 + mousePos.current.y * 2,
        140,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      bgGrad.addColorStop(0, '#0c1322');
      bgGrad.addColorStop(0.45, '#05070c');
      bgGrad.addColorStop(1, '#020305');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Starfield
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.x += star.speedX;
        star.y += star.speedY;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const twinkle = Math.sin(tick * 0.03 + star.x) * 0.25 + 0.75;
        ctx.fillStyle = `rgba(200, 225, 255, ${star.alpha * twinkle})`;
        ctx.beginPath();
        ctx.arc(
          star.x + mousePos.current.x * 0.5,
          star.y + mousePos.current.y * 0.5,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // 2. Portrait & 360° Bubble Swarm Rendering (Stages 2 & 3)
      const currentStage = stageRef.current;
      const pList = particlesRef.current;

      if (currentStage >= 2 && imageLoaded) {
        // Center position for portrait (right behind the hero text)
        const portraitCenterX = width / 2 + mousePos.current.x * 1.6;
        const portraitCenterY = height * 0.35 + mousePos.current.y * 1.6;
        const pWidth = Math.min(width * 0.45, 420);
        const pHeight = pWidth * (816 / 680);

        // Render Animated 360° Bubble Swarm - The portrait is 100% sculpted from bubbles!
        for (let i = 0; i < pList.length; i++) {
          const p = pList[i];

          const targetX = portraitCenterX + p.normX * pWidth;
          const targetY = portraitCenterY + p.normY * pHeight;

          // Liquid mouse repulsion (using squared distance for zero square roots on distant particles)
          const mdx = p.x - mousePos.current.rawX;
          const mdy = p.y - mousePos.current.rawY;
          const mdistSq = mdx * mdx + mdy * mdy;
          let repulseX = 0;
          let repulseY = 0;

          if (mdistSq < 14400 && mdistSq > 0) {
            const mdist = Math.sqrt(mdistSq);
            const force = (1 - mdist / 120) * 35;
            repulseX = (mdx / mdist) * force;
            repulseY = (mdy / mdist) * force;
          }

          const dx = (targetX + repulseX) - p.x;
          const dy = (targetY + repulseY) - p.y;
          const distTargetSq = dx * dx + dy * dy;

          p.vx += dx * p.ease;
          p.vy += dy * p.ease;
          p.vx *= p.friction;
          p.vy *= p.friction;

          p.x += p.vx;
          p.y += p.vy;

          let idleX = 0;
          let idleY = 0;
          if (distTargetSq < 100) {
            idleX = Math.sin(tick * 0.04 + p.phase) * 0.7;
            idleY = Math.cos(tick * 0.04 + p.phase) * 0.7;
          }

          const drawX = p.x + idleX;
          const drawY = p.y + idleY;

          // If rushing from outer perimeter, draw with speed trail
          if (distTargetSq > 324) {
            ctx.fillStyle = 'rgba(180, 240, 255, 0.65)';
            ctx.beginPath();
            ctx.arc(drawX, drawY, p.baseSize * 1.5, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Assembled fine glowing holographic particle with gentle shimmer
            const shimmer = p.brightness > 0.6 ? Math.sin(tick * 0.05 + p.phase) * 0.15 + 0.85 : 1;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(drawX, drawY, p.baseSize * shimmer, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 3. Glowing Light Orb (for initial stages 0 & 1)
      if (currentStage < 2) {
        orb.pulse += 0.08;
        const glowRadius = orb.glow + Math.sin(orb.pulse) * 8;
        const orbGrad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          glowRadius
        );
        orbGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        orbGrad.addColorStop(0.25, 'rgba(147, 197, 253, 0.9)');
        orbGrad.addColorStop(0.6, 'rgba(59, 130, 246, 0.4)');
        orbGrad.addColorStop(1, 'rgba(37, 99, 235, 0)');

        ctx.fillStyle = orbGrad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    // Pause rendering when hero is scrolled out of viewport
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const introName = "ARIFUR JAMAN".split("");

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex flex-col justify-between items-center overflow-hidden select-none">
      {/* Background Interactive WebGL/Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      />

      {/* Top Replay & Quick Status Pill */}
      <div className="relative z-20 w-full max-w-7xl px-6 pt-24 pb-4 flex justify-between items-center">
        <div
          data-physics="item"
          className="glass-pill inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold text-cyan-300 cursor-default"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_10px_#34d399]"></span>
          </span>
          <span className="tracking-wide">Available for New Projects & Bot Development</span>
        </div>

        <button
          data-physics="item"
          onClick={handleReplay}
          title="Replay Cinematic Intro"
          className="border-beam-neon glass-pill group flex items-center gap-2 px-4 py-2 rounded-full text-xs text-gray-300 hover:text-white transition-all cursor-pointer shadow-lg"
        >
          <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-[-180deg] transition-transform duration-500 text-cyan-400" />
          <span>Replay Intro</span>
        </button>
      </div>

      {/* Center Cinematic Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 my-auto text-center flex flex-col items-center justify-center">
        
        {/* Name / Transform Text Area */}
        <div className="relative min-h-[140px] sm:min-h-[170px] md:min-h-[220px] flex items-center justify-center perspective-[1000px]">
          
          {/* Stage 1: Animated Entrance of "ARIFUR JAMAN" Letters with Wave & Glow */}
          {animStage === 1 && (
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-3">
              {introName.map((char, i) => (
                <span
                  key={i}
                  style={{
                    animation: `dropIn 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 70}ms backwards, letterPulse 2.5s ease-in-out infinite ${i * 120}ms`
                  }}
                  className={`inline-block text-3xl sm:text-5xl md:text-7xl font-black tracking-wider text-white drop-shadow-[0_8px_25px_rgba(6,182,212,0.85)] cursor-pointer hover:scale-125 transition-transform ${
                    char === ' ' ? 'w-4 sm:w-8' : ''
                  }`}
                >
                  {char}
                </span>
              ))}
            </div>
          )}

          {/* Stage 2: 3D Flip Transformation */}
          {animStage === 2 && (
            <div className="text-3xl sm:text-5xl md:text-7xl font-black tracking-wider text-gray-300 transition-all duration-700 transform rotate-x-[90deg] scale-95 opacity-40">
              ARIFUR JAMAN
            </div>
          )}

          {/* Stage 3: ARIFUR JAMAN (BIG) + PORTFOLIO (SMALL) */}
          {animStage >= 3 && (
            <div className="relative animate-in fade-in zoom-in-95 duration-1000 flex flex-col items-center">
              
              {/* PORTFOLIO Subtitle Pill (SMALL as requested) */}
              <div
                data-physics="item"
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-bold tracking-[0.35em] uppercase mb-3 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>PORTFOLIO</span>
              </div>

              {/* Main Massive Metallic Title: ARIFUR JAMAN with Animated Liquid Sheen, Breathing Glow & Floating Wave */}
              <h1 className="metallic-text animate-name-glow animate-name-float text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight sm:tracking-normal leading-none cursor-default select-none flex flex-wrap justify-center items-center">
                {"ARIFUR JAMAN".split("").map((char, index) =>
                  char !== ' ' ? (
                    <span
                      key={index}
                      data-physics="item"
                      className="inline-block transition-transform duration-300 hover:scale-115 hover:-translate-y-2 cursor-pointer"
                    >
                      {char}
                    </span>
                  ) : (
                    <span key={index} className="inline-block w-3 sm:w-6" />
                  )
                )}
              </h1>
            </div>
          )}
        </div>

        {/* Subtitle & Contact Bar */}
        {animStage >= 3 && (
          <div className="w-full max-w-3xl mt-6 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* Left Sub-heading */}
            <div data-physics="item" className="glass-pill px-4 py-2.5 rounded-2xl text-left flex items-center gap-3">
              <div className="w-1.5 h-10 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
              <div>
                <p className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {personalInfo.role}
                </p>
                <p className="text-xs text-gray-400">
                  Telegram Bots • Web Apps • Android APKs
                </p>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3">
              <a
                data-physics="item"
                href="#bots"
                className="border-beam-neon px-5 py-2.5 rounded-xl text-sm font-medium text-cyan-300 hover:text-white transition-all"
              >
                <span>Explore Work</span>
              </a>
              <button
                data-physics="item"
                onClick={onContactClick}
                className="border-beam-neon group relative px-6 py-2.5 rounded-xl text-cyan-300 hover:text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>CONTACT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 pb-8 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <a href="#about" className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-cyan-300 text-xs tracking-wider uppercase">
          <span>Scroll to Explore</span>
          <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
          </div>
        </a>
      </div>
    </section>
  );
}
