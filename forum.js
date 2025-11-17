import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// 🔧 Firebase-Konfiguration
const firebaseConfig = {
      apiKey: "AIzaSyDXd8SG0s6WDIvwIbm6sa2JRiHzfW4mvJM",
      authDomain: "website-najni02.firebaseapp.com",
      projectId: "website-najni02",
      storageBucket: "website-najni02.firebasestorage.app",
      messagingSenderId: "268479338537",
      appId: "1:268479338537:web:f0332cdc3b985eefc12438",
      measurementId: "G-MDXJ3CKH3L"
};

// 🔥 Firebase initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const field = document.getElementById('email-field');

onAuthStateChanged(auth, (user) => {
  if (user) {
    const email = user.email;
    field.value = email;
  }
});