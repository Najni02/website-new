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

async function getLink(elementId, source, path) {

	const element = document.getElementById(elementId);
	switch (source) {
		case 'db':
			try {
				const dbPath = await getDoc(doc(db, 'permission_links', path[0]));
				const dbValue = dbPath.data()[path[1]];

				element.href = dbValue;
				if (!element.classList.contains('a-div')) {
					changeElement(elementId, '');
					element.textContent = element.textContent.replace(" (Login Required)", "");
				} else {
					const childText = element.querySelector('.tool-hint');
					childText.textContent = "Direct Download";
					childText.style.color = "green";
				}
			}
			catch (error) {
				if (!element.classList.contains('a-div')) {
					element.textContent = "Download (permission required)"
				} else {
					const childText = element.querySelector('.tool-hint');
					childText.textContent = "Permission Required";
				}
				element.href = "contact.html";
			}
			break;
		case 'man':
			if (path === '') {
					element.removeAttribute('href');
				switch (elementId) {
					case 'jai-key':
						element.textContent = "Get an API-Key";
						element.addEventListener('click', () => {
							jai_popup.showModal();
						});
						element.style.cursor = "pointer";
						break;
				}
			} else {
				element.href = path;
			};
			changeElement(elementId, '');
			break;
	}
};
function changeElement(elementId, action) {
	const element = document.getElementById(elementId);
	switch (action) {
		case 'delete':
			element.remove();
			break;
		case '':
			element.classList.remove('sec_btn');
			break;
	};
};

// Überprüfe, ob der Nutzer angemeldet ist
onAuthStateChanged(auth, async (user) => {
	if (user) {
		// Nutzer ist angemeldet

		// Minecraft
		const mcPath = await getDoc(doc(db, "links", "auth_links"));
		const mcValue = mcPath.data().mc_server
		const mcElement = document.getElementById('s-link_mc');
		mcElement.textContent = mcValue;
		mcElement.classList.remove('blr-link');

		changeElement('link-error', 'delete');
		changeElement('link-error1', 'delete');

		//API-Key
		getLink('jai-key', 'man', '');

		// Download Links
		getLink('cer-btn', 'db', ['yt_downloader', 'certificate']);
		getLink('yt-win-btn', 'db', ['yt_downloader', 'win']);
		getLink('yt-and-btn', 'db', ['yt_downloader', 'and']);
		getLink('jai-btn', 'db', ['j-ai', 'app']);
		getLink('game-btn', 'db', ['games', 'game1']);

		// Admin Tools
		getLink('cpuz-btn', 'db', ['admin_tools', 'cpuz']);
		getLink('hwmonitor-btn', 'db', ['admin_tools', 'hwmonitor']);
		getLink('netscan-btn', 'db', ['admin_tools', 'cpuz']);
	} else {
		// Nutzer ist nicht angemeldet
		console.log("Nicht bei Firebase angemeldet.");
	}
});

