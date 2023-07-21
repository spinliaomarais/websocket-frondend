import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, './src/assets/index.js'), // 1️⃣
          dest: './assets', // 2️⃣
        },
        {
          src: path.resolve(__dirname, './src/assets/main.css'), // 1️⃣
          dest: './assets', // 2️⃣
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

