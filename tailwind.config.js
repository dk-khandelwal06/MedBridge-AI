/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FCFBF9',
          100: '#F7F5F0',
          200: '#EFECE4',
          300: '#E2DEC2',
          400: '#C8C2B0',
          500: '#A39C89',
        },
        ink: {
          950: '#070C18',
          900: '#0B132B',
          850: '#0E1A38',
          800: '#142145',
          700: '#1C2E5E',
          600: '#2A4382',
          500: '#4062B3',
        },
        clinical: {
          teal: '#0D9488',
          tealLight: '#14B8A6',
          tealMuted: '#CCFBF1',
          mint: '#10B981',
          mintLight: '#D1FAE5',
          emerald: '#059669',
        },
        rxAmber: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          dark: '#B45309',
        },
        rxRed: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        handwriting: ['"Caveat"', '"Reenie Beanie"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'paper-sm': '0 1px 3px rgba(11, 19, 43, 0.05), 0 1px 2px rgba(11, 19, 43, 0.03)',
        'paper': '0 4px 20px -2px rgba(11, 19, 43, 0.08), 0 2px 6px -1px rgba(11, 19, 43, 0.04)',
        'paper-lg': '0 12px 36px -4px rgba(11, 19, 43, 0.12), 0 4px 12px -2px rgba(11, 19, 43, 0.06)',
        'glow-teal': '0 0 24px -2px rgba(13, 148, 136, 0.35)',
        'glow-mint': '0 0 24px -2px rgba(16, 185, 129, 0.35)',
        'glow-amber': '0 0 24px -2px rgba(245, 158, 11, 0.35)',
      },
      keyframes: {
        scanBeam: {
          '0%': { top: '0%', opacity: '0.8' },
          '50%': { top: '100%', opacity: '1' },
          '100%': { top: '0%', opacity: '0.8' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        floatSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        convergeLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        convergeRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        }
      },
      animation: {
        'scan-beam': 'scanBeam 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'float': 'floatSubtle 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
