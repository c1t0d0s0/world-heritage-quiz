import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function googleAnalyticsPlugin() {
  const configPath = path.resolve(__dirname, 'config.js');

  const getGtmId = () => {
    if (!fs.existsSync(configPath)) {
      return null;
    }
    try {
      const content = fs.readFileSync(configPath, 'utf-8');
      const match = content.match(/GTM_ID\s*=\s*['"`]([^'"`]+)['"`]/);
      return match && match[1] ? match[1].trim() : null;
    } catch (e) {
      console.warn('Failed to read config.js:', e);
      return null;
    }
  };

  return {
    name: 'google-analytics-plugin',
    buildStart() {
      if (fs.existsSync(configPath)) {
        this.addWatchFile(configPath);
      }
    },
    transformIndexHtml() {
      const gtmId = getGtmId();
      if (!gtmId) {
        return [];
      }

      if (gtmId.startsWith('GTM-')) {
        return [
          {
            tag: 'script',
            children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            injectTo: 'head-prepend'
          }
        ];
      }

      return [
        {
          tag: 'script',
          attrs: {
            async: true,
            src: `https://www.googletagmanager.com/gtag/js?id=${gtmId}`
          },
          injectTo: 'head-prepend'
        },
        {
          tag: 'script',
          children: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gtmId}');`,
          injectTo: 'head-prepend'
        }
      ];
    }
  };
}

export default defineConfig({
  base: './', // Use relative base path so static hosting works in subdirectories or GitHub Pages
  plugins: [
    googleAnalyticsPlugin()
  ],
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

