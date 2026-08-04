/* Service Worker — বউ ছাড়া কততম শুক্রবার
   অফলাইন ক্যাশ ও দ্রুত লোডিং এর জন্য */

const CACHE_NAME = "bou-chara-friday-v1";
const CORE_ASSETS = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// ইনস্টলের সময় মূল ফাইলগুলো ক্যাশ করা হয়
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// পুরোনো ক্যাশ পরিষ্কার করা হয়
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// নেটওয়ার্ক-ফার্স্ট, ফেইলে ক্যাশ থেকে সার্ভ (Firebase রিয়েলটাইম রিকোয়েস্ট বাদে)
self.addEventListener("fetch", (event) => {
  const url = event.request.url;
  if (url.includes("firebaseio.com") || url.includes("googleapis.com") || url.includes("firebasestorage")) {
    return; // রিয়েলটাইম ডেটা ক্যাশ করা হবে না
  }
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
