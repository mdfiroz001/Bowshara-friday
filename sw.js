const CACHE_NAME = "bcf-app-cache-v3";
const urlsToCache = [
  "./",
  "./index.html",
  "./admin.html",
  "./firebase-config.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// সার্ভিস ওয়ার্কার ইনস্টল ও ক্যাশ সেভ
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    }).catch(err => console.log("Cache error:", err))
  );
});

// নতুন ক্যাশ চালু ও পুরনো ক্যাশ মুছে ফেলা
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// ফেচ ইন্টারসেপ্ট ও অফলাইন ব্যাকআপ
self.addEventListener("fetch", event => {
  // Firebase Realtime DB বা API রিকোয়েস্ট ক্যাশ করা এড়িয়ে চলা
  if (event.request.url.includes("firebaseio.com") || 
      event.request.url.includes("googleapis.com") ||
      event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // ক্যাশে থাকলে ক্যাশ থেকে ফেরত দেবে
      }
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
    }).catch(() => {
      // নেটওয়ার্ক ফেইল করলে হোম পেজ ক্যাশ দেখাবে
      return caches.match("./index.html");
    })
  );
});
