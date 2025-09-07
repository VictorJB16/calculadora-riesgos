import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Configuración mínima para evitar problemas de memoria
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined, // Simplificar chunking
      }
    },
  },
})
