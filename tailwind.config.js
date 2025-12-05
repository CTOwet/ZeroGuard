/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00ff9d',
        'neon-pink': '#ff006e',
        'dark-navy': '#1a1a2e',
        'cyber-purple': '#8b5cf6',
        'cyber-blue': '#3b82f6',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(135deg, #00ff9d 0%, #00b8ff 100%)',
        'gradient-cyber': 'linear-gradient(135deg, #ff006e 0%, #8b5cf6 50%, #00ff9d 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 255, 157, 0.5), 0 0 40px rgba(0, 255, 157, 0.3)',
        'neon-pink': '0 0 20px rgba(255, 0, 110, 0.5), 0 0 40px rgba(255, 0, 110, 0.3)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
      },
      keyframes: {
        glow: {
          'from': {
            boxShadow: '0 0 20px rgba(0, 255, 157, 0.5), 0 0 40px rgba(0, 255, 157, 0.3)',
          },
          'to': {
            boxShadow: '0 0 30px rgba(0, 255, 157, 0.8), 0 0 60px rgba(0, 255, 157, 0.5)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
