// Normalization engine for OCR & handwritten medicine entities

export interface NormalizationResult {
  normalizedName: string;
  originalQuery: string;
  confidence: number;
  isNormalized: boolean;
  category: 'Antibiotic' | 'Antipyretic/Analgesic' | 'Antihistamine' | 'Antacid' | 'Bronchodilator' | 'Muscle Relaxant' | 'Supplement' | 'Other';
  commonDosage: string;
  explanationEn: string;
  explanationHi: string;
  standardFrequency: string;
}

const MEDICINE_KNOWLEDGE_BASE: Record<string, {
  canonicalName: string;
  aliases: string[];
  category: NormalizationResult['category'];
  commonDosage: string;
  explanationEn: string;
  explanationHi: string;
  standardFrequency: string;
}> = {
  amoxicillin: {
    canonicalName: 'Amoxicillin',
    aliases: ['amoxcilin', 'amoxil', 'amoxicilin', 'amox 500', 'amoxycillin', 'mox 500', 'amox'],
    category: 'Antibiotic',
    commonDosage: '500 mg',
    explanationEn: 'A broad-spectrum penicillin antibiotic used to treat bacterial infections of the respiratory tract, throat, and ears. Complete the full course even if you feel better.',
    explanationHi: 'यह एक एंटीबायोटिक दवा है जो श्वसन तंत्र, गले और कान के जीवाणु संक्रमण के इलाज के लिए दी जाती है। ठीक महसूस होने पर भी पूरा कोर्स पूरा करें।',
    standardFrequency: '1-0-1 (Twice daily after food)'
  },
  paracetamol: {
    canonicalName: 'Paracetamol',
    aliases: ['paracitamol', 'pcm', 'pcm 650', 'dolo', 'dolo 650', 'crocin', 'calpol', 'para 650', 'pacimol'],
    category: 'Antipyretic/Analgesic',
    commonDosage: '650 mg',
    explanationEn: 'Used to reduce fever and relieve mild to moderate pain (headache, body ache). Take with or after food. Do not exceed recommended dosage.',
    explanationHi: 'यह बुखार कम करने और सिरदर्द या शरीर दर्द से राहत पाने के लिए उपयोग की जाने वाली दवा है। भोजन के साथ या बाद में लें।',
    standardFrequency: '1-0-1 SOS (When needed for fever/pain)'
  },
  pantoprazole: {
    canonicalName: 'Pantoprazole',
    aliases: ['panto 40', 'pan 40', 'pantop', 'pantocid', 'pantosec', 'pantoprazol'],
    category: 'Antacid',
    commonDosage: '40 mg',
    explanationEn: 'A proton pump inhibitor (PPI) that reduces stomach acid production. Prevents gastric irritation caused by antibiotics and painkillers. Best taken on an empty stomach in the morning.',
    explanationHi: 'यह पेट में एसिड बनने को कम करने वाली दवा है। एंटीबायोटिक्स या दर्द की दवाओं से होने वाली गैस और जलन से बचाती है। सुबह खाली पेट लें।',
    standardFrequency: '1-0-0 (Once daily before breakfast on empty stomach)'
  },
  cetirizine: {
    canonicalName: 'Cetirizine',
    aliases: ['cetrizin', 'cetzine', 'alerid', 'okacet', 'cetirizn', 'cetrizine'],
    category: 'Antihistamine',
    commonDosage: '10 mg',
    explanationEn: 'An anti-allergic medicine for running nose, sneezing, itching, and watery eyes. May cause mild drowsiness, so usually prescribed at bedtime.',
    explanationHi: 'यह सर्दी-जुकाम, छींक, खुजली और बहती नाक के लिए एंटी-एलर्जिक दवा है। इससे हल्की नींद आ सकती है, इसलिए रात को सोते समय लें।',
    standardFrequency: '0-0-1 (Once daily at bedtime)'
  },
  azithromycin: {
    canonicalName: 'Azithromycin',
    aliases: ['azithromvcin', 'azithral', 'azee 500', 'zithromax', 'azithro', 'azithro 500'],
    category: 'Antibiotic',
    commonDosage: '500 mg',
    explanationEn: 'A macrolide antibiotic commonly used for chest, throat, and sinus infections. Usually taken once daily for a short 3 to 5 day course 1 hour before or 2 hours after meals.',
    explanationHi: 'यह छाती, गले और साइनस के गंभीर संक्रमण के लिए दी जाने वाली एंटीबायोटिक दवा है। इसे दिन में केवल एक बार 3 से 5 दिनों के लिए लिया जाता है।',
    standardFrequency: '1-0-0 (Once daily, 1 hour before meal)'
  },
  levocetirizine_montelukast: {
    canonicalName: 'Levocetirizine + Montelukast',
    aliases: ['montair-lc', 'montek-lc', 'levocet m', 'levocet-m', 'levo mont', 'monticope'],
    category: 'Antihistamine',
    commonDosage: '5mg / 10mg',
    explanationEn: 'Combination antiallergic and leukotriene receptor blocker for allergic rhinitis, wheezing, persistent allergic cough, and asthma symptoms.',
    explanationHi: 'यह लगातार खांसी, एलर्जी, छींक और सांस की तकलीफ को नियंत्रित करने वाली संयोजन दवा है। रात को लेना सबसे प्रभावी होता है।',
    standardFrequency: '0-0-1 (Once daily at night)'
  },
  aceclofenac_paracetamol: {
    canonicalName: 'Aceclofenac + Paracetamol',
    aliases: ['zerodol-p', 'aceclo-p', 'hifenac-p', 'aceclofenac p', 'aceclo plus'],
    category: 'Antipyretic/Analgesic',
    commonDosage: '100mg / 325mg',
    explanationEn: 'Anti-inflammatory combination medicine prescribed for joint pain, muscle strain, post-traumatic inflammation, and swelling. Always take after meals.',
    explanationHi: 'यह जोड़ों के दर्द, मांसपेशियों में खिंचाव और सूजन को कम करने वाली दर्दनिवारक दवा है। इसे हमेशा भोजन के बाद ही लें।',
    standardFrequency: '1-0-1 (Twice daily strictly after food)'
  }
};

