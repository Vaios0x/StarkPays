import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Neural Network Color Palette
        neural: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Glassmorphism colors
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          'white-20': 'rgba(255, 255, 255, 0.2)',
          'white-30': 'rgba(255, 255, 255, 0.3)',
          black: 'rgba(0, 0, 0, 0.1)',
          'black-20': 'rgba(0, 0, 0, 0.2)',
          'black-30': 'rgba(0, 0, 0, 0.3)',
        },
        // Neural network gradients
        neuralGradient: {
          from: '#0ea5e9',
          via: '#3b82f6',
          to: '#8b5cf6',
        },
        // Dark mode neural colors
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      backgroundImage: {
        'neural-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #8b5cf6 100%)',
        'neural-radial': 'radial-gradient(circle at center, #0ea5e9 0%, #3b82f6 50%, #8b5cf6 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'neural-mesh': 'radial-gradient(circle at 20% 50%, #0ea5e9 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 40% 80%, #8b5cf6 0%, transparent 50%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'neural-pulse': 'neural-pulse 4s ease-in-out infinite',
        'neural-float': 'neural-float 6s ease-in-out infinite',
        'neural-glow': 'neural-glow 3s ease-in-out infinite',
        'neural-mesh': 'neural-mesh 8s ease-in-out infinite',
        'glass-shimmer': 'glass-shimmer 2s ease-in-out infinite',
        'neural-connect': 'neural-connect 10s linear infinite',
      },
      keyframes: {
        'neural-pulse': {
          '0%, 100%': { 
            opacity: '0.3',
            transform: 'scale(1)',
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        'neural-float': {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px)',
          },
          '25%': { 
            transform: 'translateY(-20px) translateX(10px)',
          },
          '50%': { 
            transform: 'translateY(-10px) translateX(-5px)',
          },
          '75%': { 
            transform: 'translateY(-30px) translateX(15px)',
          },
        },
        'neural-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(14, 165, 233, 0.3), 0 0 40px rgba(59, 130, 246, 0.2)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(14, 165, 233, 0.6), 0 0 80px rgba(59, 130, 246, 0.4)',
          },
        },
        'neural-mesh': {
          '0%, 100%': { 
            backgroundPosition: '0% 50%',
          },
          '50%': { 
            backgroundPosition: '100% 50%',
          },
        },
        'glass-shimmer': {
          '0%': { 
            backgroundPosition: '-200% 0',
          },
          '100%': { 
            backgroundPosition: '200% 0',
          },
        },
        'neural-connect': {
          '0%': { 
            transform: 'translateX(-100%)',
          },
          '100%': { 
            transform: 'translateX(100%)',
          },
        },
      },
      fontFamily: {
        'neural': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'neural': '0 0 20px rgba(14, 165, 233, 0.3), 0 0 40px rgba(59, 130, 246, 0.2)',
        'neural-lg': '0 0 40px rgba(14, 165, 233, 0.4), 0 0 80px rgba(59, 130, 246, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-lg': '0 16px 64px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
