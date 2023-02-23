import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://127.0.0.1:8085",
      "/r": {
        target: "http://127.0.0.1:8085",
        ws: true,
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [react()],
})
