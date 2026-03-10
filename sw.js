var CACHE_NAME = 'loremipsum-v1';
var URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/og-image.svg',
  '/vs-loremipsum-io.html',
  '/vs-lipsum-com.html',
  '/vs-loremipzum.html',
  '/lorem-ipsum-for-designers.html',
  '/lorem-ipsum-for-developers.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    })
  );
});
