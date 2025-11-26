import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 4096,
    sourcemap: false,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        globIgnores: ['**/assets/index-*.js', '**/assets/*.js.map']
      },
      manifest: {
        name: 'HealthDash - Health Analytics Dashboard',
        short_name: 'HealthDash',
        description: 'Interactive frontend health analytics dashboard',
        theme_color: '#7C3AED',
        background_color: '#0F1724',
        display: 'standalone',
        icon: 'public/favicon.ico',
        start_url: '/',
      }
    })
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  }
})