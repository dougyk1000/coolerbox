import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, Dumbbell, Brain, ChevronRight, Zap, Target, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

// Import the specialized views
import { Analytics } from './Analytics';
import { Training } from './Training';
import { Insights } from './Insights';

type AdvancedTab = 'ANALYTICS' | 'TRAINING' | 'INSIGHTS' | 'MENU';

export const Advanced = () => {
  const [activeTab, setActiveTab] = useState<AdvancedTab>('MENU');

  const menuItems = [
    { 
      id: 'ANALYTICS', 
      label: 'Analytics', 
      desc: 'HRV cycles & recovery', 
      icon: BarChart3,
      color: 'text-cyan-400'
    },
    { 
      id: 'TRAINING', 
      label: 'Training', 
      desc: 'Resilience & focus', 
      icon: Dumbbell,
      color: 'text-white'
    },
    { 
      id: 'INSIGHTS', 
      label: 'Insights', 
      desc: 'Pattern recognition', 
      icon: Brain,
      color: 'text-cyan-400'
    },
  ];

  if (activeTab !== 'MENU') {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 sm:p-6 border-b border-[var(--separator)] flex items-center justify-between bg-[var(--bg-primary)]/40 backdrop-blur-md sticky top-0 z-10 transition-colors duration-300">
          <button 
            onClick={() => setActiveTab('MENU')}
            className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ChevronRight className="w-3 h-3 rotate-180" />
            Lab
          </button>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
            Lab / {activeTab}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'ANALYTICS' && <Analytics />}
          {activeTab === 'TRAINING' && <Training />}
          {activeTab === 'INSIGHTS' && <Insights />}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-10 max-w-5xl mx-auto pb-24">
      <div className="border-l-2 border-[var(--accent-cyan)] pl-4 space-y-1">
        <h2 className="text-xl sm:text-2xl font-light tracking-tight text-[var(--text-primary)] uppercase">System Lab</h2>
        <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--text-secondary)] uppercase">Performance Tools</p>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setActiveTab(item.id as AdvancedTab)}
            className="group theme-card p-4 sm:p-6 flex items-center justify-between hover:bg-[var(--card-bg)]/20 transition-all text-left"
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center group-hover:border-[var(--accent-cyan)]/50 transition-all shrink-0">
                <item.icon className={cn("w-5 h-5 sm:w-6 sm:h-6", item.id === 'TRAINING' ? 'text-[var(--text-primary)]' : item.color)} />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--text-primary)]">{item.label}</div>
                <div className="text-[9px] sm:text-[10px] text-[var(--text-secondary)] font-medium tracking-wide mt-1">{item.desc}</div>
              </div>
            </div>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transform group-hover:translate-x-1 transition-all" />
          </motion.button>
        ))}
      </div>

      {/* Lab Stats Summary */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="p-6 theme-card space-y-3">
          <div className="flex items-center gap-2 text-[var(--accent-cyan)]">
            <Zap className="w-3 h-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Efficiency</span>
          </div>
          <div className="text-2xl font-light text-[var(--text-primary)]">98.2%</div>
        </div>
        <div className="p-6 theme-card space-y-3">
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <TrendingUp className="w-3 h-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Growth</span>
          </div>
          <div className="text-2xl font-light text-[var(--text-primary)]">+12.4%</div>
        </div>
      </div>
    </div>
  );
};
