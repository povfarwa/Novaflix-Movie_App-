import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Correct import

// https://vite.dev/config/
export default defineConfig({
  // Ensure the plugin is in the array
  plugins: [react(), tailwindcss()], 
})