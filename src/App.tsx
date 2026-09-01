import React, { useState, useEffect } from 'react';
import { 
  AppScreen, 
  Prescription, 
  PrescriptionItem, 
  AlternativeTreatment, 
  ReconciliationOverlap, 
  MedicationTimelineSlot 
} from './types';
import { 
  DEMO_PRESCRIPTIONS, 
  INITIAL_ALTERNATIVE_TREATMENTS, 
  RECONCILIATION_OVERLAPS, 
  INITIAL_TIMELINE_SLOTS 
} from './data/mockData';
import { analyzePrescriptionWithGemini } from './services/gemini';
import { TopHeader, BottomMobileNav } from './components/Navigation';
import { PrescriptionCanvas } from './components/PrescriptionCanvas';
import { ScannerModal } from './components/ScannerModal';
import { AIProcessingVisualizer } from './components/AIProcessingVisualizer';
import { ExtractionReview } from './components/ExtractionReview';
import { MedicineIntelligence } from './components/MedicineIntelligence';
import { MedicationTimeline } from './components/MedicationTimeline';
import { TreatmentLibrary } from './components/TreatmentLibrary';
import { AddTreatmentModal } from './components/AddTreatmentModal';
import { CrossSystemReconciliation } from './components/CrossSystemReconciliation';
import { MedicationPicture } from './components/MedicationPicture';
import { SafetyMatrix } from './components/SafetyMatrix';
import { ApiKeyModal } from './components/ApiKeyModal';
import { DeviceSimulatorFrame } from './components/DeviceSimulatorFrame';
import confetti from 'canvas-confetti';

