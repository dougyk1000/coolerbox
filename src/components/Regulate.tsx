import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Shield, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { HardwareUnit } from './HardwareUnit';

export const Regulate = ({ onEnd }: { onEnd: () => void }) => {
  const [phase, setPhase] = useState<'INHALE' | 'EXHALE' | 'HOLD'>('INHALE');
  const [timer, setTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [breaths, setBreaths] = useState(0);

  // Simple breathing cycle: 4s inhale, 6s exhale
  useEffect(() => {
    let timeout: any;
    
    const cycle = () => {
      if (phase === 'INHALE') {
        timeout = setTimeout(() => {
          setPhase('EXHALE');
          setBreaths(b => b + 1);
        }, 4000);
      } else {
        timeout = setTimeout(() => {
          setPhase('INHALE');
        }, 6000);
      }
    };

    cycle();
    return () => clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col relative max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-12">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-8 sm:mb-12">
        <div className="flex flex-col">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 text-[var(--text-primary)]">Regulation</span>
          <span className="text-md sm:text-lg font-light text-[var(--text-primary)] mt-1 uppercase tracking-tight">Vagal Toning</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 text-[var(--text-primary)]">Session</span>
          <span className="text-lg sm:text-xl font-mono font-bold text-cyan-500 mt-1">{formatTime(timer)}</span>
        </div>
      </div>

      {/* Main Orb Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="relative w-full max-w-[280px] sm:max-w-[400px] aspect-square flex items-center justify-center">
          {/* Professional Refined Orb */}
          <motion.div
            animate={{
              scale: phase === 'INHALE' ? 1.3 : 0.8,
              opacity: phase === 'INHALE' ? 0.2 : 0.05,
            }}
            transition={{ duration: phase === 'INHALE' ? 4 : 6, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-cyan-500 blur-[50px] sm:blur-[80px]"
          />

          <motion.div
            animate={{
              scale: phase === 'INHALE' ? 1.2 : 0.7,
            }}
            transition={{ duration: phase === 'INHALE' ? 4 : 6, ease: "easeInOut" }}
            className="relative w-40 h-40 sm:w-64 sm:h-64 rounded-full border border-cyan-500/20 shadow-[inset_0_0_60px_rgba(6,182,212,0.1)] flex items-center justify-center"
          >
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-cyan-500/40 flex items-center justify-center relative">
               <motion.div 
                 animate={{ scale: phase === 'INHALE' ? 1 : 0.5 }}
                 className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.8)]" 
               />
            </div>
          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-20 sm:translate-y-24 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[12px] sm:text-[14px] font-bold uppercase tracking-[0.6em] text-[var(--text-primary)] opacity-60"
              >
                {phase}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Faint hardware reference */}
          <div className="absolute -z-10 opacity-[0.04] pointer-events-none scale-150 rotate-12">
            <HardwareUnit className="w-64 h-64 sm:w-96 sm:h-96" glow={false} />
          </div>
        </div>

        {/* Tactical Guidance */}
        <div className="mt-12 sm:mt-20 text-center space-y-2 sm:space-y-4 max-w-sm px-4">
          <p className="text-lg sm:text-xl font-light leading-relaxed text-[var(--text-primary)] uppercase tracking-tight">
            {phase === 'INHALE' ? 'EXPAND DIAPHRAGM' : 'CONTROLLED RELEASE'}
          </p>
          <div className="flex items-center justify-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-[var(--text-primary)]">
            <span className="flex items-center gap-2 text-cyan-500">
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
               CYCLE {breaths}/20
            </span>
            <span className="hidden xs:inline">OPTIMAL COHERENCE</span>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mt-8 sm:mt-12 flex items-center justify-between gap-4 sm:gap-6">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 sm:p-4 theme-card hover:bg-white/10 transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[var(--text-primary)]" /> : <Volume2 className="w-4 h-4 text-[var(--text-primary)]" />}
        </button>
        
        <div className="flex-1 px-2 sm:px-4">
          <div className="h-1 w-full bg-[var(--card-bg)] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]" 
              animate={{ width: `${(breaths / 20) * 100}%` }}
            />
          </div>
        </div>

        <button 
          onClick={onEnd}
          className="theme-btn-primary px-6 sm:px-8 py-3 text-[9px] sm:text-[10px]"
        >
          END
        </button>
      </div>

      {/* Background Dots Overlay */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
    </div>
  );
};
