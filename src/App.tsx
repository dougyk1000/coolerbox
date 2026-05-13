/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Wind, 
  Settings as SettingsIcon,
  ShieldCheck,
  Zap,
  Battery,
  LogOut,
  Sun,
  Moon,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { useFirebase } from './components/FirebaseProvider';
import { Login } from './components/Login';
import { useTheme } from './components/ThemeContext';
import { LegalModal } from './components/Legal';
import { useHardware } from './components/HardwareContext';

// Components
import { Home } from './components/Home';
import { Regulate } from './components/Regulate';
import { Advanced } from './components/Advanced';
import { About } from './components/About';

type View = 'HOME' | 'REGULATE' | 'ADVANCED' | 'ABOUT';

import logoLight from './logo.png';
import logoDark from './logo-dark.png';

export default function App() {
  const { user, loading, signOut } = useFirebase();
  const { theme, toggleTheme } = useTheme();
  const { isConnected, isConnecting, batteryLevel, connect } = useHardware();
  const [currentView, setCurrentView] = useState<View>('HOME');
  const [showSettings, setShowSettings] = useState(false);
  const [legal, setLegal] = useState<{ open: boolean; tab: 'TERMS' | 'PRIVACY' }>({ open: false, tab: 'TERMS' });

  if (loading) {
    return (
      <div className="h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <motion.div 
          animate={{ scale: [0.98, 1.02, 0.98], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <img 
            key={theme}
            src={theme === 'dark' ? logoDark : logoLight} 
            alt="Logo" 
            className="w-32 h-32 sm:w-48 sm:h-48 object-contain transition-all duration-500" 
          />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const navItems = [
    { id: 'HOME', icon: Activity, label: 'Core' },
    { id: 'REGULATE', icon: Wind, label: 'Regulate' },
    { id: 'ADVANCED', icon: Zap, label: 'Advanced' },
    { id: 'ABOUT', icon: ShieldCheck, label: 'About' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans overflow-hidden select-none transition-colors duration-300">
      {/* Top Bar - Refined Professional Look */}
      <header className="h-16 sm:h-20 border-b border-[var(--separator)] flex items-center justify-between px-4 sm:px-8 bg-[var(--bg-primary)] z-50 shrink-0 transition-colors duration-300">
        <div className="flex items-center gap-4">
          <img 
            key={theme}
            src={theme === 'dark' ? logoDark : logoLight} 
            alt="VagaFlow Logo" 
            className="h-10 sm:h-12 md:h-14 w-auto object-contain" 
          />
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-[10px] tracking-[0.2em] font-bold uppercase transition-all">
          <div 
            onClick={() => !isConnected && !isConnecting && connect()}
            className={cn(
              "flex items-center gap-2 cursor-pointer transition-colors",
              !isConnected && !isConnecting && "hover:text-cyan-400"
            )}
          >
            <div className={cn(
              "w-2 h-2 rounded-full",
              isConnected ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" : 
              isConnecting ? "bg-amber-500 animate-pulse" : "bg-[var(--text-primary)]/10"
            )} />
            <span className="hidden xs:inline-block">
              {isConnected ? "LINKED" : isConnecting ? "CONNECTING..." : "NO EARPIECE"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-40">BATT</span>
            <span className={cn(!isConnected && "opacity-20")}>
              {isConnected ? `${batteryLevel}%` : "N/A"}
            </span>
          </div>
          <div className="hidden sm:block h-4 w-px border-l border-[var(--separator)]" />
          <div 
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 hover:text-cyan-400 transition-colors relative cursor-pointer"
          >
            <SettingsIcon className="w-4 h-4" />
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute top-10 right-0 w-48 bg-[var(--bg-primary)] border border-[var(--card-border)] rounded-xl p-1 shadow-2xl z-50 cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                     onClick={toggleTheme}
                     className="w-full flex items-center justify-between px-3 py-2 hover:bg-[var(--card-bg)]/20 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-colors mb-1"
                  >
                    <div className="flex items-center gap-3">
                      {theme === 'dark' ? <Sun className="w-3 h-3 text-cyan-400" /> : <Moon className="w-3 h-3 text-cyan-400" />}
                      Appearance
                    </div>
                    <span className="opacity-40">{theme}</span>
                  </button>
                  <div className="h-px bg-[var(--separator)] my-1" />
                  <button 
                     onClick={() => setLegal({ open: true, tab: 'TERMS' })}
                     className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[var(--card-bg)]/20 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-colors mb-1"
                  >
                    <FileText className="w-3 h-3 text-cyan-500" />
                    Terms of Use
                  </button>
                  <button 
                     onClick={() => setLegal({ open: true, tab: 'PRIVACY' })}
                     className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[var(--card-bg)]/20 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-colors mb-1"
                  >
                    <ShieldCheck className="w-3 h-3 text-cyan-500" />
                    Privacy Policy
                  </button>
                  <div className="h-px bg-[var(--separator)] my-1" />
                  <button 
                     onClick={signOut}
                     className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[var(--card-bg)]/20 rounded-lg text-[9px] font-bold uppercase tracking-widest text-red-400 transition-colors"
                  >
                    <LogOut className="w-3 h-3" />
                    Unlink
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative flex flex-col">
        <div className="absolute inset-0 bg-radial-at-t from-cyan-900/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(currentColor 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
        
        <div className="flex-1 overflow-y-auto relative custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              {currentView === 'HOME' && <Home onStartRegulate={() => setCurrentView('REGULATE')} />}
              {currentView === 'REGULATE' && <Regulate onEnd={() => setCurrentView('HOME')} />}
              {currentView === 'ADVANCED' && <Advanced />}
              {currentView === 'ABOUT' && <About />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="h-20 border-t border-[var(--separator)] px-4 sm:px-8 flex items-center justify-center bg-[var(--bg-primary)] shrink-0 transition-colors duration-300">
        <nav className="flex items-center gap-4 sm:gap-12 w-full max-w-md justify-around sm:justify-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as View)}
                className={cn(
                  "flex flex-col items-center gap-1.5 transition-all duration-300 relative py-2 min-w-[64px]",
                  isActive ? "text-cyan-400" : "text-[var(--text-primary)]/20 hover:text-[var(--text-primary)]/60"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive && "scale-110"
                )} />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute -bottom-[20px] left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                  />
                )}
              </button>
            );
          })}
        </nav>
      </footer>

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
}

