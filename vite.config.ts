import { defineConfig, loadEnv } from 'vite'
import * as path from 'path';
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

// https://vitejs.dev/config/
export default defineConfig((config) => {

  const env = loadEnv(config.mode, process.cwd())

  return {
    plugins: [
      react(),
      crx({ manifest }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {
          target: env.VITE_APP_API_URL,
          ws: true,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '/')
        },
      }
    },
    // esbuild:{
    //   drop: ['console', 'debugger']
    // },
    envPrefix: 'VITE_'
  }
});
