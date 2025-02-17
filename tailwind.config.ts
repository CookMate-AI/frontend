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
        yellow: {
          50: '#FEF3C7',
          100: '#FDE047',
          200: '#FFD700',
          300: '#FACC15',
          400: '#EAB308',
        },
        amber: {
          300: '#FCD34D',
          400: '#FBBF24',
        },
        navy: '#04394A',
        error: '#FFF1F2',
      },
      fontFamily: {
        sans: ['NPSfont', 'MoveSans', 'sans-serif'],
      },
      borderRadius: px0_100,
      boxShadow: {
        sm: '0px 8px 13px 0px rgba(25, 31, 40, 0.04)',
        md: '3px 6px 28px 0px rgba(25, 31, 40, 0.08)',
        lg: '0px 16px 34px 0px rgba(25, 31, 40, 0.16)',
      },
      animation: {
        bounce: 'bounce 1s infinite',
        press: 'press 0.2s ease-in-out',
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        press: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
} satisfies Config;
