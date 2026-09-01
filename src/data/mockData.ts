import { Prescription, AlternativeTreatment, ReconciliationOverlap, MedicationTimelineSlot } from '../types';

export const DEMO_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-sharma-01',
    doctorName: 'Dr. R. K. Sharma, M.D. (Med)',
    doctorSpecialty: 'Consultant Physician & Chest Specialist',
    clinicName: 'Shanti Medicare Clinic',
    clinicAddress: '128, F.C. Road, Shivajinagar, Pune - 411005',
    date: '2026-09-01',
    patientName: 'Rahul Deshmukh',
    patientAge: '32 Yrs / Male',
    diagnosisNotes: 'Acute Upper Respiratory Tract Infection (URTI) with Low-grade Fever & Throat Irritation',
    status: 'verified',
    systemType: 'allopathic',
    sourceType: 'preset_demo',
    medicines: [
      {
        id: 'med-amox-500',
        name: 'Amoxicillin',
        normalizedName: 'Amoxicillin',
        originalHandwrittenText: 'Tab. Amox 500 mg',
        dose: '500 mg',
        frequency: '1-0-1 (Twice daily)',
        frequencyExpanded: 'Twice daily (Morning after breakfast & Night after dinner)',
        duration: '5 days',
        durationDays: 5,
        instructions: 'Take with warm water after meals. Complete the entire 5-day course.',
        confidence: 0.96,
        needsConfirmation: false,
        category: 'Antibiotic',
        timing: {
          morning: true,
          afternoon: false,
          evening: false,
          night: true,
          withFood: 'after',
        },
        explanation: {
          en: 'A penicillin-group antibiotic that eradicates bacterial throat & airway infections. Continue taking it for all 5 days even if your throat feels fine on Day 3.',
          hi: 'यह एक एंटीबायोटिक दवा है जो गले और सांस की नली में जीवाणु संक्रमण को खत्म करती है। 5 दिनों का पूरा कोर्स समाप्त करें, भले ही आप पहले ही ठीक महसूस करने लगें।'
        },
        handwritingBox: {
          x: 12,
          y: 38,
          width: 76,
          height: 9,
          label: 'Tab. Amox 500mg 1-0-1 x 5d'
        },
        status: 'active'
      },
      {
        id: 'med-pcm-650',
        name: 'Paracetamol',
        normalizedName: 'Paracetamol',
        originalHandwrittenText: 'Tab. PCM 650',
        dose: '650 mg',
        frequency: '1-0-1 SOS',
        frequencyExpanded: 'SOS (Only when fever > 99.5°F or severe body ache occurs)',
        duration: '3 days',
        durationDays: 3,
        instructions: 'Take with or after food. Keep a gap of at least 6 hours between doses.',
        confidence: 0.94,
        needsConfirmation: false,
        category: 'Antipyretic/Analgesic',
        timing: {
          morning: true,
          afternoon: false,
          evening: false,
          night: true,
          withFood: 'after',
        },
        explanation: {
          en: 'Controls fever and eases headache/body pain. Take only when temperature is high or body ache is bothersome.',
          hi: 'यह दवा बुखार और शरीर के दर्द को कम करती है। इसे तभी लें जब बुखार हो या शरीर में तेज दर्द महसूस हो।'
        },
        handwritingBox: {
          x: 12,
          y: 49,
          width: 76,
          height: 9,
          label: 'Tab. PCM 650 1-0-1 SOS'
        },
        status: 'active'
      },
      {
        id: 'med-panto-40',
        name: 'Pantoprazole',
        normalizedName: 'Pantoprazole',
        originalHandwrittenText: 'Cap. Panto 40',
        dose: '40 mg',
        frequency: '1-0-0 (Once daily)',
        frequencyExpanded: 'Once daily (Morning, strictly 30 mins before breakfast)',
        duration: '5 days',
        durationDays: 5,
        instructions: 'Swallow whole with plain water on an empty stomach.',
        confidence: 0.91,
        needsConfirmation: false,
        category: 'Antacid',
        timing: {
          morning: true,
          afternoon: false,
          evening: false,
          night: false,
          withFood: 'empty-stomach',
        },
        explanation: {
          en: 'Protects the stomach lining by lowering acid production, preventing acidity caused by the antibiotic.',
          hi: 'यह पेट में एसिड को नियंत्रित करती है और एंटीबायोटिक दवाओं से होने वाली गैस या सीने में जलन से बचाती है। सुबह खाली पेट लें।'
        },
        handwritingBox: {
          x: 12,
          y: 60,
          width: 76,
          height: 9,
          label: 'Cap. Panto 40 1-0-0 AC (Empty Stomach)'
        },
        status: 'active'
      },
      {
        id: 'med-cetz-10',
        name: 'Cetirizine',
        normalizedName: 'Cetirizine',
        originalHandwrittenText: 'Tab. Cetrizin 10',
        dose: '10 mg',
        frequency: '0-0-1 (Bedtime)',
        frequencyExpanded: 'Once daily at bedtime',
        duration: '3 days',
        durationDays: 3,
        instructions: 'Take 30 mins before sleeping. Avoid driving immediately after.',
        confidence: 0.68,
        needsConfirmation: true,
        category: 'Antihistamine',
        timing: {
          morning: false,
          afternoon: false,
          evening: false,
          night: true,
          withFood: 'after',
        },
        explanation: {
          en: 'Reduces sneezing, running nose, and itchy throat. May induce mild relaxation or sleepiness.',
          hi: 'यह सर्दी, छींक और बहती नाक को रोकती है। इससे हल्की नींद आ सकती है, इसलिए रात को सोते समय लें।'
        },
        handwritingBox: {
          x: 12,
          y: 71,
          width: 76,
          height: 9,
          label: 'Tab. Cetrizin 10mg 0-0-1 HS'
        },
        status: 'active'
      }
    ]
  },
  {
    id: 'rx-mehta-02',
    doctorName: 'Dr. Ananya Mehta, M.D., D.N.B.',
    doctorSpecialty: 'Senior Pulmonologist',
    clinicName: 'Pune Chest & Respiratory Centre',
    clinicAddress: 'Deccan Gymkhana, Pune - 411004',
    date: '2026-08-28',
    patientName: 'Rahul Deshmukh',
    patientAge: '32 Yrs / Male',
    diagnosisNotes: 'Seasonal Bronchial Allergy with Persistent Nocturnal Cough',
    status: 'verified',
    systemType: 'allopathic',
    sourceType: 'preset_demo',
    medicines: [
      {
        id: 'med-azithro-500',
        name: 'Azithromycin',
        normalizedName: 'Azithromycin',
        originalHandwrittenText: 'Azithromvcin 500',
        dose: '500 mg',
        frequency: '1-0-0 (Once daily)',
        frequencyExpanded: 'Once daily in the morning 1 hour before breakfast',
        duration: '3 days',
        durationDays: 3,
        instructions: 'Take at the exact same hour each day.',
        confidence: 0.95,
        needsConfirmation: false,
        category: 'Antibiotic',
        timing: {
          morning: true,
          afternoon: false,
          evening: false,
          night: false,
          withFood: 'empty-stomach',
        },
        explanation: {
          en: 'A targeted respiratory antibiotic that clears deep bronchial bacterial colonization in a short 3-day course.',
          hi: 'यह फेफड़ों और श्वसन नली के संक्रमण को साफ करने वाली 3 दिन की एंटीबायोटिक दवा है।'
        },
        handwritingBox: {
          x: 12,
          y: 42,
          width: 76,
          height: 9,
          label: 'Tab. Azithromvcin 500 1-0-0 x 3d'
        },
        status: 'active'
      },
      {
        id: 'med-montair-lc',
        name: 'Levocetirizine + Montelukast',
        normalizedName: 'Levocetirizine + Montelukast',
        originalHandwrittenText: 'Montair-LC',
        dose: '5mg / 10mg',
        frequency: '0-0-1 (Night)',
        frequencyExpanded: 'Once daily at night after dinner',
        duration: '5 days',
        durationDays: 5,
        instructions: 'Take consistently at bedtime.',
        confidence: 0.89,
        needsConfirmation: false,
        category: 'Antihistamine',
        timing: {
          morning: false,
          afternoon: false,
          evening: false,
          night: true,
          withFood: 'after',
        },
        explanation: {
          en: 'Calms nighttime allergic coughing fits and reduces airway inflammation.',
          hi: 'यह रात में होने वाले खांसी के दौरे और एलर्जी को शांत करने में मदद करती है।'
        },
        handwritingBox: {
          x: 12,
          y: 54,
          width: 76,
          height: 9,
          label: 'Tab. Montair-LC 0-0-1 HS x 5d'
        },
        status: 'active'
      }
    ]
  }
];

