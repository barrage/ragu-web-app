import path from 'node:path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app'),
    },
  },
})
