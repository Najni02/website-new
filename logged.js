// 🔹 Importiere Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { 
  getAuth,
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

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


// 🔄 Auth-Status überwachen
const authLink = document.getElementById('login-header');
if (!authLink) console.warn("Kein Element mit ID 'login-header' gefunden.");

// Registriere Listener (don't call the unsubscribe immediately)
onAuthStateChanged(auth, user => {

  // If the element is missing, nothing to update in the UI
  if (!authLink) return;

  if (user) {
    // angemeldet: Link zu Logout
    console.log("✅ Angemeldet:", user.email);
    authLink.textContent = 'Logout';
    // Prevent navigation and sign out when clicked
    authLink.href = '#';
    authLink.onclick = (e) => {
      e.preventDefault();
      signOut(auth)
        .then(() => {
          console.log('✔️ Abgemeldet');
          // after sign out the onAuthStateChanged callback will run again and restore the link
        })
        .catch(err => console.error('SignOut-Fehler:', err));
    };
  } else {
    // nicht angemeldet: Login
    console.log("🚫 Kein Benutzer angemeldet");
    authLink.textContent = 'Login';
    authLink.href = 'login.html';
    // remove any click handler we added earlier
    authLink.onclick = null;
  }
});
