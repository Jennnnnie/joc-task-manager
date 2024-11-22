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
        cream: '#F9F8F4',
        coral: '#E66B5B',
        navy: '#3E4C59',
        green: '#7F9A8A',
        yellow: '#F4D06F',
      },
    },
  },
  plugins: [],
} satisfies Config;
