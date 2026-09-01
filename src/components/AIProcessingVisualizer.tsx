import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Brain, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  FileText, 
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Prescription } from '../types';

interface AIProcessingVisualizerProps {
  prescription: Prescription | null;
  onComplete: () => void;
  sourceEngine?: string;
}

const STAGES = [
  {
    step: 1,
    title: 'RAW HANDWRITING SEGMENTATION',
    desc: 'Isolating physician cursive ink strokes, stamps, and Rx letterhead boundaries...',
    icon: FileText,
  },
  {
    step: 2,
    title: 'MULTIMODAL OCR RECOGNITION',
    desc: 'Extracting character tokens and handwriting glyph candidates...',
    icon: Cpu,
  },
  {
    step: 3,
    title: 'STRUCTURING MEDICAL ENTITIES',
    desc: 'Mapping tokens to canonical medicine names, doses, frequencies (1-0-1), and durations...',
    icon: Brain,
  },
  {
    step: 4,
    title: 'CLINICAL VERIFICATION & CONFIDENCE',
    desc: 'Checking normalization dictionary and scoring extraction uncertainty per field...',
    icon: ShieldCheck,
  },
  {
    step: 5,
    title: 'SYNTHESIZING MEDICATION PICTURE',
    desc: 'Constructing unified 24h patient schedule, timeline journeys, and cross-system visibility...',
    icon: Layers,
  }
];

export const AIProcessingVisualizer: React.FC<AIProcessingVisualizerProps> = ({
  prescription,
  onComplete,
  sourceEngine = 'MedBridge Neural Multimodal Pipeline'
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(10);
  const [parsedTokens, setParsedTokens] = useState<string[]>([]);

  useEffect(() => {
    // Stage 1
    const t1 = setTimeout(() => {
      setCurrentStageIndex(1);
      setProgressPercent(32);
      setParsedTokens(prev => [...prev, 'OCR Matrix: "Tab. Amox 500mg 1-0-1 x 5d"']);
    }, 900);

    // Stage 2
    const t2 = setTimeout(() => {
      setCurrentStageIndex(2);
      setProgressPercent(56);
      setParsedTokens(prev => [...prev, 'Entity Bound: Amoxicillin | Dose: 500mg | Freq: 1-0-1']);
    }, 1800);

    // Stage 3
    const t3 = setTimeout(() => {
      setCurrentStageIndex(3);
      setProgressPercent(78);
      setParsedTokens(prev => [...prev, 'Normalization Check: Canonical matched with 96% confidence']);
    }, 2700);

    // Stage 4
    const t4 = setTimeout(() => {
      setCurrentStageIndex(4);
      setProgressPercent(95);
      setParsedTokens(prev => [...prev, 'Medication Picture ready for clinical verification']);
    }, 3600);

    // Stage 5 Complete
    const t5 = setTimeout(() => {
      setProgressPercent(100);
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const isDone = progressPercent >= 100;

  return (
    <div className="max-w-xl mx-auto py-6 px-3 space-y-6 pb-24">
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-clinical-teal/10 border border-clinical-teal/30 text-clinical-teal text-xs font-mono font-semibold">
          <Brain className="w-3.5 h-3.5 animate-pulse" />
          <span>{sourceEngine}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
          Prescription Intelligence in Motion
        </h2>
        <p className="text-xs sm:text-sm text-ink-600 max-w-sm mx-auto">
          Transforming physical ink handwriting into structured, verified patient clarity.
        </p>
      </div>

      {/* Main Intelligent Morphing Canvas Card */}
      <div className="bg-ink-900 text-white rounded-3xl p-5 sm:p-7 shadow-paper-lg border border-ink-800 relative overflow-hidden">
        {/* Animated Background Neural Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-clinical-teal/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-clinical-mint/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Dynamic Progress Bar */}
        <div className="relative z-10 mb-6">
          <div className="flex justify-between items-center text-xs font-mono mb-2 text-slate-300">
            <span className="flex items-center gap-1.5 text-clinical-tealLight font-bold">
              <Zap className="w-3.5 h-3.5" />
              STAGE 0{currentStageIndex + 1} OF 05
            </span>
            <span className="font-bold text-white">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-ink-800 overflow-hidden p-0.5 border border-ink-700">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-clinical-teal via-clinical-mint to-emerald-400 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Stages Step-by-Step List */}
        <div className="space-y-3.5 relative z-10">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isCurrent = idx === currentStageIndex;
            const isCompleted = idx < currentStageIndex || isDone;

            return (
              <div
                key={stage.step}
                className={`p-3 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${
                  isCurrent
                    ? 'bg-clinical-teal/15 border-clinical-teal/60 text-white shadow-glow-teal'
                    : isCompleted
                    ? 'bg-ink-950/60 border-emerald-500/30 text-slate-300'
                    : 'bg-ink-950/20 border-ink-800/60 text-slate-500 opacity-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : isCurrent
                    ? 'bg-clinical-teal text-ink-950 animate-bounce'
                    : 'bg-ink-800 text-slate-500'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono font-bold tracking-wider">
                      {stage.title}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] font-mono text-clinical-tealLight animate-pulse">
                        PROCESSING...
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {stage.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Parsing Token Stream Feed */}
        {parsedTokens.length > 0 && (
          <div className="mt-5 p-3 rounded-xl bg-ink-950 border border-ink-800 font-mono text-[10px] text-slate-300 space-y-1 relative z-10">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 block mb-1">
              Live Token Stream:
            </span>
            {parsedTokens.map((token, i) => (
              <div key={i} className="text-clinical-tealLight flex items-center gap-1.5">
                <span className="text-slate-600">›</span>
                <span>{token}</span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA when Ready */}
        <div className="mt-6 pt-4 border-t border-ink-800 flex justify-end relative z-10">
          <button
            onClick={onComplete}
            disabled={!isDone}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              isDone
                ? 'bg-gradient-to-r from-clinical-teal to-clinical-mint hover:opacity-95 text-ink-950 shadow-glow-teal active:scale-98 cursor-pointer'
                : 'bg-ink-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>{isDone ? 'Review Extracted Prescription' : 'Structuring Prescription...'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
