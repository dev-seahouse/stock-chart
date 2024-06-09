/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('highcharts')) {
            return 'highcharts';
          }
          if (id.includes('luxon')) {
            return 'luxon';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/testing/setup-tests.ts'],
    coverage: {
      provider: 'v8',
      exclude: [
        ...configDefaults.exclude,
        'src/main.tsx',
        '.eslintrc.cjs',
        'postcss.config.js',
        'tailwind.config.cjs',
        '**/*.stories.{ts,tsx}',
        'public/**',
        '**/.{idea,git,cache,output,temp,storybook}/**',
      ],
    },
  },
  server: {
    host: 'localhost',
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
