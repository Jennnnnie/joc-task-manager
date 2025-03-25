import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        cream: '#E9EDC9',
        coral: '#E66B5B',
        navy: '#3E4C59',
        sagegreen: '#7F9A8A',
        yellow: '#F2CC8F',
        lightyellow: '#F3FFB6',
        graypurple: '#A69CAC',
        mint: '#A2E3C4',
        lilac: '#C8A2C8',
        bluebell: '#9999CC',
      },
    },
  },
  plugins: [],
} satisfies Config;
