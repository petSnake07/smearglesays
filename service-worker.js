const CACHE_NAME = "smeargle-says-v3-network-first";

const APP_SHELL = [
  "./",
  "./index.html",
  "./login.html",
  "./create_account.html",
  "./account.html",
  "./canvas.html",
  "./pokedex.html",
  "./style.css",
  "./script.js",
  "./firebase.js",
  "./background.png",
  "./logo.png",
  "./play.png",
  "./pokedex.png",
  "./canvas-art.png",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png",
  "./manifest.webmanifest"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isCode =
    url.pathname.endsWith(".html") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname === "/";

  if (isCode) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          return cached || caches.match("./index.html");
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});
