import type { Config } from 'tailwindcss';

// const px0_50 = Object.fromEntries(Array.from({ length: 51 }, (_, i) => [i, `${i}px`]));
const px0_100 = Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i}px`]));
const px0_400 = Object.fromEntries(Array.from({ length: 401 }, (_, i) => [i, `${i}px`]));
const px0_1000 = Object.fromEntries(Array.from({ length: 1001 }, (_, i) => [i, `${i}px`]));

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: px0_100,
      spacing: px0_400,
      borderWidth: px0_100,
      minWidth: px0_400,
      minHeight: px0_400,
      width: px0_1000,
      height: px0_1000,
      colors: {
        orange: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FB8C00',
          600: '#F57C00',
          700: '#EF6C00',
          800: '#E65100',
          900: '#BF360C',
        },
        beige: {
          50: '#FFFFFF',
          100: '#FFF9F5',
          200: '#FFF3E0',
          300: '#FFEBD1',
          400: '#FFE2C0',
          500: '#FFD9AF',
          600: '#FFD09D',
          700: '#FFC18B',
          800: '#FFB17A',
          900: '#FFA063',
        },
        mint: {
          50: '#F0FCFC',
          100: '#E0F7FA',
          200: '#C3EEF4',
          300: '#A7E4ED',
          400: '#8CD9E5',
          500: '#71CEDD',
          600: '#57C3D4',
          700: '#45B8CA',
          800: '#34ADC0',
          900: '#239BAE',
        },
        navy: '#04394A',
      },
      fontFamily: {
        sans: ['WAGURITTF', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
