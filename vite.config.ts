import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'sonner'],
          // Page chunks
          'pages-main': [
            './src/pages/DashboardPage.tsx',
            './src/pages/EquipmentPage.tsx',
            './src/pages/QRScannerPage.tsx',
          ],
          'pages-management': [
            './src/pages/MaintenancePage.tsx',
            './src/pages/CertificationsPage.tsx',
            './src/pages/MovementsPage.tsx',
          ],
          'pages-admin': [
            './src/pages/UsersPage.tsx',
            './src/pages/AreasPage.tsx',
            './src/pages/LocationsPage.tsx',
            './src/pages/ReportsPage.tsx',
            './src/pages/AuditPage.tsx',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase limit to 1000 kB
  },
})
