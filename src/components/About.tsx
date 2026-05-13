import React from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Cpu, 
  Globe, 
  Users, 
  Zap, 
  Layers,
  Heart,
  Target
} from 'lucide-react';
import { cn } from '../lib/utils';
import { HardwareUnit } from './HardwareUnit';

export const About = () => {
  return (
    <div className="p-4 sm:p-8 space-y-12 sm:space-y-20 max-w-5xl mx-auto pb-24 overflow-x-hidden">
      {/* Hero Section - The Manifest */}
      <div className="space-y-6 text-center pt-8 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4"
        >
          <Target className="w-3 h-3 text-cyan-400" />
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-cyan-400">VagaFlow Protocol v2.4</span>
        </motion.div>
        
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[var(--text-primary)] leading-[0.9]">
          The Science of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Unbreakable</span> Focus
        </h1>
        
        <p className="text-sm sm:text-lg text-[var(--text-secondary)] font-light max-w-2xl mx-auto uppercase tracking-wide leading-relaxed px-4">
          VagaFlow is not an app. It is a high-performance physiological architecture designed to bridge the gap between biological reactivity and tactical precision.
        </p>
      </div>

      {/* Core Pillars - Tactical Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: "Neural Synergy",
            desc: "Direct integration with the Vagus Nerve via proprietary resonance algorithms to stabilize heart rate variability in high-stress environments.",
            icon: Cpu,
            stat: "99.8% Sync"
          },
          {
            title: "Data Sovereignty",
            desc: "Military-grade encryption ensures your physiological data remains local. We don't store your heartbeat; we optimize it.",
            icon: Shield,
            stat: "AES-256"
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="theme-card p-8 border border-[var(--card-border)] relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <item.icon className="w-32 h-32" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">{item.title}</h3>
                  <p className="text-[10px] font-mono font-bold text-cyan-500/60 uppercase">{item.stat}</p>
                </div>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* The Science - Detailed Section */}
      <div className="relative py-16 px-6 sm:px-12 theme-card bg-[var(--card-bg)]/30 border-y border-[var(--card-border)] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold uppercase tracking-tight text-[var(--text-primary)]">Biological Optimization</h2>
              <div className="h-1 w-20 bg-cyan-500 rounded-full" />
            </div>
            
            <div className="space-y-6">
              {[
                { title: 'Vagal Tone', desc: 'The secret indicator of stress resilience. VagaFlow uses bio-feedback to increase vagal tone in real-time.' },
                { title: 'Parasympathetic Engagement', desc: 'Force your body out of "Fight-or-Flight" and into "Flow-and-Control" state through guided regulation.' },
                { title: 'Cognitive Offloading', desc: 'By stabilizing the heart, we free up cognitive resources for tactical decision making.' }
              ].map((point, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">{point.title}</h4>
                    <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative aspect-square flex items-center justify-center">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 border-[40px] border-cyan-500/5 rounded-full"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="absolute inset-10 border border-cyan-500/10 border-dashed rounded-full"
             />
             <div className="relative space-y-4 text-center flex flex-col items-center">
               <HardwareUnit className="w-32 h-32 sm:w-48 sm:h-48" />
               <div className="space-y-1">
                 <Heart className="w-6 h-6 text-cyan-400 mx-auto animate-pulse" />
                 <div className="text-[10px] font-mono font-black text-cyan-500/40 uppercase tracking-[0.5em]">System Core</div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Meet the Network - Team Placeholder */}
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[var(--text-primary)]">The Operational Team</h2>
          <p className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">Global Node Distribution</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "Unit 01", role: "Architecture", icon: Globe },
            { name: "Unit 02", role: "Biotechnology", icon: Zap },
            { name: "Unit 03", role: "Neural Design", icon: Layers },
            { name: "Unit 04", role: "Security", icon: Users }
          ].map((member, i) => (
            <div key={i} className="p-6 theme-card bg-[var(--card-bg)]/20 border border-[var(--card-border)] text-center space-y-4 hover:bg-cyan-500/5 transition-all">
              <div className="w-12 h-12 rounded-full border border-cyan-500/20 flex items-center justify-center mx-auto">
                <member.icon className="w-5 h-5 text-cyan-500/40" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-widest">{member.name}</div>
                <div className="text-[8px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-10 text-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--separator)] to-transparent mb-16" />
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[var(--text-secondary)] mb-6">Established 2026. Built for the Unbroken.</p>
        <button className="theme-btn-primary px-12 py-4 text-[10px] sm:text-xs">
          ENROLL IN PROTOCOL
        </button>
      </div>
    </div>
  );
};
