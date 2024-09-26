/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        lightTheme: {
          "primary": "#3b82f6",
          "primary-content": "#ffffff",
          "secondary": "#6366f1",
          "secondary-content": "#ffffff",
          "accent": "#f43f5e",
          "info": "#38bdf8",
          "success": "#22c55e",
          "success-content": "#fff",
          "warning": "#ffc01f",
          "error": "#ef4444",
          "neutral": "#2b3440",
          "neutral-content": "#d7dde4",
          "base-100": "#ffffff",
          "base-200": "#f0f2f5",
          "base-300": "#dfe3e9",
          'base-content': 'black',
        },
        darkTheme: {
          "primary": "#3b82f6",
          "primary-focus": "#2779bd",
          "primary-content": "#ffffff",
          "secondary": "#6366f1",
          "secondary-content": "#ffffff",
          "secondary-focus": "#f9d002",
          "accent": "#38c172",
          "accent-focus": "#2d995b",
          "accent-content": "#ffffff",
          "neutral": "#2a323c",
          "neutral-content": "#a6adbb",
          "base-100": "#1d1e1f",
          "base-200": "#121212",
          "base-300": "#101010",
          'base-content': '#eceef2',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}