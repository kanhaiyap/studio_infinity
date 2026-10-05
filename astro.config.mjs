// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are set by the GitHub Pages workflow.
// When the site moves to its own domain, set SITE_URL to it (e.g. https://www.studioinfinity.in) and BASE_PATH to "/".
const site = process.env.SITE_URL || 'https://example.com';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  // Listen on IPv4 loopback: by default the dev server can bind only to IPv6 (::1),
  // which Chrome may not reach at http://localhost:4321.
  server: { host: '127.0.0.1', port: 4321 },
  vite: {
    // PhotoSwipe is imported only when the lightbox opens; pre-bundling it stops the dev server
    // from re-optimising mid-request ("504 Outdated Optimize Dep").
    optimizeDeps: { include: ['photoswipe', 'photoswipe/lightbox'] },
  },
});
