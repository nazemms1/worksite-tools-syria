import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/worksite-tools-syria/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
