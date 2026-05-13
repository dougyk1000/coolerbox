import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Target, 
  Moon, 
  AlertTriangle, 
  ChevronRight,
  ShieldAlert,
  Mic2
} from 'lucide-react';
import { cn } from '../lib/utils';

const trainingModes = [
  {
    id: 'public-speaking',
    title: 'Presentation Pro',
    desc: 'Simulate high-stakes communication load.',
    icon: Mic2,
    intensity: 'High',
    duration: '15m'
  },
  {
    id: 'tactical-focus',
    title: 'Tactical Focus',
    desc: 'Maintain composure under acute load.',
    icon: Target,
    intensity: 'Extreme',
    duration: '30m'
  },
  {
    id: 'sleep-recovery',
    title: 'Sleep Recovery',
    desc: 'Rapid parasympathetic down-regulation.',
    icon: Moon,
    intensity: 'Low',
    duration: '10m'
  },
  {
    id: 'panic-interrupt',
    title: 'Panic Interrupt',
    desc: 'Emergency neuro-stabilization bypass.',
    icon: ShieldAlert,
    intensity: 'Critical',
    duration: '2m'
  }
];

export const Training = () => {
  const [activeModule, setActiveModule] = React.useState<string | null>(null);
  const [count, setCount] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [misses, setMisses] = React.useState(0);
  const [targetPos, setTargetPos] = React.useState({ x: 50, y: 50 });
  const [isComplete, setIsComplete] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [speakingMetrics, setSpeakingMetrics] = React.useState({ pitch: 50, pace: 50, clarity: 50 });
  const [stressLevel, setStressLevel] = React.useState(0);

  // Module interaction logic
  React.useEffect(() => {
    if (!activeModule || isComplete) return;

    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          return 100;
        }
        return p + 0.5; // Roughly 20 seconds for demo purposes
      });
    }, 100);

    if (activeModule === 'tactical-focus') {
      const interval = setInterval(() => {
        setTargetPos({
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 80
        });
      }, Math.max(400, 1000 - progress * 5)); // Gets faster
      return () => {
        clearInterval(timer);
        clearInterval(interval);
      };
    }

    if (activeModule === 'public-speaking') {
      const interval = setInterval(() => {
        setSpeakingMetrics({
          pitch: 40 + Math.random() * 20 + (progress / 10), // Pitch rises with stress
          pace: 45 + Math.random() * 10 + (progress / 5),  // Pace speeds up with stress
          clarity: 80 - Math.random() * 15 - (progress / 10) // Clarity drops with stress
        });
        setStressLevel(progress);
      }, 500);
      return () => {
        clearInterval(timer);
        clearInterval(interval);
      };
    }

    return () => clearInterval(timer);
  }, [activeModule, isComplete]);

  const handleAbort = () => {
    setActiveModule(null);
    setScore(0);
    setMisses(0);
    setCount(0);
    setIsComplete(false);
    setProgress(0);
    setStressLevel(0);
  };

  if (activeModule) {
    const mode = trainingModes.find(m => m.id === activeModule);
    
    return (
      <div className="h-full flex flex-col items-center justify-center p-4 sm:p-8 space-y-6 sm:space-y-12 max-w-4xl mx-auto text-center relative">
        <div className="absolute top-8 left-8 flex items-center gap-4 text-left">
          <motion.div 
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            className="w-12 h-12 rounded-xl bg-[var(--accent-cyan)]/10 flex items-center justify-center"
          >
            {mode && <mode.icon className="w-6 h-6 text-[var(--accent-cyan)]" />}
          </motion.div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--text-primary)]">{mode?.title}</h2>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest font-mono">
                {isComplete ? 'CALIBRATION COMPLETE' : 'SYSTEM ACTIVE'}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Zones based on Module */}
        <div className="w-full flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {isComplete ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="w-24 h-24 rounded-full border-2 border-cyan-500 flex items-center justify-center mx-auto bg-cyan-500/10 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                  <motion.div 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    className="w-10 h-10 border-b-2 border-r-2 border-cyan-400 rotate-45 mb-2 mr-1"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-light uppercase tracking-widest text-[var(--text-primary)]">Resilience Synced</h3>
                  <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em]">Module optimization successful</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center justify-center"
              >
                {activeModule === 'public-speaking' && (
                  <div className="space-y-10 w-full max-w-lg">
                    <div className="flex justify-between items-end">
                      <div className="text-left space-y-1">
                        <div className="text-3xl font-light tracking-tighter text-[var(--text-primary)] uppercase flex items-baseline gap-1">
                          <span>Live Input</span>
                          <span className="text-xs text-cyan-400 animate-pulse">REC</span>
                        </div>
                        <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Voice Analysis Active</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] font-bold text-red-400 uppercase tracking-widest mb-1">Crowd Agitation</div>
                        <div className="flex gap-1">
                          {[...Array(10)].map((_, i) => (
                            <div 
                              key={i} 
                              className={cn(
                                "w-1 h-3 rounded-full transition-all duration-500",
                                i < (stressLevel / 10) ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-white/5"
                              )} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: 'Pitch', value: speakingMetrics.pitch, unit: 'Hz', norm: 50 },
                        { label: 'Pace', value: speakingMetrics.pace, unit: 'WPM', norm: 50 },
                        { label: 'Clarity', value: speakingMetrics.clarity, unit: '%', norm: 85 }
                      ].map((m) => (
                        <div key={m.label} className="theme-card p-4 border border-[var(--card-border)] bg-[var(--card-bg)]/20">
                          <div className="text-[8px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">{m.label}</div>
                          <div className="text-xl font-mono font-bold text-[var(--text-primary)] mb-2">
                             {Math.round(m.value)}
                             <span className="text-[8px] ml-0.5 opacity-50">{m.unit}</span>
                          </div>
                          <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              animate={{ 
                                width: `${m.value}%`,
                                backgroundColor: m.value > m.norm + 20 || m.value < m.norm - 20 ? '#ef4444' : '#22d3ee'
                              }}
                              className="h-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="relative h-32 flex items-center justify-center border-y border-[var(--card-border)] bg-[var(--card-bg)]/10 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-20">
                        {[...Array(40)].map((_, i) => (
                          <motion.div 
                            key={i}
                            animate={{ 
                              height: [10, 30 + Math.random() * 50, 10],
                              opacity: [0.1, 0.4, 0.1]
                            }}
                            transition={{ 
                              duration: 0.5 + Math.random(), 
                              repeat: Infinity, 
                              delay: i * 0.02 
                            }}
                            className="w-0.5 bg-cyan-500 rounded-full"
                          />
                        ))}
                      </div>
                      <div className="relative z-10 text-center space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">Biological Synchronization</div>
                        <div className="text-[8px] font-mono text-[var(--text-secondary)]">LATENCY: 12ms | BUFF: 512kb</div>
                      </div>
                    </div>

                    <div className="p-4 border border-red-500/10 rounded-xl bg-red-500/5">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-red-400/80">
                        {stressLevel > 70 ? "WARNING: Crowd tension elevated. Regulate breathing to stabilize." : "Maintain baseline pace. Simulated crowd is neutral."}
                      </p>
                    </div>
                  </div>
                )}

                {activeModule === 'tactical-focus' && (
                  <div className="relative w-full aspect-square max-w-[400px] border border-[var(--card-border)] rounded-3xl bg-[var(--card-bg)]/30 overflow-hidden backdrop-blur-sm group">
                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Composure Score</div>
                        <div className="text-xl font-mono font-bold text-cyan-400">{score}</div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Sync Drift</div>
                        <div className="text-xl font-mono font-bold text-red-500">{misses}</div>
                      </div>
                    </div>
                    
                    {/* Background Grid */}
                    <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-[0.03] pointer-events-none">
                      {[...Array(64)].map((_, i) => (
                        <div key={i} className="border border-white/10" />
                      ))}
                    </div>

                    <AnimatePresence>
                      {!isComplete && (
                        <motion.button
                          key={`${targetPos.x}-${targetPos.y}`}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 1.5, opacity: 0 }}
                          style={{ 
                            left: `${targetPos.x}%`,
                            top: `${targetPos.y}%`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setScore(s => s + 15);
                          }}
                          className="absolute w-14 h-14 -ml-7 -mt-7 flex items-center justify-center group active:scale-95 transition-transform"
                        >
                           <div className="absolute inset-0 border-2 border-cyan-500 rounded-lg rotate-45 animate-pulse-slow" />
                           <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                           <div className="absolute -top-4 text-[8px] font-mono text-cyan-500 font-bold">LOCKED</div>
                        </motion.button>
                      )}
                    </AnimatePresence>

                    {/* Miss Trigger Area */}
                    <div 
                      className="absolute inset-0" 
                      onClick={() => setMisses(m => m + 1)}
                    />

                    <motion.div 
                      animate={{ opacity: [0, 0.4, 0] }}
                      transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                      className="absolute inset-0 pointer-events-none bg-red-500/10" 
                    />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                       <div className="text-[8px] font-mono text-cyan-400/40 uppercase tracking-[0.4em]">Calibration Target Active</div>
                       <div className="w-24 h-0.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-1/2 h-full bg-cyan-500/40"
                          />
                       </div>
                    </div>
                  </div>
                )}

                {activeModule === 'panic-interrupt' && (
                  <div className="space-y-16">
                    <div className="relative">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-5xl sm:text-6xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500"
                      >
                        LOCK TARGET
                      </motion.div>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                      {['STABILITY', 'RHYTHM', 'FOCUS', 'GROUND'].map((word, i) => (
                        <button 
                          key={word}
                          onClick={() => setCount(c => c + 1)}
                          className="group relative px-6 py-6 border border-[var(--card-border)] rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all active:scale-95"
                        >
                          <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors" />
                          <div className="text-[10px] font-black tracking-widest text-[var(--text-primary)]">{word}</div>
                          <div className="absolute bottom-1 right-2 text-[8px] font-mono text-[var(--text-muted)] opacity-30">0{i+1}</div>
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex gap-2">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            i < count ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "bg-[var(--card-border)]"
                          )} />
                        ))}
                      </div>
                      <div className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em]">Sensory Re-anchoring</div>
                    </div>
                  </div>
                )}

                {activeModule === 'sleep-recovery' && (
                  <div className="space-y-16">
                    <div className="relative w-64 h-64 flex items-center justify-center">
                      <motion.div 
                         animate={{ 
                           scale: [0.8, 1.8, 0.8],
                           opacity: [0.1, 0.4, 0.1]
                         }}
                         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                         className="absolute inset-0 bg-blue-500 rounded-full blur-[60px]"
                      />
                      <motion.div 
                         animate={{ scale: [0.95, 1.1, 0.95] }}
                         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                         className="w-48 h-48 rounded-full border border-blue-500/20 flex items-center justify-center relative overflow-hidden"
                      >
                         <div className="absolute inset-0 border border-blue-500/10 rounded-full animate-pulse" />
                         <div className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.4em]">Coherence</div>
                      </motion.div>
                    </div>
                    <div className="grid grid-cols-3 gap-8 text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)]">
                       <div className="space-y-1">
                         <div className="text-xs text-[var(--text-primary)]">4S</div>
                         <div>Inhale</div>
                       </div>
                       <div className="space-y-1">
                         <div className="text-xs text-[var(--text-primary)]">2S</div>
                         <div>Pause</div>
                       </div>
                       <div className="space-y-1">
                         <div className="text-xs text-[var(--text-primary)]">6S</div>
                         <div>Exhale</div>
                       </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="w-full space-y-6 max-w-sm">
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[8px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">Load Cycle</span>
              <span className="text-[8px] font-mono font-bold text-cyan-400">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-[var(--card-bg)] h-1.5 rounded-full overflow-hidden border border-[var(--card-border)]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              />
            </div>
          </div>
          <button 
            onClick={handleAbort}
            className="w-full py-4 border border-[var(--card-border)] hover:border-red-500/30 text-[var(--text-secondary)] hover:text-red-400 rounded-xl uppercase text-[10px] font-bold tracking-widest bg-[var(--card-bg)]/20 transition-all flex items-center justify-center gap-2 group"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] group-hover:bg-red-500 transition-colors" />
            {isComplete ? 'Exit Module' : 'Abort Optimization'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-10 max-w-5xl mx-auto pb-24">
      <div className="border-l-2 border-[var(--accent-cyan)] pl-4 space-y-1">
        <h2 className="text-xl sm:text-2xl font-light tracking-tight text-[var(--text-primary)] uppercase">Training</h2>
        <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--text-secondary)] uppercase">Resilience modules</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {trainingModes.map((mode, i) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setActiveModule(mode.id)}
            className="group theme-card p-4 sm:p-6 border border-[var(--card-border)] hover:bg-[var(--card-bg)]/20 transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center group-hover:border-[var(--accent-cyan)]/50 group-hover:text-[var(--accent-cyan)] transition-all shrink-0">
                <mode.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              
              <div className="space-y-1">
                <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">{mode.title}</div>
                <div className="text-[9px] sm:text-[10px] text-[var(--text-secondary)] leading-relaxed font-medium max-w-[160px] sm:max-w-[200px]">{mode.desc}</div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2 sm:gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[8px] sm:text-[9px] font-mono font-bold text-[var(--text-muted)]">{mode.duration}</span>
                <span className={cn(
                  "text-[8px] sm:text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm",
                  mode.intensity === 'Extreme' || mode.intensity === 'Critical' ? "bg-red-500/10 text-red-400" : "bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]"
                )}>
                  {mode.intensity}
                </span>
              </div>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-cyan)] transform group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Insight Block */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--accent-cyan)]/20 flex items-start gap-4 sm:gap-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--accent-cyan)]/10 flex items-center justify-center shrink-0">
           <AlertTriangle className="w-5 h-5 text-[var(--accent-cyan)]" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-cyan)]">Tactical Strategy</span>
            <div className="h-px flex-1 bg-[var(--accent-cyan)]/20" />
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] font-light italic">
            "Your HRV peaks between 09:00—12:45. Schedule high-stakes communication during this window for optimal composure. Use Presentation Pro mode 15 minutes before for baseline calibration."
          </p>
        </div>
      </div>
    </div>
  );
};
