import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  define: {
    'process.env': {},
    'global': 'globalThis',
  },
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  build: {
    sourcemap: true, // Enable source maps for debugging
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
    include: [
      '@solana/spl-token',
      'crypto-js',
      '@walletconnect/qrcode-modal',
      'stream-browserify',
      'buffer',
      'crypto-browserify',
      'events',
    ],
    esbuildOptions: {
      target: 'esnext',
       define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      buffer: 'buffer',
      crypto: 'crypto-browserify',
      events: 'events',
      assert: 'assert',
      http: 'stream-http',
      https: 'https-browserify',
      os: 'os-browserify/browser',
      url: 'url',
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

