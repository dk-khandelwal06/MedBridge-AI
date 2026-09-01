import React from 'react';
import { 
  FileText, 
  Camera, 
  Clock, 
  GitMerge, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  Key, 
  Smartphone, 
  Monitor,
  Info
} from 'lucide-react';
import { AppScreen } from '../types';

interface NavigationProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onOpenScanner: () => void;
  onOpenApiKeyModal: () => void;
  isMobileSimulator: boolean;
  onToggleSimulator: () => void;
  activeMedicinesCount: number;
  hasReconciliationNotice: boolean;
}

export const TopHeader: React.FC<{
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onOpenApiKeyModal: () => void;
  isMobileSimulator: boolean;
  onToggleSimulator: () => void;
  hasApiKey: boolean;
}> = ({ currentScreen, onNavigate, onOpenApiKeyModal, isMobileSimulator, onToggleSimulator, hasApiKey }) => {
  return (
    <header className="sticky top-0 z-40 bg-paper-50/90 backdrop-blur-md border-b border-paper-200 px-4 py-2.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-ink-900 flex items-center justify-center shadow-paper text-white relative overflow-hidden group-hover:scale-105 transition-transform">
            <span className="font-mono text-sm font-bold tracking-tighter text-clinical-tealLight">Rx</span>
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-clinical-mint"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-ink-900">MedBridge</span>
              <span className="text-[10px] uppercase tracking-wider font-mono font-semibold px-1.5 py-0.5 rounded bg-clinical-teal/10 text-clinical-teal">
                iQOO '26
              </span>
            </div>
            <p className="text-[10px] text-ink-600 hidden sm:block font-medium">
              Intelligent Prescription & Cross-System Clarity
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Safety & Ethics quick button */}
          <button
            onClick={() => onNavigate('safety')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              currentScreen === 'safety'
                ? 'bg-ink-900 text-white shadow-sm'
                : 'text-ink-700 hover:bg-paper-200/80 bg-paper-100'
            }`}
            title="Safety Boundaries & Hackathon Team"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-clinical-mint" />
            <span className="hidden md:inline">Safety & Team</span>
          </button>

          {/* Gemini AI Key / Mode Status */}
          <button
            onClick={onOpenApiKeyModal}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border transition-all ${
              hasApiKey 
                ? 'border-clinical-teal/30 bg-clinical-teal/10 text-clinical-teal hover:bg-clinical-teal/20' 
                : 'border-paper-300 bg-white text-ink-700 hover:bg-paper-100'
            }`}
            title="Configure Gemini Multimodal API Key"
          >
            <Key className="w-3.5 h-3.5 text-clinical-teal" />
            <span className="hidden sm:inline">{hasApiKey ? 'Gemini AI Live' : 'AI Demo Mode'}</span>
            <span className={`w-1.5 h-1.5 rounded-full ${hasApiKey ? 'bg-clinical-mint animate-pulse' : 'bg-rxAmber'}`}></span>
          </button>

          {/* Viewport Frame Mode Switcher for Desktop */}
          <button
            onClick={onToggleSimulator}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-ink-700 bg-paper-200/80 hover:bg-paper-300 transition-colors"
            title={isMobileSimulator ? "Switch to Expansive Desktop View" : "Switch to Phone-First Simulator Frame"}
          >
            {isMobileSimulator ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-ink-600" />
                <span>Expanded Canvas</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-ink-600" />
                <span>Phone View</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export const BottomMobileNav: React.FC<{
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onOpenScanner: () => void;
  hasReconciliationNotice: boolean;
}> = ({ currentScreen, onNavigate, onOpenScanner, hasReconciliationNotice }) => {
  const navItems: Array<{
    screen: AppScreen;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: boolean;
  }> = [
    { screen: 'home', label: 'Rx Canvas', icon: FileText },
    { screen: 'medication_timeline', label: 'Timeline', icon: Clock },
    { screen: 'reconciliation', label: 'Reconcile', icon: GitMerge, badge: hasReconciliationNotice },
    { screen: 'treatment_library', label: 'Library', icon: Layers },
  ];

  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-md bg-ink-900/95 text-white backdrop-blur-lg rounded-2xl p-1.5 shadow-2xl border border-ink-800/80">
      <div className="flex items-center justify-between relative px-1">
        {/* Left 2 items */}
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-all ${
                isActive 
                  ? 'text-clinical-tealLight font-semibold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'scale-110 text-clinical-tealLight' : ''}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}

        {/* Center Floating HERO Scan Button */}
        <div className="flex items-center justify-center px-1">
          <button
            onClick={onOpenScanner}
            className="w-13 h-13 -mt-6 rounded-full bg-gradient-to-tr from-clinical-teal to-clinical-mint p-0.5 shadow-glow-teal hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-white group"
            title="Scan Prescription"
          >
            <div className="w-full h-full rounded-full bg-ink-900/40 backdrop-blur-xs flex flex-col items-center justify-center border border-white/20">
              <Camera className="w-5 h-5 group-hover:rotate-6 transition-transform" />
              <span className="text-[9px] font-bold tracking-wider uppercase mt-0.5">Scan</span>
            </div>
          </button>
        </div>

        {/* Right 2 items */}
        {navItems.slice(2, 4).map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-2 rounded-xl transition-all relative ${
                isActive 
                  ? 'text-clinical-tealLight font-semibold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.badge && (
                <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-rxAmber animate-ping"></span>
              )}
              {item.badge && (
                <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-rxAmber"></span>
              )}
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'scale-110 text-clinical-tealLight' : ''}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
