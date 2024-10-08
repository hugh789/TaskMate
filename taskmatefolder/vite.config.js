import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration with a proxy setup
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
