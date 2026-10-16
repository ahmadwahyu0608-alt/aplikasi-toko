const CACHE_NAME = 'toko-kasir-v1';
const ASSETS = ['./index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return; // biarkan panggilan API (POST) ke Apps Script apa adanya
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
