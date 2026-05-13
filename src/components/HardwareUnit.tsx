import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface HardwareUnitProps {
  className?: string;
  glow?: boolean;
}

export const HardwareUnit = ({ className, glow = true }: HardwareUnitProps) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer Glow / Aura */}
      {glow && (
        <motion.div
          animate={{ 
            opacity: [0.1, 0.25, 0.1],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"
        />
      )}

      {/* The Schematic Device */}
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Body Chassis */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d="M60 40C60 28.9543 68.9543 20 80 20H120C131.046 20 140 28.9543 140 40V160C140 171.046 131.046 180 120 180H80C68.9543 180 60 171.046 60 160V40Z"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-cyan-500/40"
        />

        {/* Inner Technical Lines */}
        <path d="M75 20V180" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="text-cyan-500/20" />
        <path d="M125 20V180" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="text-cyan-500/20" />
        <path d="M60 150H140" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="text-cyan-500/20" />
        
        {/* The "Vaga-Core" */}
        <motion.circle
          cx="100"
          cy="100"
          r="25"
          stroke="currentColor"
          strokeWidth="2"
          className="text-cyan-500"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx="100" cy="100" r="10" fill="currentColor" className="text-cyan-400" />
        
        {/* Sensor Array Details */}
        <rect x="85" y="45" width="30" height="4" rx="2" fill="currentColor" className="text-cyan-500/30" />
        <rect x="90" y="55" width="20" height="2" rx="1" fill="currentColor" className="text-cyan-500/20" />
        
        {/* Connectivity Nodes */}
        <circle cx="100" cy="165" r="3" fill="currentColor" className="text-cyan-500" />
        <path d="M90 165H110" stroke="currentColor" strokeWidth="1" className="text-cyan-500/40" />

        {/* External Branding Frame */}
        <path d="M40 80L30 100L40 120" stroke="currentColor" strokeWidth="1" className="text-cyan-500/30" />
        <path d="M160 80L170 100L160 120" stroke="currentColor" strokeWidth="1" className="text-cyan-500/30" />
        
        {/* Decorative Data Pointers */}
        <text x="145" y="40" fontSize="6" fill="currentColor" className="text-cyan-500/40 font-mono font-bold uppercase">v-unit x1</text>
        <text x="30" y="150" fontSize="5" fill="currentColor" className="text-cyan-500/40 font-mono uppercase">biometric-link-0</text>
      </svg>
    </div>
  );
};
