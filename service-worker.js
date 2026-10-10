// Installable, online-only home. Navigation and cards always load from the network.
// Only legacy Cache Storage entries are removed; browser settings are untouched.
const LEGACY_PREFIX = "bennessism-home-";
self.addEventListener("install", event => event.waitUntil(self.skipWaiting()));
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(LEGACY_PREFIX)).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request, { cache: "no-store" }));
});
