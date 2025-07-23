// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyAzOJV20yi-zBOD57WuTNTE4P003OG0Z8c",
    authDomain: "bgmi-config-pro.firebaseapp.com",
    projectId: "bgmi-config-pro",
    storageBucket: "bgmi-config-pro.firebasestorage.app",
    messagingSenderId: "318946056014",
    appId: "1:318946056014:web:c33e9d6c8123104bdd301f",
};

// Initialize Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
