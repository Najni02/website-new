// 🔹 Importiere Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  setPersistence, 
  browserLocalPersistence,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

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
// ersetze veraltete namespaced API durch modulare Firestore-Nutzung
const db = getFirestore(app);

// 🧷 Persistenz einstellen (angemeldet bleiben)
setPersistence(auth, browserLocalPersistence);

// 🔐 Login-Button
const loginBtn = document.getElementById("login-button");
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log("Angemeldet als:", user.email);
      alert(`Willkommen ${user.email}`);
      location.href = "index.html";
    })
    .catch(error => {
      alert("Fehler: " + error.message);
    });
});

// 🚪 Logout-Button
// const logoutBtn = document.getElementById("logoutBtn");
// logoutBtn.addEventListener("click", () => {
//   signOut(auth).then(() => {
//     alert("Abgemeldet!");
//   });
// });

// 🔄 Auth-Status überwachen
const authLink = document.getElementById('auth-link');
onAuthStateChanged(auth, user => {
    if (user) {
      // angemeldet: Link zu Account, optional Anzeige von Name/Avatar
      console.log("✅ Angemeldet:", user.email);
      authLink.textContent = 'Logout';
      // authLink.href = '/account';
      // authLink.insertAdjacentHTML('afterend', '<button id="signout-btn">Abmelden</button>');
      document.getElementById('auth-link')?.addEventListener('click', () => signOut(auth));
    } else {
      // nicht angemeldet: Login
      console.log("🚫 Kein Benutzer angemeldet");
      authLink.textContent = 'Login';
      // authLink.href = '/login';
      // entferne ggf. Signout-Button/Avatar
    }
  });

// optionales UI-Element für Fehlermeldungen (kein Fehler, wenn nicht vorhanden)
const errorMessageEl = document.getElementById('error-message') || { textContent: '' };

(async () => {
  try {
    if (!auth.currentUser) {
      errorMessageEl.textContent = 'Bitte zuerst anmelden.';
      return;
    }
    const docRef = doc(db, 'secure_links', 'auth-req_links');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const redirectUrl = snap.data().test;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        errorMessageEl.textContent = 'Weiterleitungs-URL im Dokument nicht gefunden.';
      }
    } else {
      errorMessageEl.textContent = 'Dokument "auth-req_links" nicht gefunden.';
    }
  } catch (error) {
    console.error("Fehler beim Abrufen des Links:", error);
    errorMessageEl.textContent = "Fehler beim Abrufen des Links.";
  }
})();
