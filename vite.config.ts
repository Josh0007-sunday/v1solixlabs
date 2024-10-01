import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  base: '/',
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
    chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit to 1000 KB
  },
  optimizeDeps: {
    include: ['@solana/spl-token', 'crypto-js', '@walletconnect/qrcode-modal'],
    esbuildOptions: {
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
      // Define globalThis and Buffer
      define: {
        global: 'globalThis',
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
