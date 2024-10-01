import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Polyfill for process in browser environments
if (typeof global !== 'undefined' && !global.process) {
  global.process = {
    env: {
      NODE_ENV: 'development', // Default environment
    },
  } as any; // TypeScript workaround for custom process object
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (development/production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      // Inject environment variables into process.env
      'process.env': {
        SOME_KEY: JSON.stringify(env.SOME_KEY),
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
        // Polyfill globalThis
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
