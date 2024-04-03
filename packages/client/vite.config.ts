import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { join } from 'node:path'
import { buildSync } from 'esbuild'
dotenv.config({ path: '../../.env' })

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 100,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      },
    },
  },
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
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
