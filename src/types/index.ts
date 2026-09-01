export type SystemType = 'allopathic' | 'homeopathic' | 'ayurvedic' | 'herbal' | 'otc';

export interface TimingSchedule {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  night: boolean;
  withFood: 'before' | 'after' | 'with' | 'empty-stomach' | 'anytime';
}

export interface DetectedBoundingBox {
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  width: number; // percentage
  height: number; // percentage
  label: string;
}

export interface PrescriptionItem {
  id: string;
  name: string;
  normalizedName: string;
  originalHandwrittenText: string;
  dose: string;
  frequency: string;
  frequencyExpanded: string;
  duration: string;
  durationDays: number;
  instructions: string;
  confidence: number; // 0.0 - 1.0 (e.g. 0.94)
  needsConfirmation: boolean;
  category: 'Antibiotic' | 'Antipyretic/Analgesic' | 'Antihistamine' | 'Antacid' | 'Bronchodilator' | 'Muscle Relaxant' | 'Supplement' | 'Other';
  timing: TimingSchedule;
  explanation: {
    en: string;
    hi: string;
  };
  handwritingBox?: DetectedBoundingBox;
  status: 'active' | 'completed' | 'paused';
}

export interface Prescription {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  clinicName: string;
  clinicAddress: string;
  date: string;
  patientName: string;
  patientAge: string;
  diagnosisNotes?: string;
  medicines: PrescriptionItem[];
  rawImage?: string;
  status: 'verified' | 'pending_review' | 'archived';
  systemType: SystemType;
  sourceType: 'camera_scan' | 'gallery_upload' | 'preset_demo';
}

export interface AlternativeTreatment {
  id: string;
  name: string;
  type: 'homeopathic' | 'ayurvedic' | 'herbal' | 'otc_supplement';
  potencyOrDose: string;
  symptomReason: string;
  practitioner?: string;
  frequency: string;
  dateAdded: string;
  notes?: string;
  active: boolean;
  traditionalDisclaimer: string;
}

export interface ReconciliationOverlap {
  id: string;
  symptomCluster: string;
  allopathicMedicines: string[];
  alternativeTreatments: string[];
  severity: 'amber_notice' | 'info_notice';
  observationTitle: string;
  observationBody: string;
  disclosureAdvice: string;
  hasOverlappingIntent: boolean;
}

export interface MedicationTimelineSlot {
  id: string;
  time: string; // e.g. "08:00 AM"
  period: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  medicineName: string;
  dose: string;
  instructions: string;
  source: string;
  isAlternative?: boolean;
  systemType: SystemType;
  taken: boolean;
  dayIndex: number;
}

export type AppScreen =
  | 'home'
  | 'scan'
  | 'ai_processing'
  | 'extraction_review'
  | 'medicine_intelligence'
  | 'medication_timeline'
  | 'treatment_library'
  | 'add_treatment'
  | 'reconciliation'
  | 'medication_picture'
  | 'safety';
