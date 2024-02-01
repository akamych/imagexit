import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: './index.html', // entry HTML file
        'service-worker': './src/sw.js', // the path to service worker file
      },
      output: {
        entryFileNames: assetInfo => {
          return assetInfo.name === 'service-worker'
            ? '[name].js' // put service worker in root
            : 'assets/js/[name]-[hash].js' // others in `assets/js/`
        },
      },
    },
  },
})
