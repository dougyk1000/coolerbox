import React from 'react';
import { ShieldCheck, LogIn, Cpu, Zap, Activity, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useFirebase } from './FirebaseProvider';
import { useTheme } from './ThemeContext';
import { cn } from '../lib/utils';
import { LegalModal } from './Legal';
import { HardwareUnit } from './HardwareUnit';

import logoLight from '../logo.png';
import logoDark from '../logo-dark.png';

export const Login = () => {
  const { signIn } = useFirebase();
  const { theme, toggleTheme } = useTheme();
  const [legal, setLegal] = React.useState<{ open: boolean; tab: 'TERMS' | 'PRIVACY' }>({ open: false, tab: 'TERMS' });

  return (
    <div className="h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-8 relative overflow-hidden select-none transition-colors duration-300">
      {/* Background Polish Elements */}
      <div className="absolute inset-0 bg-radial-at-t from-cyan-900/10 to-transparent opacity-50" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(currentColor 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
      
      {/* Theme Toggle for Login Page */}
      <button 
        onClick={toggleTheme}
        className="absolute top-8 right-8 p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--card-bg)]/20 transition-all z-20"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="z-10 w-full max-w-sm flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-8 relative">
          <HardwareUnit className="absolute -top-12 -z-10 w-64 h-64 opacity-10" glow={false} />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-40 h-40 sm:w-64 sm:h-64 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center shadow-[0_0_80px_rgba(6,182,212,0.15)] transition-all"
          >
            <img 
              key={theme}
              src={theme === 'dark' ? logoDark : logoLight} 
              alt="VagaFlow" 
              className="w-32 h-32 sm:w-48 sm:h-48 object-contain transition-all duration-500" 
            />
          </motion.div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-light tracking-[0.3em] uppercase italic">VAGAFLOW <span className="text-cyan-500 font-bold not-italic">OS.1</span></h1>
            <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.4em]">Neuro-Interface v3.11.2</p>
          </div>
        </div>

        <div className="space-y-6 w-full">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-5 theme-card flex flex-col gap-3 group hover:border-[var(--accent-cyan)]/20 transition-all">
              <Cpu className="w-4 h-4 text-cyan-500" />
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-20">System</span>
                <span className="text-xs font-medium opacity-60 block">Biometric AI</span>
              </div>
            </div>
            <div className="p-5 theme-card flex flex-col gap-3 group hover:border-[var(--accent-cyan)]/20 transition-all">
              <Zap className="w-4 h-4 text-cyan-500" />
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-20">Latency</span>
                <span className="text-xs font-medium opacity-60 block">Sub-2ms</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={signIn}
            className="w-full theme-btn-primary py-5 rounded-2xl flex items-center justify-center gap-4 group"
          >
            <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Establish Secure Link</span>
          </motion.button>
          
          <div className="text-[9px] text-center space-y-1">
            <p className="opacity-20 font-bold uppercase tracking-widest leading-relaxed">
              Link establishment constitutes acceptance <br/> of the vagal system optimization protocol.
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setLegal({ open: true, tab: 'TERMS' })} className="text-cyan-500/40 hover:text-cyan-500 transition-colors uppercase tracking-[0.2em] font-black">Terms</button>
              <button onClick={() => setLegal({ open: true, tab: 'PRIVACY' })} className="text-cyan-500/40 hover:text-cyan-500 transition-colors uppercase tracking-[0.2em] font-black">Privacy</button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 flex items-center gap-8 opacity-40">
        <div className="flex items-center gap-2">
           <Activity className="w-3 h-3 text-cyan-500" />
           <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase opacity-40 italic">Stability Confirmed</span>
        </div>
      </div>

      <AnimatePresence>
        {legal.open && (
          <LegalModal 
            isOpen={legal.open} 
            onClose={() => setLegal({ ...legal, open: false })} 
            tab={legal.tab} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

