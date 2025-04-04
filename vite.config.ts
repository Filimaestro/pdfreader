import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pdfreader/',
  optimizeDeps: {
    include: ['react', 'react-dom', 'pdfjs-dist']
  },
  build: {
    commonjsOptions: {
      include: [/react/, /react-dom/, /pdfjs-dist/],
      transformMixedEsModules: true
    }
  },
  resolve: {
    alias: {
      'pdfjs-dist': 'pdfjs-dist/build/pdf'
    }
  }
}) 