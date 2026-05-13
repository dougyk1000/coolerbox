import React from 'react';
import { motion } from 'motion/react';
import { X, Shield, FileText, Scale, Lock, Eye, AlertTriangle, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  tab?: 'TERMS' | 'PRIVACY';
}

export const LegalModal = ({ isOpen, onClose, tab: initialTab = 'TERMS' }: LegalModalProps) => {
  const [activeTab, setActiveTab] = React.useState<'TERMS' | 'PRIVACY'>(initialTab);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-[var(--bg-primary)] border border-[var(--separator)] w-full max-w-4xl h-[80vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--separator)] flex items-center justify-between bg-[var(--card-bg)]/50">
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('TERMS')}
              className={cn(
                "px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg",
                activeTab === 'TERMS' ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              Terms of Use
            </button>
            <button 
              onClick={() => setActiveTab('PRIVACY')}
              className={cn(
                "px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg",
                activeTab === 'PRIVACY' ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              Privacy Policy
            </button>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[var(--card-bg)] rounded-full transition-colors text-[var(--text-secondary)] hover:text-red-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 scrollbar-thin scrollbar-thumb-cyan-500/20">
          {activeTab === 'TERMS' ? (
            <div className="space-y-8">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Scale className="w-4 h-4" />
                  <h2 className="text-sm font-black uppercase tracking-[0.2em]">1. Acceptance of Protocol</h2>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                  By initializing the VagaFlow system, you acknowledge that you are entering into a binding legal agreement. This software is a physiological optimization tool. Your use of the interface constitutes absolute acceptance of these terms. If you do not agree to the biological and operational standards outlined herein, you must terminate your session immediately.
                </p>
              </section>

              <section className="space-y-4 p-4 border border-red-500/20 bg-red-500/5 rounded-xl">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  <h2 className="text-sm font-black uppercase tracking-[0.2em]">2. Medical Disclaimer</h2>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light italic">
                  VAGAFLOW IS NOT A MEDICAL DEVICE. It is designed for informational and training purposes only. It is not intended for use in the diagnosis, cure, mitigation, treatment, or prevention of any disease or health condition. Consult with a licensed medical professional before engaging in high-load physiological training.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Lock className="w-4 h-4" />
                  <h2 className="text-sm font-black uppercase tracking-[0.2em]">3. Operational Use</h2>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                  You agree to use VagaFlow only for lawful purposes. Prohibited activities include but are not limited to: reverse engineering the vagal resonance algorithms, attempting to spoof physiological data, or using the system to automate any non-human biological response.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Shield className="w-4 h-4" />
                  <h2 className="text-sm font-black uppercase tracking-[0.2em]">4. Intellectual Property</h2>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                  All interfaces, branding, and proprietary resonance protocols remain the exclusive property of VagaFlow. No license is granted to reproduce or modify the tactical aesthetic of the application.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-8">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Eye className="w-4 h-4" />
                  <h2 className="text-sm font-black uppercase tracking-[0.2em]">1. Data Collection Architecture</h2>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                  VagaFlow processes physiological metrics including Heart Rate (HR), Heart Rate Variability (HRV), and Respiratory Coordination. This data is processed locally on your device to ensure maximum "Zero-Leak" integrity.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Lock className="w-4 h-4" />
                  <h2 className="text-sm font-black uppercase tracking-[0.2em]">2. Tactical Privacy</h2>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                  We do not sell, trade, or transfer your physiological signature to third parties. Your biological data is yours alone. Our encryption protocols utilize AES-256 standards to wrap all "Intel" logs.
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Zap className="w-4 h-4" />
                  <h2 className="text-sm font-black uppercase tracking-[0.2em]">3. Third-Party Integration</h2>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                  Authentication is handled via industry-standard protocols. When using Google authentication, only the baseline identity metrics required for account verification are requested. We do not access your external files or personal correspondence.
                </p>
              </section>

              <section className="space-y-4 p-4 border border-cyan-500/20 bg-cyan-500/5 rounded-xl">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Shield className="w-4 h-4" />
                  <h2 className="text-sm font-black uppercase tracking-[0.2em]">4. User Rights</h2>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-light">
                  You maintain the absolute right to purge all locally cached data at any time via the System Reset module. VagaFlow operates on a "Full-Erasure" principle.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[var(--separator)] bg-[var(--card-bg)]/20 flex justify-end">
          <button 
            onClick={onClose}
            className="theme-btn-primary px-8 py-2 text-[10px] font-bold tracking-widest uppercase"
          >
            Acknowledge
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
