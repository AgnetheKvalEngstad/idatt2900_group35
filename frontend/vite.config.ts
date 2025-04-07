import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: [
        'src/**',
      ],
      exclude: [
        'src/__tests__/**',
        'src/utils/**',
        'src/theme/**',
        '**/index.tsx',
        '**/index.ts',
        '**/vite-env.d.ts',
      ],
    },
  },
})
