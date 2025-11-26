import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000, // 5MB limit
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
  },
  build: {
    chunkSizeWarningLimit: 1000
  }
});
