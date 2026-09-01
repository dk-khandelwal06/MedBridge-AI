import React, { useState } from 'react';
import { 
  Layers, 
  FileText, 
  Pill, 
  Leaf, 
  Plus, 
  CheckCircle2, 
  Calendar, 
  User, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Prescription, AlternativeTreatment, PrescriptionItem } from '../types';

interface TreatmentLibraryProps {
  prescriptions: Prescription[];
  alternativeTreatments: AlternativeTreatment[];
  onOpenAddTreatment: () => void;
  onOpenScanner: () => void;
  onSelectMedicine: (med: PrescriptionItem) => void;
  onGoToReconciliation: () => void;
}

export const TreatmentLibrary: React.FC<TreatmentLibraryProps> = ({
  prescriptions,
  alternativeTreatments,
  onOpenAddTreatment,
  onOpenScanner,
  onSelectMedicine,
  onGoToReconciliation,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'prescriptions' | 'alternative'>('all');

  const allopathicMeds = prescriptions.flatMap(p => p.medicines);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 px-3">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-clinical-teal font-bold block">
            Inventory & Records
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
            Treatment Library
          </h2>
        </div>

        <button
          onClick={onOpenAddTreatment}
          className="px-3.5 py-2 rounded-xl bg-ink-900 hover:bg-ink-850 text-white text-xs font-bold flex items-center gap-1.5 shadow-paper transition-all"
        >
          <Plus className="w-4 h-4 text-clinical-tealLight" />
          <span>Add Treatment</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-paper-200/80 rounded-2xl gap-1">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'all' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          All Items ({allopathicMeds.length + alternativeTreatments.length})
        </button>
        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'prescriptions' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          Prescriptions ({prescriptions.length})
        </button>
        <button
          onClick={() => setActiveTab('alternative')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'alternative' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          Homeopathic / Home ({alternativeTreatments.length})
        </button>
      </div>

      {/* Section 1: Allopathic Doctor Prescriptions */}
      {(activeTab === 'all' || activeTab === 'prescriptions') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-ink-600 font-bold flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-clinical-teal" />
              Doctor Prescriptions ({prescriptions.length})
            </span>
            <button
              onClick={onOpenScanner}
              className="text-xs text-clinical-teal font-semibold hover:underline flex items-center gap-0.5"
            >
              <span>+ Scan New Rx</span>
            </button>
          </div>

          {prescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-paper-200 shadow-paper space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-clinical-teal/10 text-clinical-teal font-bold">
                    Allopathic Clinical Rx
                  </span>
                  <h3 className="text-base font-extrabold text-ink-900 mt-1">
                    {rx.clinicName}
                  </h3>
                  <p className="text-xs text-ink-600">
                    {rx.doctorName} • {rx.doctorSpecialty}
                  </p>
                </div>

                <span className="text-xs font-mono font-bold text-ink-500 bg-paper-100 px-2 py-1 rounded-md">
                  {rx.date}
                </span>
              </div>

              {/* Medicine Pills list in this prescription */}
              <div className="space-y-2 pt-2 border-t border-paper-100">
                <span className="text-[10px] font-mono text-ink-400 uppercase">
                  Prescribed Medicines ({rx.medicines.length}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {rx.medicines.map((med) => (
                    <div
                      key={med.id}
                      onClick={() => onSelectMedicine(med)}
                      className="p-2.5 rounded-xl border border-paper-200 hover:border-clinical-teal/60 hover:bg-paper-50 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-xs text-ink-900">
                          {med.normalizedName}
                        </div>
                        <div className="text-[10px] text-ink-500 font-mono">
                          {med.dose} • {med.frequency}
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-ink-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section 2: Homeopathic & Alternative Treatments */}
      {(activeTab === 'all' || activeTab === 'alternative') && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-ink-600 font-bold flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-amber-600" />
              Homeopathic & Home Treatments ({alternativeTreatments.length})
            </span>
          </div>

          {alternativeTreatments.map((alt) => (
            <div
              key={alt.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-paper space-y-2.5 relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold border border-amber-200">
                    {alt.type === 'homeopathic' ? 'Homeopathic Remedy' : 'Herbal Wellness'}
                  </span>
                  <h3 className="text-base font-extrabold text-ink-900 mt-1">
                    {alt.name}
                  </h3>
                  <p className="text-xs font-mono font-semibold text-clinical-teal">
                    {alt.potencyOrDose} • {alt.frequency}
                  </p>
                </div>

                <span className="text-xs font-mono text-ink-500 bg-paper-100 px-2 py-1 rounded-md">
                  {alt.dateAdded}
                </span>
              </div>

              <div className="text-xs text-ink-700 bg-paper-50 p-2.5 rounded-xl border border-paper-200">
                <span className="font-semibold text-ink-900">Target Symptom:</span> {alt.symptomReason}
                {alt.practitioner && (
                  <div className="text-ink-500 text-[11px] mt-0.5">
                    Practitioner: {alt.practitioner}
                  </div>
                )}
              </div>

              <div className="text-[10px] text-amber-800/80 italic font-mono pt-1">
                {alt.traditionalDisclaimer}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reconciliation Banner CTA */}
      <div className="p-5 rounded-2xl bg-ink-900 text-white shadow-paper-lg flex items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-clinical-tealLight" />
            Check Cross-System Overlap
          </h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Reconcile all recorded Allopathic and Homeopathic treatments.
          </p>
        </div>

        <button
          onClick={onGoToReconciliation}
          className="px-4 py-2.5 rounded-xl bg-clinical-teal hover:bg-clinical-tealLight text-ink-950 font-bold text-xs flex items-center gap-1 shrink-0 transition-all"
        >
          <span>Reconcile Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
