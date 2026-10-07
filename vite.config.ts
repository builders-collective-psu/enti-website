import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { createFeedbackMiddleware } from './scripts/feedback-server.mjs';
import { createNewsMiddleware } from './scripts/news-feed.mjs';

export default defineConfig({
  plugins: [
    {
      name: 'historical-version-routes',
      configureServer(server) {
        server.middlewares.use(createFeedbackMiddleware());
        server.middlewares.use(createNewsMiddleware());
        server.middlewares.use((req, _res, next) => {
          const pathname = req.url?.split('?')[0] || '';
          if (/^\/eship(?:\/.*)?\/$/.test(pathname)) req.url = pathname + 'index.html';
          else if (/^\/eship$/.test(pathname)) req.url = '/eship/index.html';
          if (/^\/versions\/v1\/(?:minor\/?|experiences\/?|people\/?|events\/?|builders\/?|contact\/?|sources\/?|)$/.test(pathname)) {
            req.url = pathname.replace(/\/$/, '') + '/index.html' + (req.url?.includes('?') ? '?' + req.url.split('?')[1] : '');
          }
          // Saved React versions use SPA routes. Assets continue through unchanged.
          if (/^\/versions\/v[234](?:\/(?!assets\/|images\/)[^.]*)?$/.test(pathname)) {
            req.url = pathname.match(/^\/versions\/v[234]/)![0] + '/index.html';
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use(createFeedbackMiddleware());
        server.middlewares.use(createNewsMiddleware());
        server.middlewares.use((req, _res, next) => {
          const pathname = req.url?.split('?')[0] || '';
          if (/^\/eship(?:\/.*)?\/$/.test(pathname)) req.url = pathname + 'index.html';
          else if (/^\/eship$/.test(pathname)) req.url = '/eship/index.html';
          if (/^\/versions\/v1\/(?:minor\/?|experiences\/?|people\/?|events\/?|builders\/?|contact\/?|sources\/?|)$/.test(pathname)) {
            req.url = pathname.replace(/\/$/, '') + '/index.html' + (req.url?.includes('?') ? '?' + req.url.split('?')[1] : '');
          }
          if (/^\/versions\/v[234](?:\/(?!assets\/|images\/)[^.]*)?$/.test(pathname)) {
            req.url = pathname.match(/^\/versions\/v[234]/)![0] + '/index.html';
          }
          next();
        });
      },
    },
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: '127.0.0.1',
    fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/feedback/**', '**/reviews.jsonl'] }
  }
});
