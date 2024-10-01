import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

if (typeof global !== 'undefined' && !global.process) {
  global.process = {
    env: {
      NODE_ENV: 'development',
    },
  } as any;
}


if (typeof global !== 'undefined' && !global.process) {
  global.process = {
    env: {
      NODE_ENV: 'development',
    },
    browser: true,
  } as any; 
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
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
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      include: ['@solana/spl-token', 'crypto-js', '@walletconnect/qrcode-modal'],
      esbuildOptions: {
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