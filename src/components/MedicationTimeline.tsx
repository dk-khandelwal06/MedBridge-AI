import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Sparkles, 
  AlertCircle, 
  Plus, 
  ArrowRight,
  Sun,
  Sunset,
  Moon,
  Coffee,
  Layers,
  ChevronRight
} from 'lucide-react';
import { MedicationTimelineSlot, Prescription } from '../types';

interface MedicationTimelineProps {
  slots: MedicationTimelineSlot[];
  prescription: Prescription;
  onToggleSlot: (id: string) => void;
  onAddTreatmentClick: () => void;
  onReconcileClick: () => void;
}

export const MedicationTimeline: React.FC<MedicationTimelineProps> = ({
  slots,
  prescription,
  onToggleSlot,
  onAddTreatmentClick,
  onReconcileClick,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeFilter, setActiveFilter] = useState<'all' | 'Morning' | 'Afternoon' | 'Evening' | 'Night'>('all');

  const filteredSlots = slots.filter(slot => {
    if (activeFilter === 'all') return true;
    return slot.period === activeFilter;
  });

  const takenCount = slots.filter(s => s.taken).length;
  const totalCount = slots.length;
  const adherencePercent = Math.round((takenCount / totalCount) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24 px-3">
      {/* Top Header Card */}
      <div className="bg-ink-900 text-white rounded-3xl p-5 sm:p-7 shadow-paper-lg border border-ink-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-clinical-mint animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-wider text-clinical-tealLight font-bold">
              Consolidated Timeline
            </span>
          </div>

          <span className="text-xs font-mono bg-ink-800 px-3 py-1 rounded-full text-slate-300">
            Course Day 01 of 05
          </span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Today's Medication Journey
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Harmonized schedule from Doctor's Prescription + Recorded Traditional Remedies.
          </p>
        </div>

        {/* Adherence & Metrics Bar */}
        <div className="p-3 bg-ink-950/80 rounded-2xl border border-ink-800/80 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-mono">TODAY'S DOSES</div>
            <div className="text-lg font-extrabold text-white font-mono">
              {takenCount} of {totalCount} Taken
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">ADHERENCE</div>
            <div className="text-lg font-extrabold text-clinical-mint font-mono">
              {adherencePercent}%
            </div>
          </div>
        </div>

        {/* 5-Day Cycle Selector */}
        <div className="pt-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
            Prescription Cycle:
          </span>
          <div className="grid grid-cols-5 gap-1.5">
            {[1, 2, 3, 4, 5].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`py-2 px-1 rounded-xl text-xs font-bold font-mono transition-all flex flex-col items-center ${
                  selectedDay === d
                    ? 'bg-clinical-teal text-ink-950 shadow-glow-teal'
                    : 'bg-ink-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>DAY 0{d}</span>
                <span className="text-[9px] font-normal opacity-80 mt-0.5">
                  {d === 1 ? 'Today' : `Sep ${d}`}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Period Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {(['all', 'Morning', 'Afternoon', 'Evening', 'Night'] as const).map((period) => (
          <button
            key={period}
            onClick={() => setActiveFilter(period)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === period
                ? 'bg-ink-900 text-white shadow-sm'
                : 'bg-white border border-paper-200 text-ink-600 hover:bg-paper-100'
            }`}
          >
            {period === 'all' ? 'All Doses' : period}
          </button>
        ))}
      </div>

      {/* The Flowing Timeline Stream */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-clinical-teal before:via-paper-300 before:to-ink-300">
        {filteredSlots.map((slot) => {
          const isHomeopathic = slot.systemType === 'homeopathic';
          const isHerbal = slot.systemType === 'herbal';

          return (
            <div
              key={slot.id}
              onClick={() => onToggleSlot(slot.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative shadow-paper group ${
                slot.taken
                  ? 'bg-paper-50/70 border-paper-200 opacity-80'
                  : 'bg-white border-paper-200 hover:border-clinical-teal/60 hover:shadow-paper-lg'
              }`}
            >
              {/* Timeline Pin Node */}
              <div className={`absolute -left-[27px] top-5 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                slot.taken
                  ? 'bg-clinical-mint border-clinical-mint text-white'
                  : isHomeopathic
                  ? 'bg-amber-400 border-amber-600'
                  : 'bg-white border-clinical-teal'
              }`}>
                {slot.taken && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
              </div>

              {/* Slot Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-ink-900 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-clinical-teal" />
                    {slot.time}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-paper-100 text-ink-600">
                    {slot.period}
                  </span>
                  {isHomeopathic && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-semibold">
                      Homeopathic Log
                    </span>
                  )}
                  {isHerbal && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold">
                      Herbal Home
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-ink-500">
                    {slot.taken ? 'Taken' : 'Mark as Taken'}
                  </span>
                  {slot.taken ? (
                    <CheckCircle2 className="w-5 h-5 text-clinical-mint fill-clinical-mint/20" />
                  ) : (
                    <Circle className="w-5 h-5 text-paper-400 group-hover:text-clinical-teal" />
                  )}
                </div>
              </div>

              {/* Medicine & Dose Details */}
              <div className="mt-2">
                <h4 className={`text-base font-extrabold ${slot.taken ? 'line-through text-ink-400' : 'text-ink-900'}`}>
                  {slot.medicineName}
                </h4>
                <div className="text-xs font-mono font-bold text-clinical-teal">
                  {slot.dose}
                </div>
              </div>

              {/* Instructions & Source Badge */}
              <div className="mt-2.5 pt-2 border-t border-paper-100 flex items-center justify-between text-xs text-ink-600">
                <span className="italic text-ink-700">
                  {slot.instructions}
                </span>
                <span className="text-[10px] font-mono text-ink-400">
                  {slot.source}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cross-System Quick Navigation Actions */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onAddTreatmentClick}
          className="flex-1 py-3 px-4 rounded-xl border border-paper-300 bg-white hover:bg-paper-50 text-ink-800 font-bold text-xs flex items-center justify-center gap-2 shadow-paper transition-all"
        >
          <Plus className="w-4 h-4 text-clinical-teal" />
          <span>Add Another Treatment / Remedy</span>
        </button>

        <button
          onClick={onReconcileClick}
          className="flex-1 py-3 px-4 rounded-xl bg-ink-900 hover:bg-ink-850 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-paper-lg transition-all"
        >
          <Sparkles className="w-4 h-4 text-clinical-tealLight" />
          <span>Check Cross-System Reconciliation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
