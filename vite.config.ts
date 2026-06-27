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
    // MUST be 'defer' (not 'async'): the entry module reads the inline
    // window.__VITE_REACT_SSG_HASH__ set at end of <body>. 'async' races it,
    // yielding a manifest-undefined.json fetch -> HTML -> router crash -> #418.
    script: 'defer',
    // NOTE: do NOT set formatting:'minify' — collapsing whitespace in the
    // prerendered HTML breaks React hydration (text-node mismatch -> #418).
    dirStyle: 'nested',
  },
})
