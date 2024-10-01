import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Check if `process` is undefined in the browser and mock it
if (typeof global !== 'undefined' && !global.process) {
  global.process = {
    env: {
      NODE_ENV: 'development', // Set a default value, can be 'production' when building
    },
  } as any;
}

// Vite configuration
export default defineConfig({
  define: {
    // Mock `process.env` to avoid errors from libraries expecting it
    'process.env': {
      NODE_ENV: JSON.stringify('development'), // You can change to 'production' for builds
    },
  },
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'crypto-js': ['crypto-js'],
          'solana-spl': ['@solana/spl-token'],
          'walletconnect': ['@walletconnect/qrcode-modal'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size limit to 1000 KB
  },
  optimizeDeps: {
    include: ['@solana/spl-token', 'crypto-js', '@walletconnect/qrcode-modal'],
    esbuildOptions: {
      define: {
        global: 'globalThis', // Polyfill `globalThis` for compatibility
      },
    },
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      buffer: 'buffer',
      crypto: 'crypto.js',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.flexlend.fi',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
