import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/fridge-game/',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      _src: fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