function levenshteinDistance(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix: number[][] = [];
  for (let i = 0; i <= bn; ++i) matrix[i] = [i];
  for (let i = 0; i <= an; ++i) matrix[0][i] = i;

  for (let i = 1; i <= bn; ++i) {
    for (let j = 1; j <= an; ++j) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[bn][an];
}

export function normalizeMedicineInput(rawInput: string): NormalizationResult {
  const clean = rawInput.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '');
  
  // Exact or alias match
  for (const [, item] of Object.entries(MEDICINE_KNOWLEDGE_BASE)) {
    if (item.canonicalName.toLowerCase() === clean || item.aliases.includes(clean)) {
      return {
        normalizedName: item.canonicalName,
        originalQuery: rawInput,
        confidence: 0.98,
        isNormalized: item.canonicalName.toLowerCase() !== rawInput.toLowerCase().trim(),
        category: item.category,
        commonDosage: item.commonDosage,
        explanationEn: item.explanationEn,
        explanationHi: item.explanationHi,
        standardFrequency: item.standardFrequency,
      };
    }
  }

  // Fuzzy match across aliases
  let bestMatch: (typeof MEDICINE_KNOWLEDGE_BASE)[string] | null = null;
  let lowestDist = Infinity;

  for (const [, item] of Object.entries(MEDICINE_KNOWLEDGE_BASE)) {
    const candidates = [item.canonicalName.toLowerCase(), ...item.aliases];
    for (const cand of candidates) {
      const dist = levenshteinDistance(clean, cand);
      if (dist < lowestDist && dist <= Math.max(2, Math.floor(cand.length * 0.35))) {
        lowestDist = dist;
        bestMatch = item;
      }
    }
  }

  if (bestMatch && lowestDist <= 3) {
    const computedConfidence = Math.max(0.72, +(1 - (lowestDist / Math.max(clean.length, 5))).toFixed(2));
    return {
      normalizedName: bestMatch.canonicalName,
      originalQuery: rawInput,
      confidence: computedConfidence,
      isNormalized: true,
      category: bestMatch.category,
      commonDosage: bestMatch.commonDosage,
      explanationEn: bestMatch.explanationEn,
      explanationHi: bestMatch.explanationHi,
      standardFrequency: bestMatch.standardFrequency,
    };
  }

  // Fallback if no match
  return {
    normalizedName: rawInput.trim(),
    originalQuery: rawInput,
    confidence: 0.65,
    isNormalized: false,
    category: 'Other',
    commonDosage: 'As directed',
    explanationEn: 'Take strictly according to physician advice and prescription notes.',
    explanationHi: 'कृपया डॉक्टर की पर्ची पर दिए गए निर्देशों के अनुसार ही सेवन करें।',
    standardFrequency: 'As prescribed',
  };
}
