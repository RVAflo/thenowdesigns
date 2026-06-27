import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App'
import './styles/app.css'

// Static-prerendered entry. vite-react-ssg renders each route to real HTML at
// build time, then hydrates on the client. All 3D is lazy-loaded inside pages.
export const createRoot = ViteReactSSG({ routes })
