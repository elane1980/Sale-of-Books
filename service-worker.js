self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('book-sales-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/src/main.jsx',
        '/src/App.jsx'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
