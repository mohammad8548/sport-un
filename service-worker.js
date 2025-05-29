const CACHE_NAME = 'sport-talent-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Note: CDN assets (Tailwind) are typically cached by the browser or CDN's policies.
  // If you host your own assets (JS, CSS, images), list them here.
  // '/static/js/bundle.js', // Example if you had local build
  // '/static/css/main.css', // Example
  // '/manifest.json', // Already requested by browser
  // Add new PWA icon paths
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add all URLs, forcing reload for dev, but be careful with external URLs in production
        // as they might fail if the network is flaky during install.
        const requests = urlsToCache.map(url => {
          // For local assets, always try to fetch over network first during install
          // to ensure latest version is cached.
          if (url.startsWith('/')) {
            return new Request(url, {cache: 'reload'});
          }
          // For external assets (like picsum.photos if they were still here),
          // a simple request is usually fine, relying on HTTP cache or fetching.
          return url;
        });
        return cache.addAll(requests);
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
              // Special handling for Tailwind CDN errors, don't cache them
              if (event.request.url.startsWith('https://cdn.tailwindcss.com')) {
                 return networkResponse;
              }
              // For other opaque responses or errors, just return them without caching
              // to prevent storing bad responses.
              // Consider specific error handling or fallback for critical assets if needed.
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            if (event.request.method === 'GET' && (networkResponse.type === 'basic' || networkResponse.type.includes('cors'))) { // Only cache valid GET requests
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
          //   return caches.match('/offline.html'); // You would need an offline.html cached
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