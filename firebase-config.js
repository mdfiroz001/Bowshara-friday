// Firebase কনফিগারেশন অবজেক্ট
const firebaseConfig = {
  apiKey: "AIzaSyAbmM8E9pFhSjZFJfOad1-bf9O79ne0dRI",
  authDomain: "bengalistoryapp.firebaseapp.com",
  databaseURL: "https://bengalistoryapp-default-rtdb.firebaseio.com",
  projectId: "bengalistoryapp",
  storageBucket: "bengalistoryapp.firebasestorage.app",
  messagingSenderId: "807551522355",
  appId: "1:807551522355:web:162d688673b7556fe1b546",
};

// ফায়ারবেস ইনিশিয়ালাইজেশন চেক
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();
