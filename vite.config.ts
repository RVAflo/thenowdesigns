import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// The Now Designs — Vite + React + vite-react-ssg (static prerender).
// Output is plain static HTML/JS, deployed to GitHub Pages at the site root.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2020',
    // Keep three.js in its own chunk so it stays out of the critical path.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (/three|@react-three|postprocessing/.test(id)) return 'three'
            if (/react-router|react-dom|\/react\//.test(id)) return 'react'
          }
        },
      },
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    dirStyle: 'nested',
    // crittersOptions: inline critical CSS is on by default; our global stylesheet
    // is a static /styles.css link, so it is left as-is (fast, cached, shared).
  },
})
