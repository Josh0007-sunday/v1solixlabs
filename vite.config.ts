import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (development/production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      // Define process.env globally to include environment variables
      'process.env': {
        SOME_KEY: JSON.stringify(env.SOME_KEY),
        // You can add more environment variables if needed
        NODE_ENV: JSON.stringify(env.NODE_ENV),
      }
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
      chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit to 1000 KB
    },
    optimizeDeps: {
      include: ['@solana/spl-token', 'crypto-js', '@walletconnect/qrcode-modal'],
      esbuildOptions: {
        // Add any necessary polyfills
        define: {
          global: 'globalThis',
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
  };
});
