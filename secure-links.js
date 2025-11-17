// Firebase-Konfiguration und Initialisierung
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const firebaseConfig = {
      apiKey: "AIzaSyDXd8SG0s6WDIvwIbm6sa2JRiHzfW4mvJM",
      authDomain: "website-najni02.firebaseapp.com",
      projectId: "website-najni02",
      storageBucket: "website-najni02.firebasestorage.app",
      messagingSenderId: "268479338537",
      appId: "1:268479338537:web:f0332cdc3b985eefc12438",
      measurementId: "G-MDXJ3CKH3L"
	// TODO: Trage hier deine Firebase-Konfigurationsdaten ein
};

const yt_popup = document.getElementById('yt-popup');
yt_popup.addEventListener('click', (e) => {
  // nur schließen, wenn das Event direkt das <dialog> getroffen hat (nicht ein Kind)
  if (e.target === yt_popup) yt_popup.close();
});
const jai_popup = document.getElementById('jai-popup');
jai_popup.addEventListener('click', (e) => {
  // nur schließen, wenn das Event direkt das <dialog> getroffen hat (nicht ein Kind)
  if (e.target === jai_popup) jai_popup.close();
});


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getLink(path, element) {

}
// Überprüfe, ob der Nutzer angemeldet ist
onAuthStateChanged(auth, async (user) => {
	if (user) {
		// Nutzer ist angemeldet

		// Minecraft
		const mcPath = await getDoc(doc(db, "links", "auth_links")).data().mc_server;
		mcValue = mcPath.xxx
		const mcElement = document.getElementById('s-link_mc');
		mcElement.textContent = mcPath;
		mcElement.classList.remove('blr-link');
	} else {
		// Nutzer ist nicht angemeldet
		console.log("Nicht bei Firebase angemeldet.");
	}
});