export function App() {
  // Navigation & Screen State
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isAddTreatmentOpen, setIsAddTreatmentOpen] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isMobileSimulator, setIsMobileSimulator] = useState<boolean>(false);

  // Application Data State
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(DEMO_PRESCRIPTIONS);
  const [activePrescription, setActivePrescription] = useState<Prescription>(DEMO_PRESCRIPTIONS[0]);
  const [activeMedicine, setActiveMedicine] = useState<PrescriptionItem>(DEMO_PRESCRIPTIONS[0].medicines[0]);
  const [alternativeTreatments, setAlternativeTreatments] = useState<AlternativeTreatment[]>(INITIAL_ALTERNATIVE_TREATMENTS);
  const [timelineSlots, setTimelineSlots] = useState<MedicationTimelineSlot[]>(INITIAL_TIMELINE_SLOTS);
  const [overlaps, setOverlaps] = useState<ReconciliationOverlap[]>(RECONCILIATION_OVERLAPS);

  // AI Scanning In-Flight State
  const [isAIProcessing, setIsAIProcessing] = useState<boolean>(false);
  const [aiSourceEngine, setAiSourceEngine] = useState<string>('MedBridge Neural Multimodal Pipeline');
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  useEffect(() => {
    const key = (import.meta.env.VITE_GEMINI_API_KEY as string) || localStorage.getItem('medbridge_gemini_key') || '';
    setHasApiKey(key.trim().length > 10);
  }, []);

  // Handle Capture / Image Scan Submission
  const handleCaptureImage = async (imageData: string, presetId?: string) => {
    setIsScannerOpen(false);
    setCurrentScreen('ai_processing');
    setIsAIProcessing(true);

    try {
      const result = await analyzePrescriptionWithGemini(imageData, presetId);
      setActivePrescription(result.prescription);
      setAiSourceEngine(result.sourceEngine);
    } catch (err) {
      console.error('Prescription processing error:', err);
      // Fallback cleanly
      setActivePrescription(DEMO_PRESCRIPTIONS[0]);
    }
  };

  const handleAIProcessingComplete = () => {
    setIsAIProcessing(false);
    setCurrentScreen('extraction_review');
  };

  // Handle Confirmation of Extraction
  const handleConfirmPrescription = (verifiedPrescription: Prescription) => {
    setPrescriptions(prev => {
      const filtered = prev.filter(p => p.id !== verifiedPrescription.id);
      return [verifiedPrescription, ...filtered];
    });
    setActivePrescription(verifiedPrescription);

    // Rebuild timeline slots from verified medicines
    const newSlots: MedicationTimelineSlot[] = [];
    verifiedPrescription.medicines.forEach((med, idx) => {
      if (med.timing.morning) {
        newSlots.push({
          id: `slot-new-${idx}-m`,
          time: med.category === 'Antacid' ? '07:30 AM' : '08:30 AM',
          period: 'Morning',
          medicineName: med.normalizedName,
          dose: med.dose,
          instructions: med.instructions,
          source: verifiedPrescription.clinicName,
          systemType: 'allopathic',
          taken: false,
          dayIndex: 1
        });
      }
      if (med.timing.afternoon) {
        newSlots.push({
          id: `slot-new-${idx}-a`,
          time: '01:30 PM',
          period: 'Afternoon',
          medicineName: med.normalizedName,
          dose: med.dose,
          instructions: med.instructions,
          source: verifiedPrescription.clinicName,
          systemType: 'allopathic',
          taken: false,
          dayIndex: 1
        });
      }
      if (med.timing.night) {
        newSlots.push({
          id: `slot-new-${idx}-n`,
          time: med.category === 'Antihistamine' ? '09:45 PM' : '08:30 PM',
          period: 'Night',
          medicineName: med.normalizedName,
          dose: med.dose,
          instructions: med.instructions,
          source: verifiedPrescription.clinicName,
          systemType: 'allopathic',
          taken: false,
          dayIndex: 1
        });
      }
    });

    if (newSlots.length > 0) {
      setTimelineSlots(prev => [...newSlots, ...prev.filter(s => s.systemType !== 'allopathic')]);
    }

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setActiveMedicine(verifiedPrescription.medicines[0]);
    setCurrentScreen('medicine_intelligence');
  };

  // Add Alternative / Homeopathic Treatment
  const handleAddTreatment = (newTreatment: AlternativeTreatment) => {
    setAlternativeTreatments(prev => [newTreatment, ...prev]);

    // Check if new treatment triggers cross-system symptom overlap
    if (newTreatment.symptomReason.toLowerCase().includes('cough') || newTreatment.symptomReason.toLowerCase().includes('throat') || newTreatment.symptomReason.toLowerCase().includes('cold')) {
      const updatedOverlap: ReconciliationOverlap = {
        id: `overlap-${Date.now()}`,
        symptomCluster: 'Upper Respiratory & Throat Irritation',
        allopathicMedicines: activePrescription.medicines.map(m => `${m.normalizedName} ${m.dose}`),
        alternativeTreatments: [newTreatment.name, 'Ginger & Tulsi Decoction'],
        severity: 'amber_notice',
        observationTitle: 'Treatment information appears to overlap around the same symptom.',
        observationBody: `You are currently taking Allopathic prescription medications (${activePrescription.medicines[0]?.normalizedName}) alongside ${newTreatment.name} for throat/cold symptoms.`,
        disclosureAdvice: 'Consider mentioning all current treatments to both your allopathic doctor and your homeopathic/traditional practitioner.',
        hasOverlappingIntent: true
      };
      setOverlaps([updatedOverlap]);
    }

    // Add slot to timeline
    const newAltSlot: MedicationTimelineSlot = {
      id: `slot-alt-${Date.now()}`,
      time: '08:15 AM',
      period: 'Morning',
      medicineName: newTreatment.name,
      dose: newTreatment.potencyOrDose,
      instructions: newTreatment.notes || 'As directed on clean tongue',
      source: newTreatment.practitioner || 'Home Care',
      isAlternative: true,
      systemType: newTreatment.type === 'homeopathic' ? 'homeopathic' : newTreatment.type === 'herbal' ? 'herbal' : 'otc',
      taken: false,
      dayIndex: 1
    };
    setTimelineSlots(prev => [newAltSlot, ...prev]);

    setCurrentScreen('reconciliation');
  };

  const handleToggleTimelineSlot = (id: string) => {
    setTimelineSlots(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, taken: !s.taken };
      }
      return s;
    }));
  };

  const handleSaveApiKey = (key: string) => {
    if (key.trim()) {
      localStorage.setItem('medbridge_gemini_key', key.trim());
      setHasApiKey(true);
    } else {
      localStorage.removeItem('medbridge_gemini_key');
      setHasApiKey(false);
    }
  };

  // Render Active Screen Component
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <PrescriptionCanvas
            prescription={activePrescription}
            onScanClick={() => setIsScannerOpen(true)}
            onViewPictureClick={() => setCurrentScreen('medication_picture')}
            onSelectMedicine={(med) => {
              setActiveMedicine(med);
              setCurrentScreen('medicine_intelligence');
            }}
            onOpenExtractionReview={() => setCurrentScreen('extraction_review')}
          />
        );

      case 'ai_processing':
        return (
          <AIProcessingVisualizer
            prescription={activePrescription}
            onComplete={handleAIProcessingComplete}
            sourceEngine={aiSourceEngine}
          />
        );

      case 'extraction_review':
        return (
          <ExtractionReview
            prescription={activePrescription}
            onConfirm={handleConfirmPrescription}
            onSelectMedicine={(med) => {
              setActiveMedicine(med);
              setCurrentScreen('medicine_intelligence');
            }}
          />
        );

      case 'medicine_intelligence':
        return (
          <MedicineIntelligence
            medicine={activeMedicine}
            prescription={activePrescription}
            onBack={() => setCurrentScreen('home')}
            onGoToTimeline={() => setCurrentScreen('medication_timeline')}
          />
        );

      case 'medication_timeline':
        return (
          <MedicationTimeline
            slots={timelineSlots}
            prescription={activePrescription}
            onToggleSlot={handleToggleTimelineSlot}
            onAddTreatmentClick={() => setIsAddTreatmentOpen(true)}
            onReconcileClick={() => setCurrentScreen('reconciliation')}
          />
        );

      case 'treatment_library':
        return (
          <TreatmentLibrary
            prescriptions={prescriptions}
            alternativeTreatments={alternativeTreatments}
            onOpenAddTreatment={() => setIsAddTreatmentOpen(true)}
            onOpenScanner={() => setIsScannerOpen(true)}
            onSelectMedicine={(med) => {
              setActiveMedicine(med);
              setCurrentScreen('medicine_intelligence');
            }}
            onGoToReconciliation={() => setCurrentScreen('reconciliation')}
          />
        );

      case 'reconciliation':
        return (
          <CrossSystemReconciliation
            overlaps={overlaps}
            prescriptions={prescriptions}
            alternativeTreatments={alternativeTreatments}
            onGoToMedicationPicture={() => setCurrentScreen('medication_picture')}
          />
        );

      case 'medication_picture':
        return (
          <MedicationPicture
            prescriptions={prescriptions}
            alternativeTreatments={alternativeTreatments}
            onSelectMedicine={(med) => {
              setActiveMedicine(med);
              setCurrentScreen('medicine_intelligence');
            }}
            onGoToTimeline={() => setCurrentScreen('medication_timeline')}
            onGoToReconciliation={() => setCurrentScreen('reconciliation')}
          />
        );

      case 'safety':
        return <SafetyMatrix />;

      default:
        return (
          <PrescriptionCanvas
            prescription={activePrescription}
            onScanClick={() => setIsScannerOpen(true)}
            onViewPictureClick={() => setCurrentScreen('medication_picture')}
            onSelectMedicine={(med) => {
              setActiveMedicine(med);
              setCurrentScreen('medicine_intelligence');
            }}
            onOpenExtractionReview={() => setCurrentScreen('extraction_review')}
          />
        );
    }
  };

  const allActiveMedsCount = prescriptions.flatMap(p => p.medicines).length + alternativeTreatments.length;

  return (
    <DeviceSimulatorFrame
      isSimulatorActive={isMobileSimulator}
      onToggleSimulator={() => setIsMobileSimulator(!isMobileSimulator)}
    >
      <div className="min-h-screen bg-paper-100 flex flex-col font-sans selection:bg-clinical-teal selection:text-white">
        {/* Top Header Navigation */}
        <TopHeader
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          isMobileSimulator={isMobileSimulator}
          onToggleSimulator={() => setIsMobileSimulator(!isMobileSimulator)}
          hasApiKey={hasApiKey}
        />

        {/* Main Application Dynamic Screen Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-4 md:p-6 animate-fadeIn">
          {renderScreen()}
        </main>

        {/* Floating Bottom Nav */}
        <BottomMobileNav
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenScanner={() => setIsScannerOpen(true)}
          hasReconciliationNotice={overlaps.length > 0}
        />

        {/* Scanner Modal */}
        <ScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onCaptureImage={handleCaptureImage}
        />

        {/* Add Treatment Modal */}
        <AddTreatmentModal
          isOpen={isAddTreatmentOpen}
          onClose={() => setIsAddTreatmentOpen(false)}
          onAddTreatment={handleAddTreatment}
        />

        {/* API Key Modal */}
        <ApiKeyModal
          isOpen={isApiKeyModalOpen}
          onClose={() => setIsApiKeyModalOpen(false)}
          onSaveKey={handleSaveApiKey}
          initialKey={localStorage.getItem('medbridge_gemini_key') || ''}
        />
      </div>
    </DeviceSimulatorFrame>
  );
}

export default App;
