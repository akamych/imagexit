import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { join } from 'node:path'
import { buildSync } from 'esbuild'

// https://vitejs.dev/config/
export default defineConfig({
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
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  build: {
    chunkSizeWarningLimit: 100,
    outDir: 'ssr-dist',
    ssr: true,
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      },
    },
  },
  ssr: {
    format: 'cjs',
  },
})
