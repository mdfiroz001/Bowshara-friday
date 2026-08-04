/* ==========================================================
   firebase-config.js
   ==========================================================
   এখানে আপনার Firebase প্রজেক্টের কনফিগারেশন বসান।
   Firebase Console → Project Settings → General → Your apps → SDK setup
   থেকে এই মানগুলো কপি করুন।

   গুরুত্বপূর্ণ:
   - Firestore নয়, শুধুমাত্র Realtime Database ব্যবহার করা হয়েছে।
   - databaseURL অবশ্যই সঠিকভাবে দিতে হবে, নাহলে চ্যাট/অ্যাডমিন কাজ করবে না।
   ========================================================== */

const firebaseConfig = {
   apiKey: "AIzaSyAbmM8E9pFhSjZFJfOad1-bf9O79ne0dRI",
  authDomain: "bengalistoryapp.firebaseapp.com",
  databaseURL: "https://bengalistoryapp-default-rtdb.firebaseio.com",
  projectId: "bengalistoryapp",
  storageBucket: "bengalistoryapp.firebasestorage.app",
  messagingSenderId: "807551522355",
  appId: "1:807551522355:web:162d688673b7556fe1b546",
};

// একবারই ইনিশিয়ালাইজ করা হয় — index.html ও admin.html দুটোতেই ব্যবহারযোগ্য
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
