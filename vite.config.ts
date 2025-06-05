import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Set base URL for GitHub Pages deployment
  base: process.env.NODE_ENV === 'production' ? '/llm-ts-worker/' : '/',
  plugins: [tailwindcss()],
  optimizeDeps: {
    exclude: ['@huggingface/transformers']
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  worker: {
    format: 'es'
  },
  build: {
    // Ensure proper asset handling for GitHub Pages
    rollupOptions: {
      output: {
        manualChunks: {
          'transformers': ['@huggingface/transformers']
        }
      }
    }
  }
})