export const INITIAL_ALTERNATIVE_TREATMENTS: AlternativeTreatment[] = [
  {
    id: 'alt-arsenicum-30',
    name: 'Arsenicum Album 30C',
    type: 'homeopathic',
    potencyOrDose: '30C Potency (4 Globules)',
    symptomReason: 'Throat burning, recurrent dry sneezes, nighttime cold restlessness',
    practitioner: 'Dr. Sunil Joshi (B.H.M.S., Pune)',
    frequency: 'Twice daily (Morning & Evening, on clean tongue)',
    dateAdded: '2026-08-30',
    notes: 'Prescribed for seasonal cold sensitivity and throat tickle.',
    active: true,
    traditionalDisclaimer: 'Traditional & Educational Information Only. MedBridge does not recommend, prescribe, or validate clinical efficacy of homeopathic remedies. Never stop prescribed allopathic medications without your physician’s explicit consent.'
  },
  {
    id: 'alt-tulsi-ginger',
    name: 'Ginger & Holy Basil (Tulsi) Decoction',
    type: 'herbal',
    potencyOrDose: '1 Cup (Warm Infusion)',
    symptomReason: 'Sore throat comfort and soothing mucosal lining',
    practitioner: 'Self / Traditional Home Wellness',
    frequency: 'Once in the evening',
    dateAdded: '2026-09-01',
    notes: 'Home preparation with crushed ginger, black pepper, and fresh tulsi leaves.',
    active: true,
    traditionalDisclaimer: 'Herbal home wellness measure. Not a substitute for prescribed medical therapy.'
  }
];

