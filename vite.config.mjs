import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,js}', // Handle both .jsx and .js files with JSX
    })
  ],
  base: './', // Use relative paths
  build: {
    outDir: 'dist',
    emptyOutDir: true, // Clean the output directory before building
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  server: {
    port: 3000
  },
  publicDir: 'public', // Copy public files (CNAME, etc.) to dist/
  // Copy strategy: static assets are in static/, public files in public/
  esbuild: {
    loader: 'jsx',
    include: /client\/js\/.*\.js$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  }
})
