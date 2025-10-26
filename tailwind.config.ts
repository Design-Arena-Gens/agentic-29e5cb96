import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef5ff',
          100: '#d7e7ff',
          200: '#b2d1ff',
          300: '#84b3ff',
          400: '#5691ff',
          500: '#2f6dff',
          600: '#1f51e6',
          700: '#193fc0',
          800: '#19379a',
          900: '#172f7a'
        },
        severity: {
          critical: '#b91c1c',
          high: '#ef4444',
          medium: '#f59e0b',
          low: '#16a34a',
          info: '#0ea5e9'
        }
      },
      boxShadow: {
        header: '0 1px 2px rgba(0,0,0,0.05)'
      }
    },
  },
  plugins: [],
} satisfies Config
