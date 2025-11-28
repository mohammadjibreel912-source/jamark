// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react()],
  
  // 🔑 🌟 إضافة مفتاح API هنا باستخدام خاصية 'define' 🌟
  define: {
    // يجب أن تبدأ المتغيرات بـ "VITE_" لتكون متاحة في المتصفح 
    'import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY': JSON.stringify("AIzaSyAolLS-_Gips2tM4D6ymQo3oPBy2oosxU4"), 
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://165.227.20.222',

        changeOrigin: true, 
      }
    }
  }
=======
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
>>>>>>> 0f8e5a90b69a5bfccf2b1479241a874a94e77524
})