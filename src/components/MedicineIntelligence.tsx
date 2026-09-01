import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Clock, 
  Calendar, 
  Info, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight,
  Sun,
  Sunset,
  Moon,
  Coffee,
  Languages,
  Share2
} from 'lucide-react';
import { PrescriptionItem, Prescription } from '../types';
import { speechService } from '../services/speech';

interface MedicineIntelligenceProps {
  medicine: PrescriptionItem;
  prescription: Prescription;
  onBack: () => void;
  onGoToTimeline: () => void;
}

export const MedicineIntelligence: React.FC<MedicineIntelligenceProps> = ({
  medicine,
  prescription,
  onBack,
  onGoToTimeline,
}) => {
  const [selectedLang, setSelectedLang] = useState<'en' | 'hi'>('en');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = speechService.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => {
      speechService.stop();
      unsubscribe();
    };
  }, []);

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      speechService.stop();
    } else {
      const textToSpeak = selectedLang === 'hi' 
        ? `${medicine.normalizedName}, ${medicine.dose}। ${medicine.explanation.hi} यह दवा ${medicine.frequencyExpanded} ली जानी चाहिए।` 
        : `${medicine.normalizedName} ${medicine.dose}. ${medicine.explanation.en} Schedule: ${medicine.frequencyExpanded}. Instructions: ${medicine.instructions}.`;
      speechService.speak(textToSpeak, selectedLang);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 px-3">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-3 py-1.5 rounded-xl border border-paper-300 bg-white text-ink-700 hover:bg-paper-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Canvas</span>
        </button>

        <span className="text-xs font-mono font-bold text-ink-500 uppercase">
          Medicine Profile
        </span>
      </div>

      {/* Main Medicine Intelligence Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-paper-200 shadow-paper-lg space-y-6">
        {/* Category & Badge */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-clinical-teal/10 text-clinical-teal text-xs font-mono font-bold uppercase tracking-wider">
            {medicine.category}
          </span>
          <span className="text-xs font-mono text-ink-500 bg-paper-100 px-2.5 py-1 rounded-md">
            Duration: {medicine.duration}
          </span>
        </div>

        {/* Large Medicine Headline */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight">
            {medicine.normalizedName}
          </h1>
          <p className="text-lg font-mono font-bold text-clinical-teal mt-1">
            {medicine.dose}
          </p>
        </div>

        {/* Visual Schedule Timeline Icons */}
        <div className="p-4 rounded-2xl bg-paper-50 border border-paper-200 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-ink-600 font-bold block">
            Visual Daily Dosage Schedule:
          </span>

          <div className="grid grid-cols-3 gap-2.5">
            {/* Morning */}
            <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
              medicine.timing.morning
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                : 'bg-white border-paper-200 text-ink-300 opacity-60'
            }`}>
              <Sun className={`w-5 h-5 mb-1 ${medicine.timing.morning ? 'text-amber-500' : 'text-ink-300'}`} />
              <span className="text-xs">Morning</span>
              <span className="text-[10px] font-mono mt-0.5">
                {medicine.timing.morning ? '1 DOSE' : '—'}
              </span>
            </div>

            {/* Afternoon */}
            <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
              medicine.timing.afternoon
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                : 'bg-white border-paper-200 text-ink-300 opacity-60'
            }`}>
              <Sun className={`w-5 h-5 mb-1 ${medicine.timing.afternoon ? 'text-amber-600' : 'text-ink-300'}`} />
              <span className="text-xs">Afternoon</span>
              <span className="text-[10px] font-mono mt-0.5">
                {medicine.timing.afternoon ? '1 DOSE' : '—'}
              </span>
            </div>

            {/* Night */}
            <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
              medicine.timing.night
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                : 'bg-white border-paper-200 text-ink-300 opacity-60'
            }`}>
              <Moon className={`w-5 h-5 mb-1 ${medicine.timing.night ? 'text-indigo-600' : 'text-ink-300'}`} />
              <span className="text-xs">Night</span>
              <span className="text-[10px] font-mono mt-0.5">
                {medicine.timing.night ? '1 DOSE' : '—'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-ink-700 pt-1 font-medium">
            <span className="flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5 text-ink-500" />
              <span>Timing Rule: <strong>{medicine.instructions}</strong></span>
            </span>
            <span className="text-clinical-teal font-semibold">
              {medicine.frequencyExpanded}
            </span>
          </div>
        </div>

        {/* Plain Language Explanation & Voice Synthesizer */}
        <div className="p-5 rounded-2xl bg-ink-900 text-white space-y-4 shadow-paper">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-clinical-tealLight font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              What Your Prescription Says
            </span>

            {/* English / Hindi Toggle */}
            <div className="flex items-center gap-1 bg-ink-800 p-1 rounded-xl border border-ink-700">
              <button
                onClick={() => {
                  speechService.stop();
                  setSelectedLang('en');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedLang === 'en' ? 'bg-clinical-teal text-ink-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => {
                  speechService.stop();
                  setSelectedLang('hi');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedLang === 'hi' ? 'bg-clinical-teal text-ink-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिंदी (Hindi)
              </button>
            </div>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-slate-200">
            {selectedLang === 'hi' ? medicine.explanation.hi : medicine.explanation.en}
          </p>

          {/* Audio Voice Player Bar */}
          <div className="pt-3 border-t border-ink-800 flex items-center justify-between gap-3">
            <button
              onClick={handleToggleSpeech}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                isSpeaking 
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                  : 'bg-clinical-teal hover:bg-clinical-tealLight text-ink-950 shadow-glow-teal'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? 'Stop Audio' : `Listen (${selectedLang === 'hi' ? 'हिंदी' : 'English'})`}</span>
            </button>

            {/* Active Waveform Equalizer Animation */}
            {isSpeaking && (
              <div className="flex items-center gap-1 px-3 py-2 bg-ink-950 rounded-xl border border-clinical-teal/30">
                <span className="wave-bar"></span>
                <span className="wave-bar"></span>
                <span className="wave-bar"></span>
                <span className="wave-bar"></span>
                <span className="wave-bar"></span>
                <span className="wave-bar"></span>
                <span className="wave-bar"></span>
                <span className="wave-bar"></span>
              </div>
            )}
          </div>
        </div>

        {/* Source Attribution & Safety Boundary */}
        <div className="space-y-1.5 text-xs text-ink-500 border-t border-paper-200 pt-4">
          <div className="flex items-center gap-1.5 text-ink-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-clinical-mint" />
            <span>Extracted from {prescription.clinicName} • {prescription.doctorName}</span>
          </div>
          <div className="flex items-center gap-1.5 text-ink-400">
            <ShieldCheck className="w-3.5 h-3.5 text-clinical-teal" />
            <span>AI-generated clarification • Does not alter or replace medical prescription</span>
          </div>
        </div>

        {/* Next Step CTA */}
        <div className="pt-2">
          <button
            onClick={onGoToTimeline}
            className="w-full py-3.5 px-4 rounded-2xl bg-ink-900 hover:bg-ink-850 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-paper transition-colors"
          >
            <span>View in Daily Medication Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
