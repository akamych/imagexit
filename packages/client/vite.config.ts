import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { join } from 'node:path'
import { buildSync } from 'esbuild'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [
    react(),
    {
      name: 'service-worker',
      apply: 'build',
      enforce: 'post',
      transformIndexHtml() {
        buildSync({
          minify: true,
          bundle: true,
          entryPoints: [join(process.cwd(), 'service-worker.js')],
          outfile: join(process.cwd(), 'dist', 'service-worker.js'),
        })
      },
    },
  ],
})
