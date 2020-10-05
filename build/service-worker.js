importScripts("/precache-manifest.3c219dba41c7133b718cd8b159e17d5a.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// App Shell
workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/index.html')
);

workbox.googleAnalytics.initialize();

workbox.routing.registerRoute(
  /^https?:\/\/www.themealdb.com\/api\/.*/,
  new workbox.strategies.StaleWhileRevalidate(),
  'GET'
);

workbox.routing.registerRoute(
  /^https?:\/\/www.themealdb.com\/images\/.*/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
        maxEntries: 20,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-font-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  }),
  'GET'
);

workbox.routing.registerRoute(
  new RegExp(/^https?.*/),
  new workbox.strategies.NetworkFirst(),
  'GET'
);

