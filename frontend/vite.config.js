import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    https: false, // Set true if using HTTPS locally
    proxy: {
      // Forward API requests to backend
      '/api': {
        target: process.env.VITE_BACKEND_URL, // e.g. https://finai-backend.onrender.com
        changeOrigin: true,
        secure: true, // true if backend uses https
      },
    },
  },
});
