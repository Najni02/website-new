// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXd8SG0s6WDIvwIbm6sa2JRiHzfW4mvJM",
  authDomain: "website-najni02.firebaseapp.com",
  projectId: "website-najni02",
  storageBucket: "website-najni02.firebasestorage.app",
  messagingSenderId: "268479338537",
  appId: "1:268479338537:web:f0332cdc3b985eefc12438",
  measurementId: "G-MDXJ3CKH3L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);