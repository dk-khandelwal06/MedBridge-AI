import React, { useState } from 'react';
import { 
  Layers, 
  Share2, 
  Download, 
  Printer, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Leaf, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { Prescription, AlternativeTreatment, PrescriptionItem } from '../types';
import confetti from 'canvas-confetti';

interface MedicationPictureProps {
  prescriptions: Prescription[];
  alternativeTreatments: AlternativeTreatment[];
  onSelectMedicine: (med: PrescriptionItem) => void;
  onGoToTimeline: () => void;
  onGoToReconciliation: () => void;
}

export const MedicationPicture: React.FC<MedicationPictureProps> = ({
  prescriptions,
  alternativeTreatments,
  onSelectMedicine,
  onGoToTimeline,
  onGoToReconciliation,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const allopathicMedicines = prescriptions.flatMap(p => p.medicines);
  const totalActive = allopathicMedicines.length + alternativeTreatments.length;

  const handleShareSummary = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-24 px-3">
      {/* Top Banner */}
      <div className="text-center space-y-2 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-clinical-teal/10 border border-clinical-teal/20 text-clinical-teal text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Unified Patient Medication Picture</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
          Everything you're taking.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinical-teal to-emerald-600">
            One clear picture.
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-ink-600 max-w-md mx-auto">
          No fragmented slips. No forgotten doses. A single consolidated source of truth for you and your doctors.
        </p>
      </div>

      {/* High-Level Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-paper-200 shadow-paper text-center">
          <div className="text-[10px] font-mono uppercase text-ink-500 font-bold">
            Active Medicines
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-ink-900 mt-0.5">
            {totalActive}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-paper-200 shadow-paper text-center">
          <div className="text-[10px] font-mono uppercase text-ink-500 font-bold">
            Prescriptions
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-clinical-teal mt-0.5">
            {prescriptions.length}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-paper-200 shadow-paper text-center">
          <div className="text-[10px] font-mono uppercase text-ink-500 font-bold">
            Treatment Sources
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-0.5">
            2 <span className="text-xs text-ink-400 font-normal">Systems</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-paper-200 shadow-paper text-center">
          <div className="text-[10px] font-mono uppercase text-ink-500 font-bold">
            Reconciliation
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 mt-0.5 flex items-center justify-center gap-1">
            <span>1</span>
            <span className="text-xs text-amber-600 font-mono font-bold">Notice</span>
          </div>
        </div>
      </div>

      {/* The Master Visual Medication Map */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-paper-200 shadow-paper-lg space-y-5">
        <div className="flex items-center justify-between border-b border-paper-200 pb-3">
          <div>
            <h3 className="font-bold text-base text-ink-900">
              Consolidated Medication Inventory
            </h3>
            <p className="text-xs text-ink-500">
              Cross-system entries arranged by timing & source
            </p>
          </div>

          <button
            onClick={handleShareSummary}
            className="px-3 py-1.5 rounded-xl bg-clinical-teal/10 hover:bg-clinical-teal/20 text-clinical-teal font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Summary Copied!' : 'Export for Doctor'}</span>
          </button>
        </div>

        {/* 1. Allopathic Rx Stream */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-clinical-teal font-bold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Doctor Prescriptions (Allopathic)
            </span>
            <span className="text-[10px] font-mono text-ink-500">
              {prescriptions[0]?.clinicName}
            </span>
          </div>

          <div className="space-y-2">
            {allopathicMedicines.map((med) => (
              <div
                key={med.id}
                onClick={() => onSelectMedicine(med)}
                className="p-3.5 rounded-2xl border border-paper-200 hover:border-clinical-teal/60 hover:bg-paper-50 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-ink-900 group-hover:text-clinical-teal transition-colors">
                      {med.normalizedName}
                    </h4>
                    <span className="font-mono text-xs font-bold text-clinical-teal bg-clinical-teal/10 px-2 py-0.5 rounded">
                      {med.dose}
                    </span>
                    <span className="text-[10px] font-mono text-ink-500">
                      {med.category}
                    </span>
                  </div>
                  <p className="text-xs text-ink-600">
                    {med.frequencyExpanded} &nbsp;•&nbsp; <em>{med.instructions}</em>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold hidden sm:inline">
                    {Math.round(med.confidence * 100)}% Verified
                  </span>
                  <ChevronRight className="w-4 h-4 text-ink-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Homeopathic / Traditional Stream */}
        <div className="space-y-3 pt-3 border-t border-paper-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-bold flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-amber-600" />
              Recorded Homeopathic & Home Remedies
            </span>
            <span className="text-[10px] font-mono text-amber-800">
              For Dual-Practitioner Visibility
            </span>
          </div>

          <div className="space-y-2">
            {alternativeTreatments.map((alt) => (
              <div
                key={alt.id}
                className="p-3.5 rounded-2xl border border-amber-200 bg-amber-50/30 flex items-center justify-between shadow-sm"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-ink-900">
                      {alt.name}
                    </h4>
                    <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      {alt.potencyOrDose}
                    </span>
                  </div>
                  <p className="text-xs text-ink-600">
                    {alt.frequency} &nbsp;•&nbsp; Reason: <span className="font-medium text-ink-800">{alt.symptomReason}</span>
                  </p>
                </div>

                <span className="text-[10px] font-mono px-2 py-1 rounded bg-paper-100 text-ink-600">
                  {alt.practitioner ? alt.practitioner.split('(')[0] : 'Home Care'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Summary Quote */}
      <div className="text-center p-4 bg-ink-900 text-white rounded-2xl border border-ink-800 space-y-1">
        <p className="text-xs sm:text-sm font-medium italic text-slate-200">
          "Nothing gets lost between the doctor's pen and the patient's medicine cabinet."
        </p>
        <span className="text-[10px] font-mono uppercase text-clinical-tealLight">
          MedBridge • iQOO Hackathon 2026 Pune Battle 02
        </span>
      </div>
    </div>
  );
};
