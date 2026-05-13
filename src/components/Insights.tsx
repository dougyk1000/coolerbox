import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, RefreshCw, ChevronRight, Zap, Target, Sliders, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface Insight {
  id: string;
  category: 'AUTONOMIC' | 'RECOVERY' | 'PEAK PERFORMANCE';
  message: string;
  subtext: string;
}

const mockInsights: Insight[] = [
  {
    id: '1',
    category: 'AUTONOMIC',
    message: "Your breathing destabilizes 12 minutes before high-load events.",
    subtext: "Correlated with 3 calendar instances: 'Board Review'."
  },
  {
    id: '2',
    category: 'RECOVERY',
    message: "Longer exhalation patterns improve your recovery speed by 18%.",
    subtext: "Effective duration: 4:6 ratio maintained for 8 mins."
  },
  {
    id: '3',
    category: 'PEAK PERFORMANCE',
    message: "Optimal cognitive composure window: 09:00—13:00.",
    subtext: "Physiological resonance detected as stable."
  }
];

export const Insights = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-10 max-w-5xl mx-auto pb-24 text-left">
      {/* Header */}
      <div className="border-l-2 border-[var(--accent-cyan)] pl-4 space-y-1">
        <h2 className="text-xl sm:text-2xl font-light tracking-tight text-[var(--text-primary)] uppercase">AI Intel Engine</h2>
        <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--text-secondary)] uppercase">Physiological Intel</p>
      </div>

      {/* Hero Intel Card */}
      <div className="relative overflow-hidden p-6 sm:p-10 rounded-3xl bg-[var(--accent-cyan)]/5 border border-[var(--accent-cyan)]/20">
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-[var(--accent-cyan)]/5 blur-[80px] sm:blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-[var(--accent-cyan)]/20">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--accent-cyan)]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-cyan)]">Critical Insight</span>
              <span className="text-[8px] sm:text-[9px] font-mono text-[var(--text-muted)] uppercase">Analysis Complete</span>
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-light leading-tight tracking-tight text-[var(--text-primary)] max-w-md transition-all">
            Optimization Required: <br/>
            <span className="text-[var(--accent-cyan)]">Sympathetic Drift</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-light max-w-lg">
            AI detected a recurring recovery lag during nocturnal transitions. Correlates with elevated cortisol markers.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 transition-all">
            <button 
              disabled={isRefreshing}
              onClick={handleRefresh}
              className="flex items-center gap-3 px-5 sm:px-6 py-2.5 bg-[var(--accent-cyan)]/10 rounded-xl border border-[var(--accent-cyan)]/30 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all w-full sm:w-auto justify-center"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin")} />
              <span>Recalibrate</span>
            </button>
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-widest italic ml-1">Last Sync: 2m ago</span>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">Pattern Recognition</h3>
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
              <span className="text-[8px] sm:text-[9px] font-mono text-[var(--accent-cyan)] uppercase">Live</span>
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <AnimatePresence>
            {mockInsights.map((insight, i) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-5 sm:p-6 theme-card hover:bg-[var(--card-bg)]/20 transition-all cursor-pointer flex flex-col justify-between h-40 sm:h-48"
              >
                <div className="space-y-3 sm:space-y-4">
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--card-border)]">
                    {insight.category}
                  </span>
                  <p className="text-xs sm:text-sm font-light text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                    {insight.message}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[8px] sm:text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-widest">
                    {insight.subtext.split(':')[0]}
                  </span>
                  <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transition-colors" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Strategy Block */}
      <div className="space-y-4">
        <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] px-2">Optimization Strategy</h3>
        <div className="p-5 sm:p-8 theme-card flex flex-col sm:flex-row items-start sm:items-center justify-between group overflow-hidden relative gap-6">
          <div className="absolute top-0 right-0 w-32 h-full bg-[var(--accent-cyan)]/[0.02] transform skew-x-12 translate-x-12" />
          
          <div className="flex items-center gap-4 sm:gap-6 relative z-10 w-full sm:w-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[var(--card-bg)] flex items-center justify-center border border-[var(--card-border)] shadow-inner shrink-0">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-cyan)]" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--text-primary)]">Pre-Speech Stabilization</div>
              <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] text-[var(--text-secondary)] mt-1">Today: 12:45 PM</div>
            </div>
          </div>
          <button className="theme-btn-secondary p-3 rounded-xl relative z-10 w-full sm:w-auto flex justify-center">
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
