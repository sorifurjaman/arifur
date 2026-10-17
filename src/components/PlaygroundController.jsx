import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { usePlayground } from '../context/PlaygroundContext';

export default function PlaygroundController() {
  const {
    isActive,
    marbles,
    shockwaves,
    triggerShockwave,
    engineRef,
  } = usePlayground();

  const containerRef = useRef(null);
  const mouseConstraintRef = useRef(null);

  // Setup Mouse / Touch Interaction for Flinging & Dragging
  useEffect(() => {
    if (!isActive || !engineRef.current || !containerRef.current) return;

    const { Mouse, MouseConstraint, Composite } = Matter;
    const engine = engineRef.current;
    const container = containerRef.current;

    const mouse = Mouse.create(container);
    // Allow touch events on mobile
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.22,
        render: {
          visible: false,
        },
      },
    });

    mouseConstraintRef.current = mouseConstraint;
    Composite.add(engine.world, mouseConstraint);

    return () => {
      if (engineRef.current && mouseConstraintRef.current) {
        Composite.remove(engineRef.current.world, mouseConstraintRef.current);
      }
    };
  }, [isActive, engineRef]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      onClick={(e) => {
        // Trigger shockwave when clicking empty space
        if (e.target === containerRef.current) {
          triggerShockwave(e.clientX, e.clientY);
        }
      }}
      className="fixed inset-0 z-30 pointer-events-auto select-none overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      {/* Visual Shockwave Blast Rings */}
      {shockwaves.map((wave) => (
        <div
          key={wave.id}
          style={{
            left: `${wave.x}px`,
            top: `${wave.y}px`,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full border-2 border-cyan-400 animate-shockwave"
        />
      ))}

      {/* Spawned Neon Tech Marbles */}
      {marbles.map((m) => {
        const d = m.radius * 2;
        return (
          <div
            key={m.id}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: `${d}px`,
              height: `${d}px`,
              transform: `translate3d(${m.x - m.radius}px, ${m.y - m.radius}px, 0px) rotate(${m.angle}rad)`,
              backgroundColor: m.template.bg,
              borderColor: m.template.border,
              boxShadow: `0 0 20px ${m.template.color}40, inset 0 0 15px ${m.template.color}30`,
              willChange: 'transform',
            }}
            className="rounded-full border-2 backdrop-blur-md flex items-center justify-center cursor-grab active:cursor-grabbing text-[11px] sm:text-xs font-bold text-white tracking-wider select-none shadow-xl pointer-events-auto transition-shadow hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
          >
            <span
              style={{ color: m.template.color }}
              className="drop-shadow-[0_0_8px_currentColor] px-1 text-center leading-none"
            >
              {m.template.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
