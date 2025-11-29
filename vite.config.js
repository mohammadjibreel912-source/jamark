// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ REMEMBER: The key below (AIzaSyAolLS-_Gips2tM4D6ymQo3oPBy2oosxU4) is a generic example.
// Replace it with your actual, valid Google Maps API Key.

export default defineConfig({
  plugins: [react()],
  
  // 🔑 DEFINING ENVIRONMENT VARIABLES FOR THE BROWSER
  define: {
    // Vite recommends defining variables prefixed with 'VITE_' for use in the browser.
    // The key here is the name you use in your application's source code (e.g., process.env.VITE_...).
    // Note: If you were using `process.env.REACT_APP_GOOGLE_MAPS_API_KEY` in your React code, 
    // you should define `process.env.REACT_APP_GOOGLE_MAPS_API_KEY` here for compatibility.
    // Assuming your React code expects process.env.REACT_APP_GOOGLE_MAPS_API_KEY or similar:

    'process.env.REACT_APP_GOOGLE_MAPS_API_KEY': JSON.stringify("AIzaSyAolLS-_Gips2tM4D6ymQo3oPBy2oosxU4"), 
  },

  server: {
    proxy: {
      // 🚀 CORS PROXY SETUP for http://165.227.20.222/api/...
      '/api': {
        target: 'http://165.227.20.222',
        // 'changeOrigin: true' is essential for bypassing CORS, 
        // as it rewrites the 'Host' header of the request to match the target URL.
        changeOrigin: true, 
        // Optional but often useful: ensure the path rewrite is explicitly defined.
        // It tells the proxy: when a request comes in for /api/Upload, forward it to http://165.227.20.222/api/Upload
        rewrite: (path) => path,
      }
    }
  }
})