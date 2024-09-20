import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/fridge-game/',
  plugins: [vue()],
  resolve: {
    alias: {
      _src: fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
