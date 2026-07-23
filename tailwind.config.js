/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          500: '#0066ff',
          600: '#0052cc',
          900: '#0a192f',
        },
        dark: {
          900: '#090a0f',
          800: '#12141d',
          700: '#1a1d2b',
          600: '#25293c',
        }
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        }
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'card-sticker': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 15px rgba(0, 0, 0, 0.03)',
        'bento': '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
        'dark-glow': '0 0 40px -10px rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}
