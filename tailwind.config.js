/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nuova palette Oro & Marrone - Raffinata e calda
        primary: {
          50: '#fefcf7',
          100: '#fdf8ed',
          200: '#faf0d9',
          300: '#f5e4b8',
          400: '#efd494',
          500: '#D4AF37', // Oro Champagne principale
          600: '#b8941f',
          700: '#9a7a1a',
          800: '#7d6318',
          900: '#665118',
        },
        secondary: {
          50: '#f7f3f0',
          100: '#ede5df',
          200: '#dbc8bb',
          300: '#c5a693',
          400: '#a8826b',
          500: '#8B5E3C', // Marrone Terra Calda
          600: '#7a4f32',
          700: '#66422a',
          800: '#543726',
          900: '#462f22',
        },
        neutral: {
          50: '#F5F0EB', // Beige delicato - sfondo chiaro
          100: '#ede6df',
          200: '#ddd0c5',
          300: '#c8b5a5',
          400: '#b09485',
          500: '#756F6A', // Grigio caldo - testo secondario
          600: '#5f5954',
          700: '#4f4a45',
          800: '#423e3a',
          900: '#3B2F2F', // Marrone cioccolato scuro - modalità dark
        },
        text: {
          primary: '#2B1D1A', // Marrone scuro/nero - testo principale
          secondary: '#756F6A', // Grigio caldo - testo secondario
          light: '#F5F0EB', // Beige per dark mode
          gold: '#E5C07B', // Oro pallido per dark mode
        },
        accent: {
          gold: '#FFD700', // Oro lucido leggero - hover/accenti
          hover: '#f4d03f',
        },
      },
      fontFamily: {
        'serif': ['Inter', 'serif'], // Font Inter per titoli
        'sans': ['Inter', 'sans-serif'], // Font Inter per il corpo del testo
        'display': ['Inter', 'serif'], // Font Inter per elementi speciali
      },
      boxShadow: {
        // Ombre oro e marrone per estetica raffinata
        'gold-sm': '2px 2px 6px rgba(139, 94, 60, 0.15), 0 1px 3px rgba(212, 175, 55, 0.1)',
        'gold': '4px 4px 12px rgba(139, 94, 60, 0.2), 0 2px 6px rgba(212, 175, 55, 0.15)',
        'gold-lg': '8px 8px 24px rgba(139, 94, 60, 0.25), 0 4px 12px rgba(212, 175, 55, 0.2)',
        'gold-glow': '0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(212, 175, 55, 0.2)',
        'brown-soft': '0 4px 16px rgba(59, 47, 47, 0.15), 0 2px 8px rgba(43, 29, 26, 0.1)',
        'brown-dark': '0 8px 32px rgba(59, 47, 47, 0.3), 0 4px 16px rgba(43, 29, 26, 0.2)',
        'inset-warm': 'inset 2px 2px 4px rgba(139, 94, 60, 0.1), inset -1px -1px 2px rgba(245, 240, 235, 0.8)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'parallax': 'parallax 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        parallax: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}