
const CACHE_NAME = 'sport-talent-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Note: CDN assets (Tailwind) are typically cached by the browser or CDN's policies.
  // If you host your own assets (JS, CSS, images), list them here.
  // '/static/js/bundle.js', // Example if you had local build
  // '/static/css/main.css', // Example
  // '/manifest.json', // Already requested by browser
  // Add placeholder images if they are static and critical for offline app shell
  // Match manifest.json icon URLs
  'https://picsum.photos/seed/pwa192teal/192/192',
  'https://picsum.photos/seed/pwa512teal/512/512'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache.map(url => new Request(url, {cache: 'reload'}))); // Force reload for development
      })
      .catch(err => {
        console.error('Failed to open cache or add URLs:', err);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          networkResponse => {
            // Check if we received a valid response
            if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && !networkResponse.type.includes('cors')) {
              if (event.request.url.startsWith('https://cdn.tailwindcss.com')) {
                // Don't cache tailwind cdn errors to avoid breaking app if cdn is temporarily down on first load
                 return networkResponse;
              }
              // Don't cache other opaque responses or errors unless specifically needed
              // return networkResponse;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            if (event.request.method === 'GET') { // Only cache GET requests
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  });
            }
            return networkResponse;
          }
        ).catch(error => {
          console.error('Fetching failed:', error);
          // Potentially return a fallback page for navigation requests if offline
          // if (event.request.mode === 'navigate') {
          //   return caches.match('/offline.html');
          // }
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
});
