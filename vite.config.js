import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Use relative base path so static hosting works in subdirectories or GitHub Pages
  build: {
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('world_heritage_sites.json')) {
            return 'world-heritage-data';
          }
        }
      }
    }
  }
});
