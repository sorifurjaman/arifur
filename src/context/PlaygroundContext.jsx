import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import Matter from 'matter-js';

const PlaygroundContext = createContext(null);

export const usePlayground = () => {
  const context = useContext(PlaygroundContext);
  if (!context) {
    throw new Error('usePlayground must be used within a PlaygroundProvider');
  }
  return context;
};

const TECH_MARBLE_TYPES = [
  { name: '⚛️ React', color: '#61dafb', bg: 'rgba(97,218,251,0.22)', border: '#61dafb' },
  { name: '🐍 Python', color: '#ffd43b', bg: 'rgba(255,212,59,0.22)', border: '#4b8bbe' },
  { name: '💙 Flutter', color: '#54c5f8', bg: 'rgba(2,86,155,0.25)', border: '#54c5f8' },
  { name: '🤖 Bot API', color: '#229ed9', bg: 'rgba(34,158,217,0.25)', border: '#229ed9' },
  { name: '🟢 Node.js', color: '#68a063', bg: 'rgba(104,160,99,0.22)', border: '#68a063' },
  { name: '⚡ FastAPI', color: '#009688', bg: 'rgba(0,150,136,0.22)', border: '#009688' },
  { name: '🧠 AI / LLM', color: '#c084fc', bg: 'rgba(192,132,252,0.25)', border: '#c084fc' },
  { name: '🐳 Docker', color: '#2496ed', bg: 'rgba(36,150,237,0.22)', border: '#2496ed' },
  { name: '🎨 Tailwind', color: '#38bdf8', bg: 'rgba(56,189,248,0.22)', border: '#38bdf8' },
  { name: '🔷 TypeScript', color: '#60a5fa', bg: 'rgba(49,120,198,0.25)', border: '#60a5fa' },
  { name: '🍃 MongoDB', color: '#4ade80', bg: 'rgba(74,222,128,0.22)', border: '#4ade80' },
  { name: '🔥 Firebase', color: '#f59e0b', bg: 'rgba(245,158,11,0.25)', border: '#f59e0b' },
];

