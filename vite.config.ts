import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/refresh': {
        target: 'http://localhost:3500', // your backend URL
        changeOrigin: true,
        secure: false
      },
      '/employees': {
        target: 'http://localhost:3500',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Access-Control-Allow-Credentials', 'true')
          })
        }
      },
      '/auth': {
        target: 'http://localhost:3500',
        changeOrigin: true,
        secure: false
      }
  }}})


