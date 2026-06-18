import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Dedicated port — avoids 5173–5180 cluster used by other Vite apps
    port: 5190,
    strictPort: false,
  },
})
