/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme colors
        'primary': {
          light: '#0066cc',
          DEFAULT: '#0066cc',
          dark: '#004999',
          hover: '#0052a3',
        },
        'secondary': {
          light: '#64748b',
          DEFAULT: '#64748b',
          dark: '#475569',
          hover: '#526179',
        },
        'accent': {
          light: '#3b82f6',
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
          hover: '#1d4ed8',
        },
        'background': {
          light: '#ffffff',
          DEFAULT: '#ffffff',
          dark: '#1a1a1a',
          alt: '#f8fafc',
        },
        'surface': {
          light: '#f1f5f9',
          DEFAULT: '#f1f5f9',
          dark: '#334155',
        },
        'text': {
          light: '#333333',
          DEFAULT: '#333333',
          dark: '#ffffff',
          muted: '#64748b',
        },
        'error': {
          light: '#ef4444',
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
        'success': {
          light: '#22c55e',
          DEFAULT: '#22c55e',
          dark: '#16a34a',
        },
        'warning': {
          light: '#f59e0b',
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
      },
      fontSize: {
        'display-1': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-2': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.005em' }],
        'heading-3': ['1.75rem', { lineHeight: '1.4' }],
        'heading-4': ['1.5rem', { lineHeight: '1.4' }],
        'body-large': ['1.125rem', { lineHeight: '1.5' }],
        'body': ['1rem', { lineHeight: '1.5' }],
        'body-small': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'layout-sm': '0.5rem',
        'layout-base': '1rem',
        'layout-lg': '1.5rem',
        'layout-xl': '2rem',
        'layout-2xl': '3rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'lg': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'xl': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}
