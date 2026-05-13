import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Zap, Wind, Heart, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { HardwareUnit } from './HardwareUnit';

export const Home = ({ onStartRegulate }: { onStartRegulate: () => void }) => {
  const [metrics, setMetrics] = useState({
    heartRate: 62,
    hrv: 84,
    breathingRate: 14,
    stressIndex: 12,
    stabilityScore: 94.2
  });

  const [state, setState] = useState<'CALM' | 'COMPOSED' | 'ELEVATED' | 'OVERLOADED'>('COMPOSED');

  // Simulate real-time metric drifts
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        heartRate: prev.heartRate + (Math.random() > 0.5 ? 0.5 : -0.5),
        hrv: prev.hrv + (Math.random() > 0.5 ? 1 : -1),
        stressIndex: prev.stressIndex + (Math.random() > 0.5 ? 0.2 : -0.2),
        stabilityScore: prev.stabilityScore + (Math.random() > 0.5 ? 0.1 : -0.1)
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 sm:p-8 h-full flex flex-col items-center justify-center relative overflow-hidden pb-32 sm:pb-8">
      {/* Central Status Ring - Focused Professional Polish */}
      <div 
        onClick={onStartRegulate}
        className="relative w-60 h-60 sm:w-80 sm:h-80 flex items-center justify-center cursor-pointer group"
      >
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-cyan-500 blur-3xl -z-10" 
        />
        <div className="absolute inset-4 rounded-full border border-[var(--accent-cyan)]/10 shadow-[inset_0_0_40px_rgba(6,182,212,0.05)] group-hover:border-[var(--accent-cyan)]/30 transition-all" />
        
        {/* Hardware Product Backdrop */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none p-12">
          <HardwareUnit className="w-full h-full" glow={false} />
        </div>

        <svg className="w-full h-full -rotate-90 transform overflow-visible" viewBox="0 0 320 320">
          <circle
            cx="160"
            cy="160"
            r="145"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.1"
            className="text-[var(--text-primary)]"
          />
          <motion.circle
            cx="160"
            cy="160"
            r="145"
            fill="none"
            stroke="var(--accent-cyan)"
            strokeWidth="2"
            strokeDasharray="910"
            initial={{ strokeDashoffset: 910 }}
            animate={{ strokeDashoffset: 910 - (910 * (metrics.stabilityScore / 100)) }}
            transition={{ duration: 2, ease: "easeInOut" }}
            strokeLinecap="round"
            className="drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] sm:text-[12px] tracking-[0.5em] opacity-40 uppercase text-[var(--text-primary)]">State</span>
          <motion.span 
            key={state}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-light text-[var(--text-primary)] tracking-tight mt-2"
          >
            {state}
          </motion.span>
          <div className="mt-4 sm:mt-8 flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
              <span className="text-[8px] sm:text-[10px] tracking-[0.2em] text-[var(--accent-cyan)] font-bold uppercase underline decoration-[var(--accent-cyan)]/40 underline-offset-4">
                Stability {metrics.stabilityScore.toFixed(1)}%
              </span>
            </div>
            <span className="text-[7px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 mt-2">Click to Regulate</span>
          </div>
        </div>
      </div>

      {/* Minimal Footer Metric */}
      <div className="mt-12 sm:mt-20 flex gap-8 sm:gap-12 text-center opacity-60">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-light text-[var(--text-primary)]">{Math.round(metrics.heartRate)}</span>
          <span className="text-[8px] font-bold tracking-widest uppercase opacity-40 text-[var(--text-primary)]">Heart Rate</span>
        </div>
        <div className="w-px h-8 bg-[var(--separator)] self-center" />
        <div className="flex flex-col gap-1">
          <span className="text-xl font-light text-[var(--accent-cyan)]">{Math.round(metrics.hrv)}</span>
          <span className="text-[8px] font-bold tracking-widest uppercase opacity-40 text-[var(--text-primary)]">HRV Index</span>
        </div>
      </div>

      {/* Sync Status Overlay */}
      <div className="absolute bottom-12 flex flex-col items-center gap-4">
         <div className="flex items-center gap-2 px-4 py-2 border border-[var(--card-border)] rounded-full bg-[var(--card-bg)] backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40 text-[var(--text-primary)]">Linked / Vaga-X1</span>
         </div>
      </div>
    </div>
  );
};

const MetricLine = ({ label, value, unit, color }: any) => (
  <div className="flex flex-col">
    <span className={cn(
      "text-3xl font-light leading-none",
      color === 'cyan' ? "text-cyan-400" : "text-white"
    )}>
      {value}
    </span>
    <span className="text-[10px] tracking-[0.2em] opacity-60 mt-2 uppercase">{unit} / {label}</span>
  </div>
);