export const RECONCILIATION_OVERLAPS: ReconciliationOverlap[] = [
  {
    id: 'overlap-resp-01',
    symptomCluster: 'Upper Respiratory & Throat Irritation',
    allopathicMedicines: ['Amoxicillin 500mg', 'Cetirizine 10mg'],
    alternativeTreatments: ['Arsenicum Album 30C', 'Ginger & Tulsi Decoction'],
    severity: 'amber_notice',
    observationTitle: 'Treatment information appears to overlap around the same symptom.',
    observationBody: 'You are currently taking Allopathic prescription medications (Amoxicillin & Cetirizine) targeting bacterial throat infection and allergic rhinitis, alongside a Homeopathic remedy (Arsenicum Album 30C) and herbal decoction aimed at throat tickle and cold relief.',
    disclosureAdvice: 'Consider mentioning all current treatments (including homeopathic and home herbal remedies) to both your consulting physician and your homeopathic practitioner during your next follow-up. Open disclosure prevents uncoordinated management.',
    hasOverlappingIntent: true
  }
];

export const INITIAL_TIMELINE_SLOTS: MedicationTimelineSlot[] = [
  {
    id: 'slot-1',
    time: '07:30 AM',
    period: 'Morning',
    medicineName: 'Pantoprazole',
    dose: '40 mg',
    instructions: '30 mins before breakfast on empty stomach',
    source: 'Dr. Sharma Prescription',
    systemType: 'allopathic',
    taken: true,
    dayIndex: 1
  },
  {
    id: 'slot-2',
    time: '08:15 AM',
    period: 'Morning',
    medicineName: 'Arsenicum Album 30C',
    dose: '4 Globules',
    instructions: 'Dissolve on clean tongue (no strong tastes 15 min prior)',
    source: 'Dr. Joshi Homeopathic Rx',
    isAlternative: true,
    systemType: 'homeopathic',
    taken: true,
    dayIndex: 1
  },
  {
    id: 'slot-3',
    time: '08:45 AM',
    period: 'Morning',
    medicineName: 'Amoxicillin',
    dose: '500 mg',
    instructions: 'Take immediately after breakfast with water',
    source: 'Dr. Sharma Prescription',
    systemType: 'allopathic',
    taken: true,
    dayIndex: 1
  },
  {
    id: 'slot-4',
    time: '01:30 PM',
    period: 'Afternoon',
    medicineName: 'Paracetamol (If fever occurs)',
    dose: '650 mg',
    instructions: 'Only if body ache or temperature > 99.5°F',
    source: 'Dr. Sharma Prescription',
    systemType: 'allopathic',
    taken: false,
    dayIndex: 1
  },
  {
    id: 'slot-5',
    time: '06:30 PM',
    period: 'Evening',
    medicineName: 'Ginger & Tulsi Warm Decoction',
    dose: '1 Cup',
    instructions: 'Sip warm for throat soothing',
    source: 'Home Wellness Log',
    isAlternative: true,
    systemType: 'herbal',
    taken: false,
    dayIndex: 1
  },
  {
    id: 'slot-6',
    time: '08:30 PM',
    period: 'Night',
    medicineName: 'Amoxicillin',
    dose: '500 mg',
    instructions: 'After dinner with full glass of water',
    source: 'Dr. Sharma Prescription',
    systemType: 'allopathic',
    taken: false,
    dayIndex: 1
  },
  {
    id: 'slot-7',
    time: '09:45 PM',
    period: 'Night',
    medicineName: 'Cetirizine',
    dose: '10 mg',
    instructions: 'At bedtime (May cause mild sleepiness)',
    source: 'Dr. Sharma Prescription',
    systemType: 'allopathic',
    taken: false,
    dayIndex: 1
  }
];
