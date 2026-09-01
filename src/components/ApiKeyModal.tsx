import React, { useState } from 'react';
import { 
  Key, 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Zap,
  Info
} from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveKey: (key: string) => void;
  initialKey: string;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  onSaveKey,
  initialKey,
}) => {
  const [keyInput, setKeyInput] = useState<string>(initialKey);
  const [saved, setSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveKey(keyInput.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleUseDemo = () => {
    setKeyInput('');
    onSaveKey('');
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-white border border-paper-300 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl space-y-4">
        {/* Header */}
        <div className="p-4 border-b border-paper-200 flex items-center justify-between bg-paper-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-clinical-teal/20 text-clinical-teal flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-ink-900">
                Google Gemini Multimodal AI Setup
              </h3>
              <p className="text-[10px] text-ink-500 font-mono">
                Live Vision Model Configuration
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

        {/* Content Body */}
        <form onSubmit={handleSave} className="p-4 space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="block text-ink-700 font-semibold">
              Gemini API Key
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-paper-300 focus:outline-none focus:border-clinical-teal font-mono text-ink-900"
            />
            <p className="text-[11px] text-ink-500">
              Key is stored locally in your browser session for live vision calls. Never committed or sent to third-party trackers.
            </p>
          </div>

          {/* Quick Demo Mode Switch */}
          <div className="p-3.5 rounded-2xl bg-clinical-teal/10 border border-clinical-teal/20 space-y-2">
            <div className="flex items-center gap-2 text-clinical-teal font-bold">
              <Zap className="w-4 h-4" />
              <span>Zero-Latency Hackathon Demo Mode:</span>
            </div>
            <p className="text-[11px] text-ink-700 leading-relaxed">
              No API key? No problem! MedBridge includes complete pre-analyzed clinical datasets so you can evaluate the entire 3-minute flow with 100% reliability.
            </p>
            <button
              type="button"
              onClick={handleUseDemo}
              className="w-full py-2 rounded-xl bg-white border border-clinical-teal/40 text-clinical-teal font-bold text-xs hover:bg-clinical-teal/10 transition-colors"
            >
              Activate Zero-Failure Demo Mode
            </button>
          </div>

          {/* Buttons */}
          <div className="pt-2 border-t border-paper-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-paper-300 text-ink-700 hover:bg-paper-100 font-semibold transition-colors"
            >
              Close
            </button>

            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-ink-900 hover:bg-ink-850 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-paper transition-all"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-clinical-mint" />
                  <span>Config Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-clinical-tealLight" />
                  <span>Save & Apply AI Key</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
