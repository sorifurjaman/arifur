import React, { useState } from 'react';
import { usePlayground } from '../context/PlaygroundContext';
import {
  Gamepad2,
  RotateCcw,
  Sparkles,
  Zap,
  Smartphone,
  Compass,
  Magnet,
  ArrowDown,
  ArrowUp,
  Globe2,
  X,
  Radio,
} from 'lucide-react';

export default function PlaygroundHUD() {
  const {
    isActive,
    togglePlayground,
    gravityMode,
    setGravityMode,
    gyroActive,
    toggleGyro,
    hasGyroSupport,
    spawnMarbles,
    triggerShockwave,
    telemetry,
    deactivatePlayground,
  } = usePlayground();

  const [minimized, setMinimized] = useState(false);

  // If playground is not active, show floating bottom launcher
  if (!isActive) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={togglePlayground}
          className="border-beam-neon group relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-white text-xs sm:text-sm font-bold tracking-wider backdrop-blur-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <Gamepad2 className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="bg-gradient-to-r from-cyan-300 via-white to-blue-300 bg-clip-text text-transparent uppercase">
            Playground Mode
          </span>
        </button>
      </div>
    );
  }

  // When active & minimized
  if (minimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMinimized(false)}
          className="border-beam-neon flex items-center gap-2 px-4 py-2 rounded-2xl text-cyan-300 font-bold text-xs tracking-wider cursor-pointer"
        >
          <Gamepad2 className="w-4 h-4 text-cyan-400" />
          <span>OPEN CONTROLS</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl animate-in slide-in-from-bottom duration-300 pointer-events-auto">
      <div className="bg-[#070b14]/92 backdrop-blur-2xl border border-cyan-500/35 rounded-2xl p-3 sm:p-4 shadow-[0_0_40px_rgba(6,182,212,0.3)]">
        
        {/* Top Status & Telemetry Bar */}
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.08] text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span className="text-white font-bold">PHYSICS ENGINE</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] text-cyan-300">
              60 FPS
            </span>
          </div>

          {/* Telemetry info */}
          <div className="flex items-center gap-3 text-gray-400 text-[10px] sm:text-xs">
            <span>BODIES: <strong className="text-white">{telemetry.bodiesCount}</strong></span>
            {gyroActive && (
              <span className="hidden sm:inline text-cyan-300">
                TILT: X:{telemetry.tiltX}° Y:{telemetry.tiltY}°
              </span>
            )}
            <button
              onClick={() => setMinimized(true)}
              title="Minimize HUD"
              className="border-beam-neon w-5 h-5 rounded-md flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>—</span>
            </button>
            <button
              onClick={deactivatePlayground}
              title="Exit Playground"
              className="border-beam-neon w-5 h-5 rounded-md flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Controls Layout */}
        <div className="flex flex-col gap-2.5">
          
          {/* Gravity Selector */}
          <div className="flex items-center justify-between gap-1.5 flex-wrap">
            <span className="text-[10px] sm:text-xs font-bold text-gray-400 tracking-wider uppercase">
              GRAVITY:
            </span>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setGravityMode('down')}
                className={`border-beam-neon flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  gravityMode === 'down'
                    ? 'active text-cyan-300 font-bold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <ArrowDown className="w-3 h-3 text-cyan-400" />
                <span>Normal</span>
              </button>

              <button
                onClick={() => setGravityMode('zero')}
                className={`border-beam-neon flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  gravityMode === 'zero'
                    ? 'active text-cyan-300 font-bold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Globe2 className="w-3 h-3 text-cyan-400" />
                <span>Zero-G</span>
              </button>

              <button
                onClick={() => setGravityMode('up')}
                className={`border-beam-neon flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  gravityMode === 'up'
                    ? 'active text-cyan-300 font-bold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <ArrowUp className="w-3 h-3 text-cyan-400" />
                <span>Invert</span>
              </button>

              <button
                onClick={() => setGravityMode('cursor')}
                className={`border-beam-neon flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  gravityMode === 'cursor'
                    ? 'active text-cyan-300 font-bold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Magnet className="w-3 h-3 text-cyan-400" />
                <span>Magnet</span>
              </button>

              {/* Mobile Tilt / Gyroscope Button */}
              <button
                onClick={toggleGyro}
                title={hasGyroSupport ? "Tilt phone to control gravity!" : "Requires mobile device with orientation support"}
                className={`border-beam-neon flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  gyroActive
                    ? 'active text-emerald-300 font-bold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Smartphone className="w-3 h-3 text-cyan-400" />
                <span>Tilt Gyro {gyroActive ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Action Triggers Bar */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/[0.06] flex-wrap">
            <div className="flex items-center gap-2">
              <button
                onClick={() => spawnMarbles(6)}
                className="border-beam-neon flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-cyan-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>+ Spawn Balls</span>
              </button>

              <button
                onClick={() => triggerShockwave()}
                className="border-beam-neon flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-amber-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>⚡ Shockwave</span>
              </button>
            </div>

            {/* Reset Layout / Restore Button */}
            <button
              onClick={deactivatePlayground}
              className="border-beam-neon flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-red-300 hover:text-white text-xs font-bold tracking-wider transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-red-400" />
              <span>RESET LAYOUT</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
