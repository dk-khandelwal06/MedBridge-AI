import React from 'react';
import { Wifi, Battery, Signal, Smartphone, Monitor } from 'lucide-react';

interface DeviceSimulatorFrameProps {
  children: React.ReactNode;
  isSimulatorActive: boolean;
  onToggleSimulator: () => void;
}

export const DeviceSimulatorFrame: React.FC<DeviceSimulatorFrameProps> = ({
  children,
  isSimulatorActive,
  onToggleSimulator,
}) => {
  if (!isSimulatorActive) {
    return <div className="min-h-screen bg-paper-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-ink-950 py-6 px-4 flex flex-col items-center justify-center relative overflow-x-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-clinical-teal/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating Viewport Mode Switcher */}
      <div className="mb-4 flex items-center gap-3 z-30">
        <div className="flex items-center gap-2 bg-ink-900 border border-ink-800 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-clinical-mint animate-pulse"></span>
          <span>iQOO 2026 Mobile Viewport (390 × 844)</span>
        </div>

        <button
          onClick={onToggleSimulator}
          className="px-3 py-1.5 rounded-full bg-clinical-teal text-ink-950 font-bold text-xs hover:bg-clinical-tealLight transition-colors flex items-center gap-1.5 shadow-glow-teal"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Expand Full Screen</span>
        </button>
      </div>

      {/* Phone Hardware Mockup Bezel */}
      <div className="w-full max-w-[410px] h-[864px] bg-ink-900 rounded-[52px] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.6)] border-4 border-ink-700/80 relative flex flex-col overflow-hidden">
        {/* Dynamic Island / Hardware Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-end px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-ink-900 border border-ink-700"></div>
        </div>

        {/* Mobile Status Bar (09:41, Cellular, Wifi, Battery) */}
        <div className="pt-2 px-6 pb-1 flex justify-between items-center text-xs font-bold text-ink-900 select-none z-40 bg-paper-50 rounded-t-[40px]">
          <span className="font-mono text-[11px] text-ink-800">09:41</span>
          <div className="flex items-center gap-1.5 text-ink-800">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* App Viewport Inner Scroll Container */}
        <div className="flex-1 bg-paper-100 rounded-b-[40px] overflow-y-auto relative no-scrollbar">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-ink-400/60 rounded-full z-50 pointer-events-none"></div>
      </div>
    </div>
  );
};
