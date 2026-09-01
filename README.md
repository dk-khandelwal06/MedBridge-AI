# 🩺 MedBridge — Intelligent Prescription & Cross-System Medication Reconciliation

> **"One Photo. One Clear Picture of Everything You're Taking."**

🏆 **iQOO Hackathon 2026 — Pune Battle 02 | HealthTech Track**  
👥 **Team**: 
- **Daksh Khandelwal** — Lead Product & AI Architect
- **Khushi Kushwah** — Team Member

---

## 💡 Overview & Visual Philosophy

MedBridge is a phone-first AI prescription clarity and medication-reconciliation companion. Rather than a generic healthcare dashboard with repetitive cards, MedBridge introduces a novel visual paradigm:

$$\mathbf{PAPER \longrightarrow INTELLIGENCE \longrightarrow CLARITY}$$

The physical prescription document itself becomes an interactive, living digital canvas — featuring authentic cursive handwriting, real-time AI bounding overlays, confidence scoring, multilingual voice synthesis, and an information convergence engine that unifies allopathic and traditional treatments.

---

## ✨ Key Features & The 11 Connected Screens

1. **Signature Living Prescription Canvas**: Authentic clinic letterhead (*Dr. R. K. Sharma, MD, Pune*), realistic doctor handwriting typography, interactive AI bounding box overlays, confidence badges (96%, 94%, 91%, 68%), and instant clarity drawers.
2. **Intelligent Prescription Scanner & Camera**: Perspective alignment guides, animated scanning laser beam, live field detector HUD (`Medicine ✓`, `Dosage ✓`, `Frequency ✓`, `Duration ✓`), camera capture, gallery upload, and 1-click clinical demo presets.
3. **5-Stage AI Visualizer**: Real-time visual morphing: *Raw Handwriting $\to$ Multimodal OCR $\to$ Structuring $\to$ Clinical Verification & Confidence $\to$ Medication Picture*.
4. **Split Extraction Review**: Dual-plane document intelligence connecting source handwriting snippets to structured cards with confidence percentages (*96% High* vs *68% Low "Please verify"*), inline editing, and medicine normalization.
5. **Medicine Intelligence Profile & Audio**: Visual dosage schedule badges (Morning 🌅, Afternoon ☀️, Night 🌙) + **Bilingual Voice Synthesizer (English & Hindi)** with animated audio equalizers.
6. **Flowing Medication Timeline**: 24-hour visual schedule + 5-day cycle adherence tracker with interactive dose check-offs.
7. **Treatment Library**: Multi-source inventory categorizing Allopathic Prescriptions vs Homeopathic/Home Remedies.
8. **Cross-System Add Treatment Modal**: Record Allopathic, Homeopathic, or Herbal treatments with an explicit **Traditional / Educational Information Disclaimer** banner.
9. **Cross-System Reconciliation (THE WOW SCREEN)**: Dual-stream visual convergence: Allopathic stream & Homeopathic stream flowing into the central MedBridge convergence core. Surfaces amber overlap alerts:
   > *"Treatment information appears to overlap around the same symptom. Consider mentioning all current treatments to both practitioners."*
10. **Consolidated Medication Picture**: Master metrics (*Total Active Medicines, Prescriptions, Treatment Sources, Reconciliation Notices*), unified dependency map, and 1-click export for doctor consultations.
11. **Safety & Ethics Matrix**: *"MedBridge explains. It never decides."* (We Do vs We Don't comparison matrix), privacy guarantees (zero permanent image retention), and hackathon team credits.

---

## 🛠️ Tech Stack

- **Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4 (Custom Medical Paper & Ink Palette)
- **Icons & UI**: Lucide React, Canvas Confetti
- **Multimodal AI**: Google Gemini 1.5/2.0 Flash Vision API (with zero-latency high-fidelity offline fallback demo mode)
- **Audio Synthesis**: Web Speech API (`hi-IN` & `en-IN`/`en-US`)
- **Deployment**: Vercel ready (`vercel.json` SPA routing configured)

---

## 🚀 Quick Start & Local Setup

### 1. Clone & Install
```bash
git clone https://github.com/your-username/medbridge.git
cd medbridge
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 Deploying to Vercel (1-Click Ready)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete MedBridge hackathon prototype"
   git branch -M main
   git remote add origin https://github.com/<your-username>/medbridge.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `medbridge` repository.
4. (Optional) Set `VITE_GEMINI_API_KEY` in Environment Variables if you wish to use your live Google Gemini key.
5. Click **Deploy**!

---

## 🔒 Safety & Medical Disclaimer

MedBridge is strictly an educational, accessibility, and documentation clarity interface. It explains prescriptions and organizes treatment records; it does **not** diagnose, prescribe, alter medications, or replace qualified medical professionals.
