import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Disable source maps in production
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
      // Define globalThis and Buffer to avoid reference errors
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.flexlend.fi', // Proxy API calls to Flexlend API
        changeOrigin: true, // Change the origin of the request to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite /api to empty
      },
    },
  },
  resolve: {
    alias: {
      stream: 'stream-browserify', // Polyfill stream for browser
      buffer: 'buffer', // Polyfill buffer
      crypto: 'crypto.js', // Ensure crypto is mapped to crypto.js in browser
    },
  },
});
