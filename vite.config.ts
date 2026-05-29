import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base must match the GitHub repo name for project pages
// e.g. https://thypirate.github.io/recycling-globe/ → base: '/recycling-globe/'
// If you ever use a custom domain (CNAME), change base back to '/'
export default defineConfig({
  plugins: [react()],
  base: '/recycling-globe/',
})
