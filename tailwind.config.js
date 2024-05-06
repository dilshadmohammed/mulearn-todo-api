/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
   "./index.html",
   "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    colors: {
      // Light mode colors
      'bright-blue': '#2D9CDB',
      'main-bg': '#FAFAFA',
      'primary-txt': '#3E4A52',
      'btn-txt': '#6D7880',
      'custom-border-color': '#D4D4D4',
      'hover-color': '#3E4A52',
      
      // Dark mode colors
      'dark-main-bg': '#1c1e26', 
      'dark-primary-txt': '#d2d2d2', 
      'dark-btn-txt': '#878787', 
      'custom-border-color-dark': '#363A42',
      'dark-hover-color': '#f1f1f1'
    }
  },
  plugins: [],
}

