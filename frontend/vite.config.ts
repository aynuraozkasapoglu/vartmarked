import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cikti Domeneshop'un /www klasorune oldugu gibi yuklenir; kok yol '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 2048,
  },
  server: {
    port: 5173,
  },
})
