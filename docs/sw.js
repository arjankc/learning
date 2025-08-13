// Simple service worker for offline support
const CACHE_NAME = 'csharp-gamified-v6';
const OFFLINE_URLS = [
  'index.html',
  'levels.html',
  'leaderboard.html',
  'achievements.html',
  'assets/css/styles.css',
  'assets/css/prism.css',
  'assets/js/app.js',
  'assets/js/storage.js',
  'assets/js/levels.js',
  'assets/js/achievements.js',
  'assets/js/prism.js',
  'data/levels.json',
  'data/achievements.json',
  'manifest.webmanifest',
  '.nojekyll'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      }).catch(() => caches.match('index.html'));
    })
  );
});
