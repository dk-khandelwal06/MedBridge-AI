import React from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  AlertTriangle, 
  Lock, 
  Users, 
  Award, 
  ExternalLink,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export const SafetyMatrix: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 px-3">
      {/* Header */}
      <div className="text-center space-y-2 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-clinical-teal/10 border border-clinical-teal/20 text-clinical-teal text-xs font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Clinical Safety & Ethical Boundary Framework</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
          MedBridge explains.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinical-teal to-emerald-600">
            It never decides.
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-ink-600 max-w-md mx-auto">
          Clear, strict, and medically compliant boundaries built directly into the AI orchestration pipeline.
        </p>
      </div>

      {/* WE DO vs WE DON'T BOUNDARY MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WE DO (Green/Mint) */}
        <div className="p-5 rounded-3xl bg-emerald-50/60 border border-emerald-200 shadow-paper space-y-3">
          <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-sm uppercase tracking-wider font-mono">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <span>What MedBridge Does</span>
          </div>

          <ul className="space-y-2.5 text-xs text-emerald-950 font-medium">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Reads and segments handwritten doctor prescriptions using multimodal AI.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Translates medical shorthand (1-0-1, SOS, AC, HS) into plain English & Hindi.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Makes extraction confidence transparent (94% vs Low Confidence "Please verify").</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Provides bilingual voice readout with animated speech synthesizer.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Surfaces cross-system symptom overlaps to encourage dual-practitioner disclosure.</span>
            </li>
          </ul>
        </div>

        {/* WE DON'T (Rose/Red) */}
        <div className="p-5 rounded-3xl bg-rose-50/60 border border-rose-200 shadow-paper space-y-3">
          <div className="flex items-center gap-2 text-rose-950 font-extrabold text-sm uppercase tracking-wider font-mono">
            <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center">
              <X className="w-4 h-4 stroke-[3]" />
            </div>
            <span>What MedBridge Never Does</span>
          </div>

          <ul className="space-y-2.5 text-xs text-rose-950 font-medium">
            <li className="flex items-start gap-2">
              <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>Never diagnoses medical illnesses or conditions.</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>Never recommends starting, stopping, or altering prescribed dosages.</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>Never prescribes or promotes homeopathic/alternative remedies over clinical care.</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>Never claims unverified drug interactions without validated pharmacology data.</span>
            </li>
            <li className="flex items-start gap-2">
              <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>Never replaces the clinical judgment of a licensed medical practitioner.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Privacy & Zero-Retention Guarantee */}
      <div className="p-5 rounded-3xl bg-white border border-paper-200 shadow-paper flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-ink-900 text-white flex items-center justify-center shrink-0">
          <Lock className="w-5 h-5 text-clinical-tealLight" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-ink-900">
            Privacy First Architecture (Zero Permanent Image Storage)
          </h3>
          <p className="text-xs text-ink-600 leading-relaxed">
            Your health information is sensitive. Prescription scans are processed in-memory during multimodal analysis and never permanently archived on external public servers. All normalization and cross-system records remain client-side.
          </p>
        </div>
      </div>

      {/* Team & Hackathon Information */}
      <div className="p-6 rounded-3xl bg-ink-900 text-white border border-ink-800 shadow-paper-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-clinical-mint" />
            <span className="text-xs font-mono uppercase tracking-wider text-clinical-tealLight font-bold">
              iQOO Hackathon 2026 • Pune Battle 02
            </span>
          </div>
          <span className="text-xs font-mono bg-ink-800 px-2.5 py-0.5 rounded text-slate-300">
            HealthTech Track
          </span>
        </div>

        <div className="border-t border-ink-800 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-slate-400 font-mono">LEAD PRODUCT & AI ARCHITECT</div>
            <div className="text-base font-bold text-white mt-0.5">Daksh Khandelwal</div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Lead — Narmada Basin Monitoring, Jarvis Voice Assistant, ProofDeck
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400 font-mono">TEAM MEMBER</div>
            <div className="text-base font-bold text-white mt-0.5">Khushi Kushwah</div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Member — AI WhatsApp Automation, IPL Analytics
            </div>
          </div>
        </div>

        <div className="p-3 bg-ink-950 rounded-2xl border border-ink-800/80 text-[11px] text-slate-300 leading-relaxed">
          <strong className="text-white font-semibold">Clinical Domain Validation:</strong> Access to a practicing homeopathic doctor for terminology and workflow validation. (Used strictly for authentic terminology and dual-practitioner disclosure patterns; does not confer clinical authority to the app).
        </div>
      </div>
    </div>
  );
};
