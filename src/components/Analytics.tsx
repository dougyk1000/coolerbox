import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Calendar, ChevronRight, TrendingUp, Zap, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from './ThemeContext';

const stressData = [
  { time: '08:00', level: 25 },
  { time: '10:00', level: 45 },
  { time: '12:00', level: 68 },
  { time: '14:00', level: 82 },
  { time: '16:00', level: 55 },
  { time: '18:00', level: 40 },
  { time: '20:00', level: 65 },
  { time: '22:00', level: 30 },
];

const hrvData = [
  { day: 'Mon', value: 72 },
  { day: 'Tue', value: 78 },
  { day: 'Wed', value: 65 },
  { day: 'Thu', value: 88 },
  { day: 'Fri', value: 84 },
  { day: 'Sat', value: 92 },
  { day: 'Sun', value: 95 },
];

export const Analytics = () => {
  const { theme } = useTheme();
  const [isSyncing, setIsSyncing] = React.useState(false);
  const accentColor = theme === 'dark' ? '#22d3ee' : '#0891b2';
  const mutedTextColor = theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.2)';
  const tooltipBg = theme === 'dark' ? '#05070a' : '#ffffff';

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-10 max-w-5xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-l-2 border-[var(--accent-cyan)] pl-4 gap-4">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-light tracking-tight text-[var(--text-primary)] uppercase">Physiological Intel</h2>
          <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--text-secondary)] uppercase">Weekly analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSync}
            className={cn(
              "p-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-[var(--card-bg)]/40 transition-all",
              isSyncing && "animate-spin text-[var(--accent-cyan)]"
            )}
          >
            <Zap className="w-3.5 h-3.5" />
          </button>
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--card-bg)] px-4 py-2 rounded-xl border border-[var(--card-border)] hover:bg-[var(--card-bg)]/20 transition-colors">
            <Calendar className="w-3 h-3" />
            <span>7 Days</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--accent-cyan)]/5 border border-[var(--accent-cyan)]/20 relative group overflow-hidden">
          <div className="relative z-10">
            <div className="text-[10px] font-bold text-[var(--accent-cyan)] uppercase tracking-[0.2em] mb-4">Core Adaptability</div>
            <div className="text-4xl sm:text-5xl font-light text-[var(--text-primary)] transition-all">84<span className="text-xs sm:text-sm ml-2 text-[var(--accent-cyan)] font-bold">MS / HRV</span></div>
            <div className="mt-4 sm:mt-6 flex items-center gap-2 text-[9px] sm:text-[10px] font-bold text-[var(--accent-cyan)] uppercase">
              <TrendingUp className="w-3 h-3" />
              <span>+14.2% GAIN</span>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-24 h-24 sm:w-32 sm:h-32 bg-[var(--accent-cyan)]/10 blur-[50px] sm:blur-[60px] group-hover:bg-[var(--accent-cyan)]/20 transition-all rounded-full" />
        </div>
        
        <div className="p-6 sm:p-8 theme-card relative group overflow-hidden">
          <div className="relative z-10">
            <div className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-[0.2em] mb-4">Baseline Composure</div>
            <div className="text-4xl sm:text-5xl font-light text-[var(--text-primary)] transition-all">92.8<span className="text-xs sm:text-sm ml-2 text-[var(--text-muted)] font-bold">% STABLE</span></div>
            <div className="mt-4 sm:mt-6 flex items-center gap-2 text-[9px] sm:text-[10px] font-bold text-[var(--text-secondary)] uppercase">
              <Zap className="w-3 h-3" />
              <span>CONTROL: HIGH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stress Curve */}
        <div className="p-8 theme-card space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-2">Resilience Curve</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-xs">24h physiological load tracking profile.</p>
            </div>
            <div className="p-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]">
               <Info className="w-3 h-3 text-[var(--text-muted)]" />
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stressData}>
                <defs>
                  <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={accentColor} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={accentColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: mutedTextColor, fontSize: 10, fontWeight: 'bold' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, borderRadius: '12px' }}
                  itemStyle={{ color: accentColor }}
                />
                <Area 
                  type="monotone" 
                  dataKey="level" 
                  stroke={accentColor} 
                  fillOpacity={1} 
                  fill="url(#stressGradient)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recovery Trends */}
        <div className="p-8 theme-card space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-2">Vagal Recovery</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-xs">Interventions efficacy trends over 7-day period.</p>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hrvData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: mutedTextColor, fontSize: 10, fontWeight: 'bold' }}
                />
                <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                  {hrvData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value > 85 ? accentColor : (theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)')} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recovery Speed Data Grid */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] pl-2">System Response Logs</h3>
        <div className="grid gap-2">
          {[
            { label: 'Pivot Speed', speed: '1.4s', delta: 'OPTIMAL' },
            { label: 'Sync Retention', speed: '98.2%', delta: 'STABLE' },
            { label: 'Stabilization', speed: '0.8s', delta: 'RESILIENT' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 sm:p-6 theme-card hover:bg-[var(--card-bg)]/20 transition-all cursor-default">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]/80">{item.label}</span>
              <div className="flex items-center gap-4 sm:gap-8">
                <span className="text-xs sm:text-sm font-mono font-bold text-[var(--text-primary)]">{item.speed}</span>
                <div className="w-16 sm:w-20 text-right">
                  <span className={cn(
                    "text-[9px] sm:text-[10px] font-bold uppercase tracking-widest",
                    item.delta === 'OPTIMAL' ? "text-[var(--accent-cyan)]" : "text-[var(--text-muted)]"
                  )}>{item.delta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
