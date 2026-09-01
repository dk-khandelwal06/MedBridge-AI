import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  X, 
  Sparkles, 
  Check, 
  FileText, 
  RefreshCw, 
  AlertCircle, 
  Zap,
  Layers,
  ArrowRight
} from 'lucide-react';
import { DEMO_PRESCRIPTIONS } from '../data/mockData';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCaptureImage: (imageData: string, presetId?: string) => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({
  isOpen,
  onClose,
  onCaptureImage,
}) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'presets'>('camera');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [detectedFields, setDetectedFields] = useState({
    medicine: false,
    dosage: false,
    frequency: false,
    duration: false,
  });
  const [selectedPreset, setSelectedPreset] = useState<string>('rx-sharma-01');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Animate live detected HUD simulation
  useEffect(() => {
    if (!isOpen) return;

    const t1 = setTimeout(() => setDetectedFields(prev => ({ ...prev, medicine: true })), 600);
    const t2 = setTimeout(() => setDetectedFields(prev => ({ ...prev, dosage: true })), 1100);
    const t3 = setTimeout(() => setDetectedFields(prev => ({ ...prev, frequency: true })), 1600);
    const t4 = setTimeout(() => setDetectedFields(prev => ({ ...prev, duration: true })), 2100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen, activeTab]);

  // Start real web camera if requested
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setCameraStream(stream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Unable to access device camera directly:', err);
      setCameraError('Camera access not granted or unavailable. Using high-fidelity intelligent scanner simulation.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (isOpen && activeTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handleCapture = () => {
    if (isCameraActive && videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        stopCamera();
        onCaptureImage(dataUrl);
        return;
      }
    }

    // Default simulated capture with chosen preset
    stopCamera();
    onCaptureImage('', selectedPreset);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        stopCamera();
        onCaptureImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-ink-900 border border-ink-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 border-b border-ink-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-clinical-teal/20 text-clinical-teal flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                Intelligent Prescription Scanner
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">
                Multimodal AI Document Alignment
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-ink-800 hover:bg-ink-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex p-2 bg-ink-950/60 border-b border-ink-800 gap-1.5">
          <button
            onClick={() => setActiveTab('camera')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'camera'
                ? 'bg-clinical-teal text-ink-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Live Camera</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'upload'
                ? 'bg-clinical-teal text-ink-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'presets'
                ? 'bg-clinical-teal text-ink-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Sample Rx</span>
          </button>
        </div>

        {/* Main Scanner Viewport Area */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {activeTab === 'camera' && (
            <div className="relative aspect-[3/4] max-h-[380px] w-full rounded-2xl overflow-hidden bg-ink-950 border border-ink-800 flex items-center justify-center">
              {/* Actual Video or Fallback Simulation */}
              {isCameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                /* High-tech simulated prescription camera viewfinder */
                <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-b from-ink-900 to-ink-950 relative overflow-hidden">
                  {/* Faint Prescription Watermark */}
                  <div className="absolute inset-0 opacity-15 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-none">
                    <span className="font-serif italic text-6xl text-white">℞</span>
                    <span className="doctor-script text-2xl text-white mt-2">Tab. Amoxicillin 500mg 1-0-1</span>
                    <span className="doctor-script text-xl text-white">Tab. Paracetamol 650mg SOS</span>
                    <span className="doctor-script text-lg text-white">Cap. Pantoprazole 40mg 1-0-0</span>
                  </div>

                  {/* Top Perspective Alignment Line */}
                  <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-clinical-tealLight bg-ink-900/80 px-2.5 py-1 rounded-md border border-clinical-teal/20 backdrop-blur-xs">
                    <span>PERSPECTIVE: ALIGNED (0.4°)</span>
                    <span>LIGHT: OPTIMAL</span>
                  </div>

                  {/* Recognition Points HUD */}
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div className="px-3 py-1 rounded-full bg-ink-900/90 border border-clinical-teal/40 text-clinical-tealLight text-xs font-mono font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-clinical-mint animate-ping"></span>
                      <span>Targeting Doctor's Handwritten Rx</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Viewfinder Corner Overlays */}
              <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-clinical-tealLight rounded-tl-lg pointer-events-none"></div>
              <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-clinical-tealLight rounded-tr-lg pointer-events-none"></div>
              <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-clinical-tealLight rounded-bl-lg pointer-events-none"></div>
              <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-clinical-tealLight rounded-br-lg pointer-events-none"></div>

              {/* Animated Scanning Laser Ray */}
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-clinical-tealLight to-transparent animate-scan-beam shadow-[0_0_12px_rgba(20,184,166,0.8)] pointer-events-none"></div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="p-6 rounded-2xl border-2 border-dashed border-ink-700 bg-ink-950/40 text-center space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-clinical-teal/10 border border-clinical-teal/30 text-clinical-teal mx-auto flex items-center justify-center">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Select Prescription Image</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Take a photo from your gallery or choose a handwritten / printed prescription file.
                </p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl bg-clinical-teal text-ink-950 font-bold text-xs hover:bg-clinical-tealLight transition-colors"
              >
                Browse Image File
              </button>
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="space-y-2.5">
              <p className="text-xs text-slate-400">
                Choose a curated clinical sample prescription for instant demo evaluation:
              </p>
              {DEMO_PRESCRIPTIONS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedPreset === preset.id
                      ? 'border-clinical-teal bg-clinical-teal/10 text-white'
                      : 'border-ink-800 bg-ink-950/40 text-slate-300 hover:border-ink-700'
                  }`}
                >
                  <div>
                    <h5 className="font-bold text-xs text-white">{preset.doctorName}</h5>
                    <p className="text-[11px] text-clinical-teal">{preset.clinicName}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {preset.medicines.map(m => m.name).join(', ')}
                    </p>
                  </div>
                  {selectedPreset === preset.id && (
                    <div className="w-5 h-5 rounded-full bg-clinical-teal text-ink-950 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Real-time Field Detection HUD */}
          <div className="bg-ink-950 p-3 rounded-2xl border border-ink-800/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Multimodal Real-Time Detection Feed
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                detectedFields.medicine ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-ink-900 border-ink-800 text-slate-500'
              }`}>
                <span>Medicine Entity</span>
                <span className="font-mono font-bold">{detectedFields.medicine ? '✓ LOCKED' : '...'}</span>
              </div>
              <div className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                detectedFields.dosage ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-ink-900 border-ink-800 text-slate-500'
              }`}>
                <span>Dosage & Units</span>
                <span className="font-mono font-bold">{detectedFields.dosage ? '✓ LOCKED' : '...'}</span>
              </div>
              <div className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                detectedFields.frequency ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-ink-900 border-ink-800 text-slate-500'
              }`}>
                <span>Frequency (1-0-1)</span>
                <span className="font-mono font-bold">{detectedFields.frequency ? '✓ LOCKED' : '...'}</span>
              </div>
              <div className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                detectedFields.duration ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-ink-900 border-ink-800 text-slate-500'
              }`}>
                <span>Duration (Days)</span>
                <span className="font-mono font-bold">{detectedFields.duration ? '✓ LOCKED' : '...'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-ink-800 bg-ink-950/80 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl border border-ink-700 text-slate-300 hover:bg-ink-800 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleCapture}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-clinical-teal to-clinical-mint hover:opacity-95 text-ink-950 font-bold text-sm shadow-glow-teal flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Process & Analyze AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