export function PlaygroundProvider({ children }) {
  const [isActive, setIsActive] = useState(false);
  const [gravityMode, setGravityModeState] = useState('down'); // 'down' | 'zero' | 'up' | 'cursor' | 'gyro'
  const [gyroActive, setGyroActive] = useState(false);
  const [hasGyroSupport, setHasGyroSupport] = useState(false);
  const [marbles, setMarbles] = useState([]);
  const [telemetry, setTelemetry] = useState({ fps: 60, bodiesCount: 0, tiltX: 0, tiltY: 0 });
  const [shockwaves, setShockwaves] = useState([]);

  // Physics Engine Refs
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const boundariesRef = useRef([]);
  const physicsItemsRef = useRef([]);
  const marbleBodiesRef = useRef([]);
  const mousePosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const gyroDataRef = useRef({ x: 0, y: 0 });

  // Detect Mobile Gyroscope support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      setHasGyroSupport(true);
    }
  }, []);

  // Update Gravity in Matter.js based on mode & gyro
  const applyGravity = useCallback((mode, gx = 0, gy = 1) => {
    if (!engineRef.current) return;
    const engine = engineRef.current;

    switch (mode) {
      case 'zero':
        engine.gravity.x = 0;
        engine.gravity.y = 0;
        engine.gravity.scale = 0;
        break;
      case 'up':
        engine.gravity.x = 0;
        engine.gravity.y = -1;
        engine.gravity.scale = 0.001;
        break;
      case 'cursor':
        engine.gravity.x = 0;
        engine.gravity.y = 0;
        engine.gravity.scale = 0;
        break;
      case 'gyro':
        engine.gravity.x = gx;
        engine.gravity.y = gy;
        engine.gravity.scale = 0.001;
        break;
      case 'down':
      default:
        engine.gravity.x = 0;
        engine.gravity.y = 1;
        engine.gravity.scale = 0.001;
        break;
    }
  }, []);

  const setGravityMode = (mode) => {
    setGravityModeState(mode);
    if (mode === 'gyro') {
      setGyroActive(true);
    } else {
      setGyroActive(false);
      applyGravity(mode);
    }
  };

  // Request Mobile Gyroscope permission (especially for iOS 13+)
  const requestGyroPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        return response === 'granted';
      } catch (err) {
        console.warn('Gyro permission rejected:', err);
        return false;
      }
    }
    return true;
  };

  // Toggle Gyroscope
  const toggleGyro = async () => {
    if (!gyroActive) {
      const granted = await requestGyroPermission();
      if (granted) {
        setGyroActive(true);
        setGravityModeState('gyro');
      }
    } else {
      setGyroActive(false);
      setGravityMode('down');
    }
  };

  // Mobile Device Orientation Listener
  useEffect(() => {
    if (!isActive || !gyroActive) return;

    const handleOrientation = (e) => {
      if (e.gamma === null || e.beta === null) return;

      // gamma is left/right [-90, 90], beta is front/back [-180, 180]
      const holdingPitchAngle = 38; // Normal hand tilt
      const rawX = e.gamma / 45;
      const rawY = (e.beta - holdingPitchAngle) / 45;

      const clampedX = Math.max(-1.5, Math.min(1.5, rawX));
      const clampedY = Math.max(-1.5, Math.min(1.5, rawY));

      gyroDataRef.current.x = clampedX;
      gyroDataRef.current.y = clampedY;

      setTelemetry((prev) => ({
        ...prev,
        tiltX: Math.round(e.gamma),
        tiltY: Math.round(e.beta),
      }));

      if (engineRef.current && gravityMode === 'gyro') {
        engineRef.current.gravity.x += (clampedX - engineRef.current.gravity.x) * 0.15;
        engineRef.current.gravity.y += (clampedY - engineRef.current.gravity.y) * 0.15;
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [isActive, gyroActive, gravityMode]);

  // Track Mouse Position for Magnetic Cursor Gravity & Shockwaves
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Shockwave Impulse Blast
  const triggerShockwave = useCallback((originX, originY) => {
    const x = originX ?? mousePosRef.current.x;
    const y = originY ?? mousePosRef.current.y;

    // Visual Shockwave
    const newWaveId = Date.now() + Math.random();
    setShockwaves((prev) => [...prev, { id: newWaveId, x, y }]);
    setTimeout(() => {
      setShockwaves((prev) => prev.filter((w) => w.id !== newWaveId));
    }, 700);

    // Apply Physical Force
    if (!engineRef.current) return;
    const allBodies = [
      ...physicsItemsRef.current.map((i) => i.body),
      ...marbleBodiesRef.current.map((m) => m.body),
    ];

    allBodies.forEach((body) => {
      const dx = body.position.x - x;
      const dy = body.position.y - y;
      const dist = Math.hypot(dx, dy) || 1;
      const blastRadius = 450;

      if (dist < blastRadius) {
        const forceMagnitude = (1 - dist / blastRadius) * 0.055 * (body.mass || 1);
        Matter.Body.applyForce(body, body.position, {
          x: (dx / dist) * forceMagnitude,
          y: (dy / dist) * forceMagnitude - 0.015,
        });
      }
    });
  }, []);

  // Spawn Tech Marbles
  const spawnMarbles = useCallback((count = 8) => {
    if (!engineRef.current) return;
    const { Bodies, Composite } = Matter;
    const world = engineRef.current.world;

    const newMarbles = [];
    const newBodies = [];

    for (let i = 0; i < count; i++) {
      const template = TECH_MARBLE_TYPES[Math.floor(Math.random() * TECH_MARBLE_TYPES.length)];
      const radius = Math.floor(Math.random() * 8 + 32); // 32 - 40px radius
      const spawnX = Math.random() * (window.innerWidth - 160) + 80;
      const spawnY = -20 - i * 65;

      const body = Bodies.circle(spawnX, spawnY, radius, {
        restitution: 0.82,
        friction: 0.08,
        frictionAir: 0.015,
        density: 0.0018,
      });

      // initial random kick
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 6,
        y: Math.random() * 3 + 2,
      });

      const marbleId = `marble-${Date.now()}-${Math.random()}`;
      newMarbles.push({
        id: marbleId,
        template,
        radius,
        x: spawnX,
        y: spawnY,
        angle: 0,
      });

      newBodies.push({ id: marbleId, body, template, radius });
      Composite.add(world, body);
    }

    marbleBodiesRef.current = [...marbleBodiesRef.current, ...newBodies];
    setMarbles((prev) => [...prev, ...newMarbles]);
  }, []);

  // Create or Update Screen Boundaries
  const updateBoundaries = useCallback(() => {
    if (!engineRef.current) return;
    const { Bodies, Composite } = Matter;
    const world = engineRef.current.world;

    // Remove existing
    boundariesRef.current.forEach((b) => Composite.remove(world, b));

    const w = window.innerWidth;
    const h = window.innerHeight;
    const thickness = 100;

    const floor = Bodies.rectangle(w / 2, h + thickness / 2 - 2, w * 2, thickness, {
      isStatic: true,
      restitution: 0.65,
      friction: 0.2,
    });
    const ceiling = Bodies.rectangle(w / 2, -thickness / 2 + 2, w * 2, thickness, {
      isStatic: true,
      restitution: 0.65,
      friction: 0.2,
    });
    const leftWall = Bodies.rectangle(-thickness / 2 + 2, h / 2, thickness, h * 2, {
      isStatic: true,
      restitution: 0.65,
      friction: 0.2,
    });
    const rightWall = Bodies.rectangle(w + thickness / 2 - 2, h / 2, thickness, h * 2, {
      isStatic: true,
      restitution: 0.65,
      friction: 0.2,
    });

    boundariesRef.current = [floor, ceiling, leftWall, rightWall];
    Composite.add(world, boundariesRef.current);
  }, []);

  // ACTIVATE PLAYGROUND MODE
  const activatePlayground = useCallback(() => {
    if (isActive) return;

    // Lock page scrolling to keep physics contained in viewport
    document.body.style.overflow = 'hidden';

    // 1. Initialize Matter.js Engine & Runner
    const { Engine, Runner, Bodies, Composite, Events } = Matter;
    const engine = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 },
    });
    const runner = Runner.create();
    engineRef.current = engine;
    runnerRef.current = runner;

    updateBoundaries();

    // 2. Discover Interactive Elements with [data-physics="item"]
    const candidateEls = Array.from(document.querySelectorAll('[data-physics="item"]'));
    const items = [];

    candidateEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Only include elements currently visible within or near viewport
      if (rect.width <= 0 || rect.height <= 0) return;
      if (rect.bottom < -50 || rect.top > window.innerHeight + 50) return;

      // Create placeholder to preserve layout flow
      const placeholder = document.createElement('div');
      placeholder.style.width = `${rect.width}px`;
      placeholder.style.height = `${rect.height}px`;
      placeholder.style.margin = window.getComputedStyle(el).margin;
      placeholder.style.display =
        window.getComputedStyle(el).display === 'inline'
          ? 'inline-block'
          : window.getComputedStyle(el).display;
      placeholder.style.visibility = 'hidden';
      placeholder.dataset.physicsPlaceholder = 'true';
      el.parentNode.insertBefore(placeholder, el);

      // Convert original element into a floating physics layer
      el.style.position = 'fixed';
      el.style.top = '0px';
      el.style.left = '0px';
      el.style.width = `${rect.width}px`;
      el.style.height = `${rect.height}px`;
      el.style.margin = '0px';
      el.style.zIndex = '40';
      el.style.pointerEvents = 'auto';
      el.style.userSelect = 'none';
      el.style.touchAction = 'none';
      el.style.willChange = 'transform';
      el.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0px) rotate(0rad)`;

      // Create Matter.js Body matching dimensions
      const body = Bodies.rectangle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        rect.width,
        rect.height,
        {
          restitution: 0.72,
          friction: 0.12,
          frictionAir: 0.018,
          density: 0.002,
          chamfer: { radius: 8 },
        }
      );

      // Random small initial torque/kick
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.06);

      items.push({
        el,
        placeholder,
        body,
        origRect: rect,
        width: rect.width,
        height: rect.height,
      });

      Composite.add(engine.world, body);
    });

    physicsItemsRef.current = items;

    // 3. Physics Simulation Loop (Sync Matter.js -> DOM & Marbles)
    let lastTime = performance.now();
    let frameCount = 0;
    let fps = 60;

    Events.on(engine, 'afterUpdate', () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 500) {
        fps = Math.round((frameCount * 1000) / (now - lastTime));
        frameCount = 0;
        lastTime = now;
        setTelemetry((prev) => ({
          ...prev,
          fps,
          bodiesCount: items.length + marbleBodiesRef.current.length,
        }));
      }

      // Magnetic Cursor Mode attractor
      if (gravityMode === 'cursor') {
        const mx = mousePosRef.current.x;
        const my = mousePosRef.current.y;
        [...items.map((i) => i.body), ...marbleBodiesRef.current.map((m) => m.body)].forEach(
          (body) => {
            const dx = mx - body.position.x;
            const dy = my - body.position.y;
            const dist = Math.hypot(dx, dy) || 1;
            const force = 0.000045 * body.mass;
            Matter.Body.applyForce(body, body.position, {
              x: (dx / dist) * force,
              y: (dy / dist) * force,
            });
          }
        );
      }

      // Sync DOM physics items
      items.forEach((item) => {
        const { el, body, width, height } = item;
        const x = body.position.x - width / 2;
        const y = body.position.y - height / 2;
        el.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate(${body.angle}rad)`;
      });

      // Sync Neon Tech Marbles
      if (marbleBodiesRef.current.length > 0) {
        const updatedMarbles = marbleBodiesRef.current.map((m) => ({
          id: m.id,
          template: m.template,
          radius: m.radius,
          x: m.body.position.x,
          y: m.body.position.y,
          angle: m.body.angle,
        }));
        setMarbles(updatedMarbles);
      }
    });

    // 4. Start Physics Runner
    Runner.run(runner, engine);
    setIsActive(true);

    // Initial celebratory marble drop
    setTimeout(() => {
      spawnMarbles(8);
    }, 300);
  }, [isActive, gravityMode, updateBoundaries, spawnMarbles]);

  // DEACTIVATE / RESTORE TO NORMAL
  const deactivatePlayground = useCallback(() => {
    if (!isActive) return;

    // Stop runner and events
    if (runnerRef.current) {
      Matter.Runner.stop(runnerRef.current);
    }

    const items = physicsItemsRef.current;

    // Smooth Spring Restoration for DOM elements
    items.forEach((item) => {
      const { el, origRect } = item;
      el.style.transition = 'transform 0.65s cubic-bezier(0.16, 1.45, 0.3, 1)';
      el.style.transform = `translate3d(${origRect.left}px, ${origRect.top}px, 0px) rotate(0rad)`;
    });

    // Clean up Marbles
    setMarbles([]);
    marbleBodiesRef.current = [];

    // Reset styles & placeholders after transition completes
    setTimeout(() => {
      items.forEach((item) => {
        const { el, placeholder } = item;
        el.style.position = '';
        el.style.top = '';
        el.style.left = '';
        el.style.width = '';
        el.style.height = '';
        el.style.margin = '';
        el.style.zIndex = '';
        el.style.pointerEvents = '';
        el.style.userSelect = '';
        el.style.touchAction = '';
        el.style.willChange = '';
        el.style.transform = '';
        el.style.transition = '';

        if (placeholder && placeholder.parentNode) {
          placeholder.parentNode.removeChild(placeholder);
        }
      });

      physicsItemsRef.current = [];
      boundariesRef.current = [];
      engineRef.current = null;
      runnerRef.current = null;

      document.body.style.overflow = '';
      setIsActive(false);
      setGravityModeState('down');
      setGyroActive(false);
    }, 700);
  }, [isActive]);

  const togglePlayground = () => {
    if (isActive) {
      deactivatePlayground();
    } else {
      activatePlayground();
    }
  };

  // Window Resize: Update screen walls
  useEffect(() => {
    const handleResize = () => {
      if (isActive) updateBoundaries();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isActive, updateBoundaries]);

  return (
    <PlaygroundContext.Provider
      value={{
        isActive,
        togglePlayground,
        activatePlayground,
        deactivatePlayground,
        gravityMode,
        setGravityMode,
        gyroActive,
        toggleGyro,
        hasGyroSupport,
        marbles,
        spawnMarbles,
        triggerShockwave,
        telemetry,
        shockwaves,
        engineRef,
        marbleBodiesRef,
        physicsItemsRef,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
}
