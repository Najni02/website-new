// 🔹 Importiere Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
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
// ersetze veraltete namespaced API durch modulare Firestore-Nutzung

function register() {
  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log("Konto erstellt für:", user.email);
      alert(`Konto erfolgreich erstellt für ${user.email}.`);
      location.href = "login.html";
    })
    .catch(error => {
      showError(error.message);
})};

const createBtn = document.getElementById("login-button");
createBtn.addEventListener('click', register);

function showError(message) {
  const error_p = document.getElementById("error");
  
  switch (message) {
    case "Firebase: Error (auth/invalid-email).":
      message = "Invalid Username.";
      break;
    case "Firebase: Error (auth/missing-password).":
      message = "Password is missing.";
      break;
    case "Firebase: Error (auth/email-already-in-use).":
      message = "Email already in use.";
      break;
    case "Firebase: Password should be at least 6 characters (auth/weak-password).":
      message = "Password should be at least 6 characters.";
      break;

  };
  error_p.textContent = message;
};