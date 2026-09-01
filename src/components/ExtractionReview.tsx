import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Save, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw,
  HelpCircle,
  FileCheck,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Prescription, PrescriptionItem } from '../types';

interface ExtractionReviewProps {
  prescription: Prescription;
  onConfirm: (updatedPrescription: Prescription) => void;
  onSelectMedicine: (med: PrescriptionItem) => void;
}

export const ExtractionReview: React.FC<ExtractionReviewProps> = ({
  prescription,
  onConfirm,
  onSelectMedicine,
}) => {
  const [items, setItems] = useState<PrescriptionItem[]>(prescription.medicines);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeHighlightIndex, setActiveHighlightIndex] = useState<number>(0);

  const handleFieldChange = (id: string, field: keyof PrescriptionItem, value: any) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [field]: value,
          needsConfirmation: false, // user manually verified
          confidence: 1.0, // marked 100% verified by user
        };
      }
      return item;
    }));
  };

  const handleSavePrescription = () => {
    onConfirm({
      ...prescription,
      medicines: items,
      status: 'verified',
    });
  };

  const pendingConfirmationCount = items.filter(m => m.needsConfirmation).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 px-3">
      {/* Top Review Header */}
      <div className="text-center space-y-1.5 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold">
          <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Multimodal Extraction Review</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
          Verify Extracted Medications
        </h2>
        <p className="text-xs sm:text-sm text-ink-600 max-w-lg mx-auto">
          AI interpretation — verify each item against your original doctor's prescription before committing to your medication timeline.
        </p>

        {pendingConfirmationCount > 0 ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rxAmber-light border border-rxAmber text-rxAmber-dark text-xs font-semibold mt-1">
            <AlertCircle className="w-4 h-4 text-rxAmber" />
            <span>{pendingConfirmationCount} item needs your quick verification below</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All extracted medications verified with high confidence</span>
          </div>
        )}
      </div>

      {/* Split Document Intelligence Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Original Prescription Snippets (4 cols on lg) */}
        <div className="lg:col-span-5 bg-paper-50 rounded-2xl p-4 sm:p-5 border border-paper-300 shadow-paper space-y-3">
          <div className="flex items-center justify-between border-b border-paper-200 pb-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-700 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-clinical-teal" />
              Source Prescription
            </span>
            <span className="text-[10px] font-mono text-ink-500">
              {prescription.doctorName.split(',')[0]}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-paper-200 space-y-2">
            <div className="text-[11px] font-bold text-ink-900">
              {prescription.clinicName}
            </div>
            <div className="text-[10px] text-ink-500 font-mono">
              Patient: {prescription.patientName} ({prescription.patientAge})
            </div>
          </div>

          {/* Original Handwritten Snippets List */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-500 block">
              Doctor's Handwritten Lines:
            </span>

            {items.map((item, idx) => {
              const isActive = activeHighlightIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveHighlightIndex(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-clinical-tealMuted/50 border-clinical-teal shadow-sm'
                      : 'bg-white border-paper-200 hover:border-paper-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-ink-400">
                      Line 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-paper-100 text-ink-600">
                      AI Box Bound
                    </span>
                  </div>
                  <div className="doctor-script text-xl text-ink-900 mt-1">
                    {item.originalHandwrittenText}
                  </div>
                  <div className="doctor-script-faded text-sm text-ink-600">
                    {item.frequency} &nbsp;—&nbsp; {item.duration}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Structured Editable Intelligence Cards (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-700">
              Structured Extracted Entities ({items.length})
            </span>
            <span className="text-[11px] text-ink-500">
              Tap card to edit or review
            </span>
          </div>

          {items.map((item, index) => {
            const isEditing = editingId === item.id;
            const isLowConfidence = item.confidence < 0.75;
            const isSelected = activeHighlightIndex === index;

            return (
              <div
                key={item.id}
                onClick={() => setActiveHighlightIndex(index)}
                className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all shadow-paper ${
                  isSelected ? 'ring-2 ring-clinical-teal/80 border-clinical-teal' : 'border-paper-200'
                } ${isLowConfidence ? 'bg-amber-50/20' : ''}`}
              >
                {/* Header row with confidence score & edit button */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-paper-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-ink-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                      0{index + 1}
                    </span>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-clinical-teal font-semibold">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Confidence Chip */}
                    <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
                      isLowConfidence
                        ? 'bg-rxAmber-light text-rxAmber-dark border border-rxAmber/50 animate-pulse'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {isLowConfidence ? (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-rxAmber" />
                          <span>{Math.round(item.confidence * 100)}% Low • Please Verify</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{Math.round(item.confidence * 100)}% High Confidence</span>
                        </>
                      )}
                    </div>

                    {/* Edit Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(isEditing ? null : item.id);
                      }}
                      className="p-1.5 rounded-lg bg-paper-100 hover:bg-paper-200 text-ink-700 transition-colors"
                      title="Edit this medicine information"
                    >
                      {isEditing ? <Save className="w-3.5 h-3.5 text-clinical-teal" /> : <Edit3 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Form Fields: Editable or Static View */}
                {isEditing ? (
                  <div className="mt-3 grid grid-cols-2 gap-3 text-xs" onClick={e => e.stopPropagation()}>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-ink-500 font-medium mb-1">Medicine Name</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleFieldChange(item.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-paper-300 focus:outline-none focus:border-clinical-teal font-bold text-ink-900"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-ink-500 font-medium mb-1">Dosage / Strength</label>
                      <input
                        type="text"
                        value={item.dose}
                        onChange={(e) => handleFieldChange(item.id, 'dose', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-paper-300 focus:outline-none focus:border-clinical-teal font-bold text-ink-900"
                      />
                    </div>
                    <div>
                      <label className="block text-ink-500 font-medium mb-1">Frequency</label>
                      <input
                        type="text"
                        value={item.frequency}
                        onChange={(e) => handleFieldChange(item.id, 'frequency', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-paper-300 focus:outline-none focus:border-clinical-teal text-ink-900"
                      />
                    </div>
                    <div>
                      <label className="block text-ink-500 font-medium mb-1">Duration</label>
                      <input
                        type="text"
                        value={item.duration}
                        onChange={(e) => handleFieldChange(item.id, 'duration', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-paper-300 focus:outline-none focus:border-clinical-teal text-ink-900"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-ink-500 font-medium mb-1">Doctor's Instructions</label>
                      <input
                        type="text"
                        value={item.instructions}
                        onChange={(e) => handleFieldChange(item.id, 'instructions', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-paper-300 focus:outline-none focus:border-clinical-teal text-ink-900"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-extrabold text-ink-900">
                          {item.normalizedName}
                        </h4>
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-paper-100 text-ink-800 border border-paper-200">
                          {item.dose}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-clinical-teal bg-clinical-teal/10 px-2 py-0.5 rounded-md">
                        {item.frequencyExpanded}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-600 pt-1">
                      <div>
                        <span className="text-ink-400 font-medium">Duration:</span>{' '}
                        <strong className="text-ink-800 font-semibold">{item.duration}</strong>
                      </div>
                      <div>
                        <span className="text-ink-400 font-medium">Instructions:</span>{' '}
                        <span className="text-ink-700">{item.instructions}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Confirm Primary CTA */}
          <div className="pt-3">
            <button
              onClick={handleSavePrescription}
              className="w-full py-3.5 px-5 rounded-2xl bg-ink-900 hover:bg-ink-850 text-white font-bold text-sm shadow-paper-lg flex items-center justify-center gap-2 group active:scale-98 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-clinical-mint group-hover:scale-110 transition-transform" />
              <span>Confirm & Generate Medication Picture</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[11px] text-ink-500 mt-2">
              Safe & secure • No images stored permanently on external servers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
