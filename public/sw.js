const CACHE_NAME = 'version-2';
const URLS_TO_CACHE = ['index.html', 'offline.html'];

self.addEventListener('install', (e) => {
  console.log('install');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache: ' + cache);
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (e) => {
  console.log('fetch');
  e.respondWith(
    caches.match(e.request).then(() => {
      return fetch(e.request).catch(() => caches.match('offline.html'));
    })
  );
});

this.addEventListener('activate', (e) => {
  console.log('activate');
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
