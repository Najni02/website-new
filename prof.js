const professions = document.querySelectorAll('.prof');
const profList = ["Programmer", "Hacker", "Web Designer", "Web Developer", "Video Editor"];
let currentIndex = 0;

function changeProfession() {
    // Erst alle ausblenden
    professions.forEach(el => el.style.opacity = 0);

    setTimeout(() => {
        // Text und Sichtbarkeit aktualisieren
        professions.forEach(el => {
            el.textContent = profList[currentIndex];
            el.style.opacity = 1;
        });

        // Nächster Index
        currentIndex = (currentIndex + 1) % profList.length;
    }, 500);
}

// Anfangszustand setzen
professions.forEach(el => {
    el.textContent = profList[currentIndex];
    el.style.opacity = 1;
});

setInterval(changeProfession, 3000);
