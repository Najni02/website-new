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

const popup = document.getElementById('yt-popup');
popup.addEventListener('click', (e) => {
  // nur schließen, wenn das Event direkt das <dialog> getroffen hat (nicht ein Kind)
  if (e.target === popup) popup.close();
});


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Überprüfe, ob der Nutzer angemeldet ist
onAuthStateChanged(auth, async (user) => {
	if (user) {
		// Nutzer ist angemeldet
		try {
			// Firestore: Lade den String aus einem bestimmten Dokument/Feld
			const docRef = doc(db, "secure_links", "auth-req_links"); // Passe collectionName und documentId an
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				let value = docSnap.data().ip_address; // Passe fieldName an
                console.log("Geladener Wert:", value);
				// Entferne zwei Elemente mit class 'link-error'
				document.querySelectorAll('.link-error').forEach((el, i) => {
					if (i < 2) el.remove();
				});
				document.querySelectorAll('.tool-hint').forEach((el) => {
					el.textContent = "Direct Download";
					el.style.color = "green";
				});

				// Setze den Wert in das <p>-Element mit id 's-link_1'
				let p = document.getElementById('s-link_1');
				if (p) {
                    p.textContent = value;
                    p.classList.remove('blr-link');
                };

				const btns = document.querySelectorAll('.sec_btn');
				btns.forEach(btn => {
					btn.classList.remove('sec_btn');
					btn.textContent = "Download";
				});
				// Youtube Downloader Link
				value = docSnap.data().yt_downloader;
				p = document.getElementById('yt-btn');
				const popup_btn = document.getElementById('yt-popup-btn');
				if (value && p && popup) {
					p.removeAttribute("href");
					p.style.cursor = "pointer";
					p.addEventListener("click", () => {
						popup.showModal();
					});
					popup_btn.href = value;
					console.log(value);
				}
				else {
					p.href = "get-error.html";
				}
				// J-AI QuixResponse Link
				value = docSnap.data().file_hosting;
				p = document.getElementById('qr-btn');
				if (value && p) {
					p.href = value;
				}
				else {
					p.href = "get-error.html";
				}
				// J-AI School Edition Link
				value = docSnap.data().file_hosting;
				p = document.getElementById('sch-btn');
				if (value && p) {
					p.href = value;
				}
				else {
					p.href = "get-error.html";
				}
				// Multiple Games Link
				value = docSnap.data().file_hosting;
				p = document.getElementById('game-btn');
				if (value && p) {
					p.href = value;
				}
				else {
					p.href = "get-error.html";
				}
				// CPU-Z Link
				value = docSnap.data().cpuz;
				p = document.getElementById('cpuz-btn');
				if (value && p) {
					p.href = value;
				}
				else {
					p.href = "get-error.html";
				}
				// HWMonitor Link
				value = docSnap.data().hwmonitor;
				p = document.getElementById('hwmonitor-btn');
				if (value && p) {
					p.href = value;
				}
				else {
					p.href = "get-error.html";
				}
				// NetScan Link
				value = docSnap.data().netscan;
				p = document.getElementById('netscan-btn');
				if (value && p) {
					p.href = value;
				}
				else {
					p.href = "get-error.html";
				}


			} else {
				console.error("Dokument nicht gefunden!");
			}
		} catch (err) {
			console.error("Fehler beim Laden aus Firestore:", err);
		}
	} else {
		// Nutzer ist nicht angemeldet
		console.log("Nicht bei Firebase angemeldet.");
	}
});

