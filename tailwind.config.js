/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: [
        '"Geist Variable"',
        '"Noto Sans JP Variable"',
        'system-ui',
        'sans-serif',
      ],
      mono: ['"Geist Mono Variable"', 'ui-monospace', 'monospace'],
    },
    extend: {
      // 色は src/index.css の CSS 変数で定義（テーマ追加時はそちらを差し替える）
      // 注意: "base" は text-base(font-size) と衝突するため使わないこと
      colors: {
        night: token('night'),
        surface: token('surface'),
        raised: token('raised'),
        ink: token('ink'),
        mute: token('mute'),
        accent: token('accent'),
        line: 'rgb(var(--ink) / 0.1)',
      },
      maxWidth: {
        page: '80rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
