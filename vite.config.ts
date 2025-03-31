import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pdfreader/',
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  build: {
    commonjsOptions: {
      include: [/react/, /react-dom/]
    }
  }
}) 