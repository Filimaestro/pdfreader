import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pdfreader/',
  optimizeDeps: {
    include: ['pdfjs-dist/build/pdf.worker.entry', 'react', 'react-dom']
  },
  build: {
    commonjsOptions: {
      include: [/pdfjs-dist/, /react/, /react-dom/]
    }
  }
}) 