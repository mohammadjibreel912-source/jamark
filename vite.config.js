// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://165.227.20.222',
        // ✅ إضافة changeOrigin لضمان تجاوز CORS
        changeOrigin: true, 
      }
    }
  }
})