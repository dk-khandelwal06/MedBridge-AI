import React, { useState } from 'react';
import { 
  GitMerge, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Leaf, 
  MessageSquare, 
  Eye, 
  Info,
  ChevronDown,
  Layers,
  ArrowDown
} from 'lucide-react';
import { ReconciliationOverlap, Prescription, AlternativeTreatment } from '../types';

interface CrossSystemReconciliationProps {
  overlaps: ReconciliationOverlap[];
  prescriptions: Prescription[];
  alternativeTreatments: AlternativeTreatment[];
  onGoToMedicationPicture: () => void;
}

export const CrossSystemReconciliation: React.FC<CrossSystemReconciliationProps> = ({
  overlaps,
  prescriptions,
  alternativeTreatments,
  onGoToMedicationPicture,
}) => {
  const [activeTab, setActiveTab] = useState<'visual_stream' | 'disclosure_guide'>('visual_stream');
  const [isSimulatingConvergence, setIsSimulatingConvergence] = useState<boolean>(false);

  const overlap = overlaps[0];

  const handleSimulateReconcile = () => {
    setIsSimulatingConvergence(true);
    setTimeout(() => setIsSimulatingConvergence(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 px-3">
      {/* Top Banner */}
      <div className="text-center space-y-2 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-clinical-teal/15 to-amber-500/15 border border-clinical-teal/30 text-ink-900 text-xs font-mono font-bold">
          <GitMerge className="w-3.5 h-3.5 text-clinical-teal" />
          <span>Cross-System Information Convergence Engine</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight leading-tight">
          Connecting Separated<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinical-teal via-ink-800 to-amber-600">
            Healthcare Realities
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-ink-600 max-w-lg mx-auto">
          Patients in India frequently consult both allopathic physicians and traditional practitioners. MedBridge unifies fragmented records so nothing is hidden.
        </p>

        <div className="text-xs font-mono font-bold text-clinical-teal uppercase tracking-widest pt-1">
          Visibility → Better Conversations
        </div>
      </div>

      {/* THE WOW VISUALIZATION: DUAL CONVERGING INFORMATION STREAMS */}
      <div className="bg-ink-900 text-white rounded-3xl p-5 sm:p-7 shadow-paper-lg border border-ink-800 relative overflow-hidden">
        {/* Ambient Neural Lighting */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-clinical-teal/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Stream Labels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          {/* Stream 1: Allopathic Stream */}
          <div className="p-4 rounded-2xl bg-ink-950/80 border border-clinical-teal/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-clinical-tealLight flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Stream A: Allopathic Rx
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-clinical-teal/20 text-clinical-tealLight">
                Dr. R. K. Sharma
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="p-2 rounded-xl bg-ink-900 border border-ink-800 flex items-center justify-between">
                <span className="font-semibold text-white">Amoxicillin 500mg</span>
                <span className="text-[10px] text-slate-400 font-mono">1-0-1 (Antibiotic)</span>
              </div>
              <div className="p-2 rounded-xl bg-ink-900 border border-ink-800 flex items-center justify-between">
                <span className="font-semibold text-white">Cetirizine 10mg</span>
                <span className="text-[10px] text-slate-400 font-mono">0-0-1 (Antiallergic)</span>
              </div>
            </div>

            <div className="text-[10px] font-mono text-clinical-tealLight/80">
              Target: Bacterial airway infection & cold symptoms
            </div>
          </div>

          {/* Stream 2: Homeopathic & Alternative Stream */}
          <div className="p-4 rounded-2xl bg-ink-950/80 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Leaf className="w-4 h-4" />
                Stream B: Homeopathic / Home
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                Dr. Sunil Joshi
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="p-2 rounded-xl bg-ink-900 border border-ink-800 flex items-center justify-between">
                <span className="font-semibold text-white">Arsenicum Album 30C</span>
                <span className="text-[10px] text-slate-400 font-mono">4 Globules BD</span>
              </div>
              <div className="p-2 rounded-xl bg-ink-900 border border-ink-800 flex items-center justify-between">
                <span className="font-semibold text-white">Ginger & Tulsi Decoction</span>
                <span className="text-[10px] text-slate-400 font-mono">Evening Cup</span>
              </div>
            </div>

            <div className="text-[10px] font-mono text-amber-400/80">
              Target: Throat tickle & cold sensitivity
            </div>
          </div>
        </div>

        {/* Dynamic Convergence Vector Animation Core */}
        <div className="my-6 relative z-10 flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-center gap-4 py-2">
            <div className="h-0.5 flex-1 bg-gradient-to-r from-clinical-teal via-clinical-tealLight to-transparent animate-pulse"></div>
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-clinical-teal via-emerald-500 to-amber-500 p-0.5 shadow-glow-teal flex items-center justify-center text-ink-950 font-black">
                <div className="w-full h-full rounded-2xl bg-ink-950 flex flex-col items-center justify-center text-white p-1 text-center">
                  <GitMerge className={`w-5 h-5 text-clinical-tealLight ${isSimulatingConvergence ? 'animate-spin' : ''}`} />
                  <span className="text-[8px] font-mono font-bold tracking-tighter uppercase text-slate-300 mt-0.5">
                    CONVERGE
                  </span>
                </div>
              </div>
            </div>
            <div className="h-0.5 flex-1 bg-gradient-to-l from-amber-400 via-amber-300 to-transparent animate-pulse"></div>
          </div>
          <span className="text-[10px] font-mono uppercase text-slate-400 mt-1">
            Real-Time Semantic Overlap Synthesis
          </span>
        </div>

        {/* Output Reconciled Insight Card (Amber Indicator) */}
        {overlap && (
          <div className="relative z-10 p-5 rounded-2xl bg-amber-950/40 border border-amber-500/50 space-y-3 shadow-glow-amber">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                <AlertTriangle className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    Symptom Overlap Detected
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.2 rounded font-mono">
                    {overlap.symptomCluster}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  "{overlap.observationTitle}"
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-12">
              {overlap.observationBody}
            </p>

            {/* Structured Practitioner Disclosure Recommendation */}
            <div className="mt-3 p-3.5 rounded-xl bg-ink-950 border border-amber-500/30 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Recommended Dual Disclosure:</span>
              </div>
              <p className="text-slate-300 italic">
                "{overlap.disclosureAdvice}"
              </p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-ink-800 flex flex-col sm:flex-row gap-3 relative z-10">
          <button
            onClick={handleSimulateReconcile}
            className="px-4 py-3 rounded-xl border border-ink-700 bg-ink-950 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-clinical-teal" />
            <span>Re-Analyze Multi-Source Stream</span>
          </button>

          <button
            onClick={onGoToMedicationPicture}
            className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-clinical-teal to-clinical-mint hover:opacity-95 text-ink-950 font-bold text-xs flex items-center justify-center gap-2 shadow-glow-teal transition-all"
          >
            <span>View Consolidated Medication Picture</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cross-System Principles Callout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-white border border-paper-200 shadow-paper space-y-1">
          <div className="flex items-center gap-2 font-bold text-ink-900">
            <CheckCircle2 className="w-4 h-4 text-clinical-mint" />
            <span>Information Transparency</span>
          </div>
          <p className="text-ink-600">
            MedBridge never hides any treatment you take. Both your doctors get full visibility to optimize care.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-paper-200 shadow-paper space-y-1">
          <div className="flex items-center gap-2 font-bold text-ink-900">
            <ShieldCheck className="w-4 h-4 text-clinical-teal" />
            <span>Zero Unsupported Claims</span>
          </div>
          <p className="text-ink-600">
            Traditional remedies are documented strictly for educational tracking. We never claim drug interactions unless validated.
          </p>
        </div>
      </div>
    </div>
  );
};
