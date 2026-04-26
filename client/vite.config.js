import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Port configuration for the frontend
    port: 5173,
    // Optional: Proxy configuration if you want to route API calls 
    // from /api to your backend at http://localhost:5000
    /*
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
    */
  },
})