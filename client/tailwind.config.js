/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // High-authority typography setup
        sans: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        // Specialized radii for the "Elite" aesthetic
        'xl-card': '2.5rem',
        '2xl-card': '3.5rem',
      },
      boxShadow: {
        // Premium shadows for depth and authority
        'premium': '0 20px 50px -12px rgba(0, 0, 0, 0.08)',
        'elevated': '0 40px 80px -15px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        '400': '400ms',
      }
    },
  },
  plugins: [],
}