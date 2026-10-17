import React, { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener('resize', handleResize);

    // 1. Mouse Tracking for Cyber Spotlight
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
      hasMoved: false,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX * dpr;
      mouse.targetY = e.clientY * dpr;
      mouse.active = true;
      if (!mouse.hasMoved) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
        mouse.hasMoved = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // 2. Constellation Nodes (Optimized for 60 FPS)
    const particleCount = Math.floor(Math.min(window.innerWidth, 1920) / 28);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45 * dpr,
      vy: (Math.random() - 0.5) * 0.45 * dpr,
      size: (Math.random() * 1.5 + 0.8) * dpr,
      baseAlpha: Math.random() * 0.45 + 0.25,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      phase: Math.random() * Math.PI * 2,
      isCyan: Math.random() > 0.4,
      flash: 0, // Arrival flash intensity
    }));

    // 3. Neural Circuit Pulses (Energy Beams traveling along node lines)
    const neuralPulses = [];
    const maxPulses = 18;

    const spawnPulse = (startIdx, endIdx, speedMultiplier = 1) => {
      if (neuralPulses.length >= maxPulses) return;
      const p1 = particles[startIdx];
      const p2 = particles[endIdx];
      if (!p1 || !p2) return;

      neuralPulses.push({
        startIndex: startIdx,
        endIndex: endIdx,
        progress: 0,
        speed: (0.018 + Math.random() * 0.02) * speedMultiplier,
        trailLength: 0.22,
        color: Math.random() > 0.25 ? '#22d3ee' : '#60a5fa',
        hopsLeft: Math.random() > 0.5 ? 2 : 1, // Multi-hop neural propagation
      });
    };

    // 4. Impact / Shockwave Rings on Nodes
    const impactRings = [];
    const spawnRing = (x, y, color = '#22d3ee') => {
      if (impactRings.length > 25) return;
      impactRings.push({
        x,
        y,
        radius: 2 * dpr,
        maxRadius: (14 + Math.random() * 10) * dpr,
        alpha: 0.8,
        color,
      });
    };

    // 5. Shooting Stars
    const shootingStars = [];
    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.85,
        y: Math.random() * height * 0.4,
        length: (Math.random() * 90 + 70) * dpr,
        speed: (Math.random() * 8 + 10) * dpr,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        alpha: 1,
        fade: Math.random() * 0.02 + 0.018,
      });
    };

    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.3) spawnShootingStar();
    }, 4000);

    let animId;
    let tick = 0;
    const connectionDist = 110 * dpr;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Smooth Mouse Lerp (Spring spotlight tracking)
      if (mouse.hasMoved) {
        mouse.x += (mouse.targetX - mouse.x) * 0.075;
        mouse.y += (mouse.targetY - mouse.y) * 0.075;
      }

      // ==========================================
      // A. DRAW INTERACTIVE CYBER SPOTLIGHT GLOW
      // ==========================================
      if (mouse.hasMoved) {
        const spotRadius = (mouse.active ? 480 : 380) * dpr;
        const spotGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          spotRadius
        );
        spotGrad.addColorStop(0, 'rgba(6, 182, 212, 0.16)');
        spotGrad.addColorStop(0.28, 'rgba(56, 189, 248, 0.08)');
        spotGrad.addColorStop(0.6, 'rgba(99, 102, 241, 0.03)');
        spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, spotRadius, 0, Math.PI * 2);
        ctx.fill();

        // Delicate Cyber Targeting Reticle / Cursor Halo
        if (mouse.active) {
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
          ctx.lineWidth = 1 * dpr;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 45 * dpr, 0, Math.PI * 2);
          ctx.stroke();

          ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
          ctx.lineWidth = 1 * dpr;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 75 * dpr, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // ==========================================
      // B. UPDATE & DRAW NODES AND CIRCUIT LINES
      // ==========================================
      const connectedPairs = [];
      const connectionDistSq = connectionDist * connectionDist;

      // 1. Batch draw constellation lines in a single stroke call for maximum 60 FPS performance
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 0.65 * dpr;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Screen Wrap
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;
        if (p.y < -15) p.y = height + 15;
        if (p.y > height + 15) p.y = -15;

        // Flash fade
        if (p.flash > 0) p.flash -= 0.04;

        // Connect nearby nodes using squared distance (zero square root calculation on non-connections)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            connectedPairs.push([i, j]);
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();

      // 2. Draw Nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const alpha = p.baseAlpha + Math.sin(tick * p.pulseSpeed + p.phase) * 0.18 + p.flash;
        ctx.fillStyle = p.isCyan
          ? `rgba(56, 189, 248, ${Math.min(Math.max(alpha, 0.1), 1)})`
          : `rgba(224, 242, 254, ${Math.min(Math.max(alpha, 0.1), 1)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + p.flash * 0.8), 0, Math.PI * 2);
        ctx.fill();

        // Spotlight / Mouse Interactive Connection
        if (mouse.hasMoved) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdistSq = mdx * mdx + mdy * mdy;
          const mouseReach = 160 * dpr;
          const mouseReachSq = mouseReach * mouseReach;

          if (mdistSq < mouseReachSq) {
            const mdist = Math.sqrt(mdistSq);
            const mLineAlpha = (1 - mdist / mouseReach) * 0.42;
            ctx.strokeStyle = `rgba(6, 182, 212, ${mLineAlpha})`;
            ctx.lineWidth = 0.9 * dpr;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Interactive mouse excitation: trigger pulses near mouse
            if (tick % 24 === 0 && Math.random() > 0.4) {
              const neighbor = connectedPairs.find(([a, b]) => a === i || b === i);
              if (neighbor) {
                const targetIdx = neighbor[0] === i ? neighbor[1] : neighbor[0];
                spawnPulse(i, targetIdx, 1.4);
              }
            }
          }
        }
      }

      // ==========================================
      // C. NEURAL CIRCUIT PULSE PACKETS & PROPAGATION
      // ==========================================
      // Automatically spawn continuous background neural pulses
      if (tick % 28 === 0 && connectedPairs.length > 0 && neuralPulses.length < maxPulses) {
        const randomPair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
        const [a, b] = Math.random() > 0.5 ? randomPair : [randomPair[1], randomPair[0]];
        spawnPulse(a, b);
      }

      // Render Active Pulses
      for (let k = neuralPulses.length - 1; k >= 0; k--) {
        const pulse = neuralPulses[k];
        pulse.progress += pulse.speed;

        const pStart = particles[pulse.startIndex];
        const pEnd = particles[pulse.endIndex];

        if (!pStart || !pEnd) {
          neuralPulses.splice(k, 1);
          continue;
        }

        // Position of the Pulse Head
        const headT = Math.min(pulse.progress, 1);
        const headX = pStart.x + (pEnd.x - pStart.x) * headT;
        const headY = pStart.y + (pEnd.y - pStart.y) * headT;

        // Position of the Pulse Tail
        const tailT = Math.max(0, headT - pulse.trailLength);
        const tailX = pStart.x + (pEnd.x - pStart.x) * tailT;
        const tailY = pStart.y + (pEnd.y - pStart.y) * tailT;

        // Draw Glowing Electric Beam
        const beamGrad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        beamGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        beamGrad.addColorStop(0.5, `${pulse.color}bb`);
        beamGrad.addColorStop(1, '#ffffff');

        ctx.strokeStyle = beamGrad;
        ctx.lineWidth = 2.2 * dpr;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        // Glowing Quantum Head Dot
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(headX, headY, 1.8 * dpr, 0, Math.PI * 2);
        ctx.fill();

        // Reached Destination Node
        if (pulse.progress >= 1) {
          pEnd.flash = 0.9;
          spawnRing(pEnd.x, pEnd.y, pulse.color);

          // Multi-hop neural propagation
          if (pulse.hopsLeft > 0) {
            pulse.hopsLeft--;
            const nextPairs = connectedPairs.filter(
              ([a, b]) =>
                (a === pulse.endIndex && b !== pulse.startIndex) ||
                (b === pulse.endIndex && a !== pulse.startIndex)
            );

            if (nextPairs.length > 0 && Math.random() > 0.3) {
              const nextPair = nextPairs[Math.floor(Math.random() * nextPairs.length)];
              const nextTarget =
                nextPair[0] === pulse.endIndex ? nextPair[1] : nextPair[0];
              pulse.startIndex = pulse.endIndex;
              pulse.endIndex = nextTarget;
              pulse.progress = 0;
              continue;
            }
          }

          neuralPulses.splice(k, 1);
        }
      }

      // ==========================================
      // D. DRAW IMPACT / SHOCKWAVE RINGS
      // ==========================================
      for (let r = impactRings.length - 1; r >= 0; r--) {
        const ring = impactRings[r];
        ring.radius += 0.8 * dpr;
        ring.alpha -= 0.035;

        if (ring.alpha <= 0 || ring.radius >= ring.maxRadius) {
          impactRings.splice(r, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(34, 211, 238, ${ring.alpha * 0.7})`;
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ==========================================
      // E. UPDATE & DRAW SHOOTING STARS
      // ==========================================
      for (let s = shootingStars.length - 1; s >= 0; s--) {
        const star = shootingStars[s];
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.alpha -= star.fade;

        if (star.alpha <= 0 || star.x > width || star.y > height) {
          shootingStars.splice(s, 1);
          continue;
        }

        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const grad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        grad.addColorStop(0.7, `rgba(56, 189, 248, ${star.alpha * 0.6})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${star.alpha * 0.95})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 1.8 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(shootingStarInterval);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Space Cosmic Base */}
      <div className="absolute inset-0 bg-[#030407]" />

      {/* 2. Cyber Dotted Micro-Grid Pattern */}
      <div className="absolute inset-0 bg-cyber-grid opacity-35" />

      {/* 3. Floating Aurora Ambient Glowing Light Blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[650px] h-[650px] rounded-full bg-cyan-600/15 blur-[140px] animate-float-1" />
      <div className="absolute top-[35%] right-[-10%] w-[750px] h-[750px] rounded-full bg-blue-600/12 blur-[160px] animate-float-2" />
      <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px] animate-float-3" />
      <div className="absolute bottom-[-10%] right-[15%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[130px] animate-float-1" />

      {/* 4. Interactive Full-Screen Canvas (Spotlight, Neural Circuits, Constellations & Shooting Stars) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
