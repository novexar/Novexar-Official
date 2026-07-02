/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', '"Noto Sans JP"', 'sans-serif'],
      display: ['Archivo', '"Noto Sans JP"', 'sans-serif'],
      serif: ['"Instrument Serif"', 'serif'],
      mono: ['"JetBrains Mono"', 'monospace'],
    },
    extend: {
      colors: {
        // 注意: "base" は text-base(font-size) と衝突するため使わないこと
        night: '#0B0B0C',
        ink: '#ECEAE6',
        mute: '#8F8C86',
        line: 'rgba(236,234,230,0.14)',
        accent: '#59B7FF',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
