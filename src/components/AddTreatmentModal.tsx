import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  ShieldAlert, 
  Sparkles, 
  FileText, 
  Leaf, 
  Pill, 
  CheckCircle2, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AlternativeTreatment, SystemType } from '../types';

interface AddTreatmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTreatment: (treatment: AlternativeTreatment) => void;
}

export const AddTreatmentModal: React.FC<AddTreatmentModalProps> = ({
  isOpen,
  onClose,
  onAddTreatment,
}) => {
  const [treatmentType, setTreatmentType] = useState<AlternativeTreatment['type']>('homeopathic');
  const [name, setName] = useState<string>('');
  const [potencyOrDose, setPotencyOrDose] = useState<string>('');
  const [symptomReason, setSymptomReason] = useState<string>('');
  const [practitioner, setPractitioner] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('Twice daily');
  const [notes, setNotes] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newTreatment: AlternativeTreatment = {
      id: `alt-${Date.now()}`,
      name: name.trim(),
      type: treatmentType,
      potencyOrDose: potencyOrDose.trim() || (treatmentType === 'homeopathic' ? '30C Potency' : 'Standard dose'),
      symptomReason: symptomReason.trim() || 'General health / symptom management',
      practitioner: practitioner.trim() || (treatmentType === 'homeopathic' ? 'Homeopathic Practitioner' : 'Self Care'),
      frequency: frequency.trim() || 'Daily',
      dateAdded: new Date().toISOString().split('T')[0],
      notes: notes.trim(),
      active: true,
      traditionalDisclaimer: treatmentType === 'homeopathic'
        ? 'Traditional / Educational Information Only. MedBridge does not recommend, prescribe, or validate homeopathic efficacy. Never stop allopathic medication without physician consent.'
        : 'Over-the-counter / wellness log. Always inform your consulting physician.',
    };

    onAddTreatment(newTreatment);
    setName('');
    setPotencyOrDose('');
    setSymptomReason('');
    setPractitioner('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-white border border-paper-300 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-paper-200 flex items-center justify-between bg-paper-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-ink-900 text-white flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-ink-900">
                Record Current Treatment
              </h3>
              <p className="text-[10px] text-ink-500 font-mono">
                Cross-System Medication Reconciliation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-paper-200 hover:bg-paper-300 text-ink-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Treatment Type Selector */}
        <div className="p-4 bg-paper-100/60 border-b border-paper-200 space-y-2">
          <label className="block text-xs font-mono font-bold uppercase text-ink-700">
            Select Treatment Type:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setTreatmentType('homeopathic')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                treatmentType === 'homeopathic'
                  ? 'bg-amber-100 border-amber-400 text-amber-950 shadow-sm'
                  : 'bg-white border-paper-200 text-ink-600 hover:bg-paper-50'
              }`}
            >
              <Pill className="w-4 h-4 text-amber-600" />
              <span>Homeopathic</span>
            </button>

            <button
              type="button"
              onClick={() => setTreatmentType('herbal')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                treatmentType === 'herbal'
                  ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-sm'
                  : 'bg-white border-paper-200 text-ink-600 hover:bg-paper-50'
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>Herbal / Home</span>
            </button>

            <button
              type="button"
              onClick={() => setTreatmentType('otc_supplement')}
              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                treatmentType === 'otc_supplement'
                  ? 'bg-clinical-teal/20 border-clinical-teal text-ink-900 shadow-sm'
                  : 'bg-white border-paper-200 text-ink-600 hover:bg-paper-50'
              }`}
            >
              <Layers className="w-4 h-4 text-clinical-teal" />
              <span>OTC / Vitamins</span>
            </button>
          </div>
        </div>

        {/* Mandatory Educational & Safety Disclaimer */}
        {treatmentType === 'homeopathic' && (
          <div className="mx-4 mt-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="font-bold text-[11px] uppercase tracking-wider block text-amber-950">
                Traditional / Educational Information Only
              </strong>
              <p className="text-[11px] leading-relaxed text-amber-800">
                MedBridge does not recommend, prescribe, or validate homeopathic treatments. This entry serves solely for cross-system visibility and dual-doctor disclosure.
              </p>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 flex-1 overflow-y-auto space-y-3 text-xs">
          <div>
            <label className="block text-ink-700 font-semibold mb-1">
              Remedy / Treatment Name *
            </label>
            <input
              type="text"
              required
              placeholder={treatmentType === 'homeopathic' ? 'e.g. Arsenicum Album 30C, Belladonna' : 'e.g. Vitamin C, Ashwagandha'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-paper-300 focus:outline-none focus:border-clinical-teal font-semibold text-ink-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-ink-700 font-semibold mb-1">
                Potency / Dosage
              </label>
              <input
                type="text"
                placeholder="e.g. 30C (4 pills) or 500mg"
                value={potencyOrDose}
                onChange={(e) => setPotencyOrDose(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-paper-300 focus:outline-none focus:border-clinical-teal text-ink-900"
              />
            </div>

            <div>
              <label className="block text-ink-700 font-semibold mb-1">
                Frequency
              </label>
              <input
                type="text"
                placeholder="e.g. Twice daily morning/night"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-paper-300 focus:outline-none focus:border-clinical-teal text-ink-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-ink-700 font-semibold mb-1">
              Reason / Symptom Targeted
            </label>
            <input
              type="text"
              placeholder="e.g. Dry cough, throat tickle, restlessness"
              value={symptomReason}
              onChange={(e) => setSymptomReason(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-paper-300 focus:outline-none focus:border-clinical-teal text-ink-900"
            />
          </div>

          <div>
            <label className="block text-ink-700 font-semibold mb-1">
              Prescribing Practitioner (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Dr. Sunil Joshi (B.H.M.S.)"
              value={practitioner}
              onChange={(e) => setPractitioner(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-paper-300 focus:outline-none focus:border-clinical-teal text-ink-900"
            />
          </div>

          <div>
            <label className="block text-ink-700 font-semibold mb-1">
              Additional Notes
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Dissolve in mouth 15 mins before meals"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-paper-300 focus:outline-none focus:border-clinical-teal text-ink-900"
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-2 border-t border-paper-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-paper-300 text-ink-700 hover:bg-paper-100 font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-ink-900 hover:bg-ink-850 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-paper transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-clinical-mint" />
              <span>Save Treatment to MedBridge</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
