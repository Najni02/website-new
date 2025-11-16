import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const auth = getAuth();

const btn = document.getElementById('order-btn');
const formspree = 'https://formspree.io/f/myzpdbzj';

btn.addEventListener('click', async () => {
    const user = auth.currentUser.email;
    if (!user) {
        alert('Please log in first.');
        return;
    };

    const data = {
        email: user,
        message: "Ein Benutzer hat soeben einen J-AI API-Key bestellt."
    };
    
    const response = await fetch(formspree, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        alert("You Successfully ordered an API-Key! You will get it by email soon.");
    } else {
        alert('There was an error! Please contact the support.');
    }
});
