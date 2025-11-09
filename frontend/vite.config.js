import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    https: false,
    // No proxy needed for production deployment
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
  define: {
    // ensure the backend URL is replaced at build time
    'process.env.VITE_BACKEND_URL': JSON.stringify(process.env.VITE_BACKEND_URL || 'https://finai-backend-l3ka.onrender.com')
  }
});
