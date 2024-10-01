import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
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
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['@solana/spl-token', 'crypto-js', '@walletconnect/qrcode-modal'],
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
      define: {
        global: 'globalThis',
        process: JSON.stringify({
          env: {}, // Polyfill `process.env` with empty object or your env variables
        }),
      },
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
  resolve: {
    alias: {
      stream: 'stream-browserify',
      buffer: 'buffer',
      crypto: 'crypto.js',
    },
  },
});
