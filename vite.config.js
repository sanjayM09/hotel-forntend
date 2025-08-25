import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from 'vite-jsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      plugins: [],
    },
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
})
