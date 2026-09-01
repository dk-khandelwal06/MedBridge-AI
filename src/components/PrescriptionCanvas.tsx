import React, { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  ChevronRight, 
  Maximize2,
  Brain,
  Clock,
  Eye,
  Activity,
  FileCheck
} from 'lucide-react';
import { Prescription, PrescriptionItem, AppScreen } from '../types';

interface PrescriptionCanvasProps {
  prescription: Prescription;
  onScanClick: () => void;
  onViewPictureClick: () => void;
  onSelectMedicine: (medicine: PrescriptionItem) => void;
  onOpenExtractionReview: () => void;
}

export const PrescriptionCanvas: React.FC<PrescriptionCanvasProps> = ({
  prescription,
  onScanClick,
  onViewPictureClick,
  onSelectMedicine,
  onOpenExtractionReview,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);

  const activeItem = prescription.medicines[activeItemIndex] || prescription.medicines[0];

  return (
    <div className="space-y-6 pb-24">
      {/* Hero Visual Intro */}
      <div className="text-center max-w-xl mx-auto pt-3 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-clinical-teal/10 border border-clinical-teal/20 text-clinical-teal text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Living Prescription Intelligence</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-900 leading-[1.15]">
          Your prescription.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-clinical-teal via-emerald-600 to-ink-900">
            Finally understandable.
          </span>
        </h1>
        
        <p className="mt-2.5 text-sm sm:text-base text-ink-600 max-w-md mx-auto leading-relaxed">
          Turn a messy handwritten prescription into one unified, structured, and cross-system medication picture.
        </p>

        {/* Primary Call to Actions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onScanClick}
            className="px-5 py-3 rounded-xl bg-ink-900 text-white font-semibold text-sm shadow-paper-lg hover:bg-ink-850 hover:shadow-glow-teal active:scale-98 transition-all flex items-center gap-2 group"
          >
            <Camera className="w-4 h-4 text-clinical-tealLight group-hover:rotate-12 transition-transform" />
            <span>Scan Prescription</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={onViewPictureClick}
            className="px-4 py-3 rounded-xl bg-white border border-paper-300 text-ink-800 font-semibold text-sm shadow-paper hover:bg-paper-50 active:scale-98 transition-all flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-clinical-teal" />
            <span>View Medication Picture</span>
          </button>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-ink-500 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-clinical-mint"></span>
          <span>AI-powered</span>
          <span>•</span>
          <span>Patient-first</span>
          <span>•</span>
          <span className="text-ink-700 font-semibold">Explain, never diagnose</span>
        </div>
      </div>

      {/* THE SIGNATURE LIVING PRESCRIPTION CANVAS */}
      <div className="relative max-w-xl mx-auto">
        {/* Layer Annotation Controls */}
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-700 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-clinical-teal" />
              Document Canvas
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-semibold">
              Live AI Overlay
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className="text-[11px] font-medium text-ink-600 hover:text-ink-900 flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-lg border border-paper-200"
            >
              <Eye className="w-3 h-3 text-clinical-teal" />
              <span>{showAnnotations ? 'Hide AI Marks' : 'Show AI Marks'}</span>
            </button>
            <button
              onClick={onOpenExtractionReview}
              className="text-[11px] font-semibold text-clinical-teal hover:underline flex items-center gap-0.5"
            >
              <span>Split Review</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* The Paper Sheet */}
        <div className="prescription-sheet rounded-2xl p-5 sm:p-7 transition-all">
          {/* Clinic Header */}
          <div className="border-b border-paper-200/80 pb-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-ink-900 tracking-tight">
                  {prescription.clinicName}
                </h3>
                <p className="text-xs font-semibold text-clinical-teal">
                  {prescription.doctorName}
                </p>
                <p className="text-[11px] text-ink-500">
                  {prescription.doctorSpecialty} • {prescription.clinicAddress}
                </p>
              </div>

              <div className="text-right">
                <span className="inline-block px-2 py-0.5 rounded bg-paper-200 text-ink-700 font-mono text-[10px] font-bold">
                  DATE: {prescription.date}
                </span>
                <p className="text-[10px] text-ink-500 mt-1 font-mono">
                  REG #MH-41108
                </p>
              </div>
            </div>

            {/* Patient Bar */}
            <div className="mt-3 pt-2.5 border-t border-dashed border-paper-200 flex flex-wrap justify-between text-xs text-ink-700">
              <div><span className="text-ink-400 font-medium">Pt. Name:</span> <strong className="font-semibold">{prescription.patientName}</strong></div>
              <div><span className="text-ink-400 font-medium">Age/Sex:</span> <strong>{prescription.patientAge}</strong></div>
              <div><span className="text-ink-400 font-medium">Dx:</span> <span className="font-medium text-ink-600">Acute URTI</span></div>
            </div>
          </div>

          {/* Rx Symbol */}
          <div className="mb-3 flex items-center justify-between">
            <span className="font-serif italic font-extrabold text-2xl text-ink-900 select-none">
              ℞
            </span>
            <span className="text-[10px] font-mono text-ink-400 uppercase">
              Physical Paper Transformed
            </span>
          </div>

          {/* Handwritten Prescribed Medicines with Interactive AI Highlights */}
          <div className="space-y-3 relative">
            {prescription.medicines.map((med, index) => {
              const isSelected = activeItemIndex === index;
              const isLowConfidence = med.confidence < 0.75;

              return (
                <div
                  key={med.id}
                  onClick={() => {
                    setActiveItemIndex(index);
                    onSelectMedicine(med);
                  }}
                  className={`p-3 rounded-xl transition-all cursor-pointer relative group ${
                    isSelected 
                      ? 'bg-clinical-tealMuted/40 border border-clinical-teal shadow-paper-sm' 
                      : 'hover:bg-paper-100/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    {/* Left: Handwritten Doctor Simulation */}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-ink-400">
                          0{index + 1}.
                        </span>
                        
                        {/* Realistic doctor script typography */}
                        <div className="relative inline-block">
                          <span className="doctor-script text-xl sm:text-2xl tracking-wide text-ink-800">
                            {med.originalHandwrittenText}
                          </span>

                          {/* AI recognition box highlight */}
                          {showAnnotations && (
                            <span 
                              className={`absolute -inset-1 rounded border-2 pointer-events-none transition-all ${
                                isLowConfidence
                                  ? 'border-rxAmber bg-rxAmber-light/20 border-dashed'
                                  : 'border-clinical-teal/60 bg-clinical-teal/10 border-solid'
                              } ${isSelected ? 'ring-2 ring-clinical-teal/40' : 'opacity-75'}`}
                            />
                          )}
                        </div>
                      </div>

                      {/* Doctor script frequency & duration */}
                      <div className="pl-6 text-xs text-ink-600 doctor-script-faded text-base sm:text-lg">
                        {med.frequency} &nbsp;—&nbsp; {med.duration} &nbsp;({med.instructions.slice(0, 24)}...)
                      </div>
                    </div>

                    {/* Right: AI Understanding Badge */}
                    <div className="text-right flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-xs text-ink-900">
                          {med.normalizedName}
                        </span>
                        <span className="text-[11px] font-mono font-bold px-1.5 py-0.2 rounded bg-paper-200 text-ink-700">
                          {med.dose}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          isLowConfidence
                            ? 'bg-rxAmber-light text-rxAmber-dark border border-rxAmber/40'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {isLowConfidence ? (
                            <>
                              <AlertCircle className="w-2.5 h-2.5 text-rxAmber" />
                              <span>{Math.round(med.confidence * 100)}% Verify</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                              <span>{Math.round(med.confidence * 100)}% Conf.</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Doctor Signature & Seal Stamp */}
          <div className="mt-6 pt-4 border-t border-paper-200 flex justify-between items-end">
            <div className="text-[10px] text-ink-400 font-mono">
              <span className="block">Verified by MedBridge Multimodal Core</span>
              <span>SHA-256 Hash: 9b5c...2c9b</span>
            </div>

            <div className="text-center">
              <div className="doctor-script text-xl text-ink-800 -mb-1">
                R. K. Sharma
              </div>
              <div className="w-24 h-0.5 bg-ink-300 mx-auto mb-0.5"></div>
              <span className="text-[9px] font-mono uppercase font-bold text-ink-500">
                Authorized Physician Sign
              </span>
            </div>
          </div>
        </div>

        {/* ACTIVE MEDICINE QUICK CLARITY DRAWER */}
        {activeItem && (
          <div className="mt-4 p-4 rounded-2xl bg-ink-900 text-white shadow-paper-lg border border-ink-800 animate-fadeIn">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-clinical-tealLight font-semibold">
                    {activeItem.category}
                  </span>
                  <span className="text-[10px] bg-ink-800 px-2 py-0.5 rounded-full text-slate-300 font-mono">
                    {activeItem.duration} Course
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mt-0.5 flex items-center gap-2">
                  {activeItem.normalizedName}
                  <span className="text-xs text-clinical-tealLight font-mono">
                    {activeItem.dose}
                  </span>
                </h4>
              </div>

              <button
                onClick={() => onSelectMedicine(activeItem)}
                className="px-3 py-1.5 rounded-xl bg-clinical-teal hover:bg-clinical-tealLight text-ink-950 font-bold text-xs flex items-center gap-1 transition-all"
              >
                <span>Full Intelligence & Voice</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              {activeItem.explanation.en}
            </p>

            <div className="mt-3 pt-2.5 border-t border-ink-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-clinical-tealLight" />
                <span className="text-slate-300 font-medium">
                  {activeItem.frequencyExpanded}
                </span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">
                {activeItem.instructions}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
