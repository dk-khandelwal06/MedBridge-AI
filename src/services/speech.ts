// Web Speech API Voice Synthesizer for English and Hindi prescription explanations

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeakingState = false;
  private listeners: Array<(speaking: boolean, lang: 'en' | 'hi') => void> = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(listener: (speaking: boolean, lang: 'en' | 'hi') => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify(speaking: boolean, lang: 'en' | 'hi') {
    this.isSpeakingState = speaking;
    this.listeners.forEach(l => l(speaking, lang));
  }

  public speak(text: string, lang: 'en' | 'hi' = 'en'): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        console.warn('SpeechSynthesis is not supported on this browser.');
        resolve();
        return;
      }

      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = lang === 'hi' ? 0.9 : 0.95;
      utterance.pitch = 1.0;
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';

      // Find suitable voice
      const voices = this.synth.getVoices();
      if (lang === 'hi') {
        const hindiVoice = voices.find(v => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi') || v.name.toLowerCase().includes('india'));
        if (hindiVoice) utterance.voice = hindiVoice;
      } else {
        const engIndiaVoice = voices.find(v => v.lang === 'en-IN') || voices.find(v => v.lang.startsWith('en'));
        if (engIndiaVoice) utterance.voice = engIndiaVoice;
      }

      utterance.onstart = () => {
        this.notify(true, lang);
      };

      utterance.onend = () => {
        this.notify(false, lang);
        this.currentUtterance = null;
        resolve();
      };

      utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        this.notify(false, lang);
        this.currentUtterance = null;
        resolve();
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    });
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
    this.notify(false, 'en');
    this.currentUtterance = null;
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }
}

export const speechService = new SpeechService();
